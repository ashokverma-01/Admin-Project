import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Form, Modal } from "antd";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";

const { Search } = Input;

const CarList = () => {
  const [data, setData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteCarId, setDeleteCarId] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/Car");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleModalOk = async () => {
    try {
      await fetch(`http://localhost:5500/Car/${deleteCarId}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setDeleteCarId(null);
      setDeleteModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setDeleteCarId(null);
    setDeleteModalVisible(false);
  };

  const handleDelete = (id) => {
    setDeleteCarId(id);
    setDeleteModalVisible(true);
  };

  const searchHandle = async (key) => {
    try {
      if (key) {
        let result = await fetch(`http://localhost:5500/searchCar/${key}`);
        if (!result.ok) {
          throw new Error("Failed to search data");
        }
        result = await result.json();
        setData(result);
      } else {
        fetchData();

      }
      setSearchValue("");
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log("Various parameters", pagination, filters, sorter, extra);
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  const columns = [
    {
      title: "Car Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image && `http://localhost:5500/${image.replace(/\\/g, "/")}`} // Prefix with server address
          alt="Car Image"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      title: "Car Model",
      dataIndex: "model",
      key: "model",
      sorter: (a, b) => a.model.localeCompare(b.model),
      sortOrder: sortedInfo.columnKey === "model" && sortedInfo.order,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
      render: (date) => <span>{moment(date).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/car/" + record._id}>
            <FaRegEdit style={{ width: "20px", height: "20px" }}></FaRegEdit>
          </Link>
          <MdDelete
            style={{ width: "20px", height: "20px", color: 'red' }}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="home">
      <div className="top">
        <div className="search">
          <Search
            placeholder="Input search text"
            onSearch={searchHandle}
            style={{ width: 300 }}
          />
        </div>
        <div className="addbtn">
          <Button type="primary">
            <Link to="/newCar">+ Add Car</Link>
          </Button>
        </div>
      </div>
      <div className="table" style={{ fontFamily: "none" }}>
        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
          onChange={handleChange}
          pagination={pagination}
          sortedInfo={sortedInfo}
        />
      </div>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this car?</p>
      </Modal>
    </div>
  );
};

export default CarList;
