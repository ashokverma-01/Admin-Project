import React, { useState, useEffect } from "react";
import { Button, Space, Table, Select, Switch, Input, Form, DatePicker, Modal } from "antd"; // Import Modal
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import moment from "moment";
import "./DriverList.scss"

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DriverList = () => {
  const [data, setData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState(null);
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
      const response = await fetch("http://localhost:5500/Driver");
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
      await fetch(`http://localhost:5500/Driver/${deleteDriverId}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      setDeleteDriverId(null);
      setDeleteModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setDeleteDriverId(null);
    setDeleteModalVisible(false);
  };

  const handleDelete = (id) => {
    setDeleteDriverId(id);
    setDeleteModalVisible(true);
  };

  const searchHandle = async (key) => {
    try {
      if (key) {
        let result = await fetch(`http://localhost:5500/searchDriver/${key}`);
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
    console.log('Various parameters', pagination, filters, sorter, extra);
    setSortedInfo(sorter);
    setPagination(pagination);
    const { gender } = filters;
    if (gender && gender.length > 0 && gender[0] !== "all") {
      const filteredData = data.filter((item) => item.gender === gender[0]);
      setFilteredData(filteredData);
    } else {
      fetchData();
    }
  };

  const handleGenderChange = (value) => {
    let filteredData;
    if (value === "all") {
      filteredData = data;
    } else {
      filteredData = data.filter((item) => item.gender === value);
    }
    setFilteredData(filteredData);
  };

  const handleActiveChange = async (id, active) => {
    try {
      const response = await fetch(`http://localhost:5500/Active/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active }),
      });
      if (!response.ok) {
        throw new Error("Failed to update active state");
      }
      fetchData();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
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
          className="circular-image "
        />
      ),
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
      sorter: (a, b) => a.driverName.localeCompare(b.driverName),
      sortOrder: sortedInfo.columnKey === "driverName" && sortedInfo.order,
    },
    {
      title: "License Number",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "timeTemps",
      key: "timeTemps",
      render: (date) => <span>{moment(date).format("YYYY-MM-DD")}</span>,
      filters: [
        {
          text: "Today",
          value: moment().startOf("day").toISOString(),
        },
        {
          text: "This Week",
          value: moment().startOf("week").toISOString(),
        },
        {
          text: "This Month",
          value: moment().startOf("month").toISOString(),
        },
      ],
      onFilter: (value, record) => {
        return moment(record.timeTemps).isSameOrAfter(value, "day");
      },
    },

    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={(checked) => handleActiveChange(record._id, checked)}
        />
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/driver/" + record._id}>
            <FaRegEdit style={{ width: "20px", height: "20px" }}></FaRegEdit>
          </Link>
          <MdDelete
            onClick={() => handleDelete(record._id)}
            style={{ width: "20px", height: "20px", color: "red", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="home">
      <div className="top">
        <div className="search">
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              onSearch={searchHandle}
              style={{
                width: 300,
              }}
            />
          </Space>
        </div>
        <div className="filters" style={{ marginLeft: '50px' }}>
          <Form layout="inline">
            {/* <Form.Item label="Filter by Gender">
              <Select defaultValue="all" onChange={handleGenderChange} style={{ width: 120 }}>
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item> */}
          </Form>
        </div>
        <div className="addbtn">
          <Button type="primary">
            <Link to="/newDriver">+ Add Driver</Link>
          </Button>
        </div>
      </div>
      <div className="table" style={{ fontFamily: 'none' }}>
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
        <p>Are you sure you want to delete this driver?</p>
      </Modal>
    </div>
  );
};

export default DriverList;
