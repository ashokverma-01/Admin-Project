import React, { useState, useEffect } from "react";
import { Button, Space, Table, Tag, Switch, Input, Form, Modal } from "antd"; // Import Modal
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./userList.scss";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const { confirm } = Modal; // Destructure Modal.confirm
const { Search } = Input;

export const UserList = () => {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  
  const [sortedInfo, setSortedInfo] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6, // Number of records per page
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/User");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5500/User/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the record");
      }
      // If the deletion is successful, update the data by refetching
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  //search api
 const handleSearch = ()=>{

 }

 const handleChange = (pagination, filters, sorter, extra) => {
    console.log('Various parameters', pagination, filters, sorter, extra);
    setSortedInfo(sorter);
    setPagination(pagination);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Technology",
      dataIndex: "technology",
      key: "technology",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => <Switch />,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/User/" + record._id}>
            <FaRegEdit style={{ width: "20px", height: "20px" }}></FaRegEdit>
          </Link>
          <a href="#">
            {" "}
            <MdDelete
              onClick={() => handleDelete(record._id)}
              style={{ width: "20px", height: "20px" }}
            />
          </a>
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
              onSearch={handleSearch}
              style={{
                width: 250,
              }}
            />
          </Space>
        </div>
        <div className="addbtn">
          <Button type="primary">
            <Link to="/NewUser">+ Add User</Link>
          </Button>
        </div>
      </div>
      <div className="table" style={{fontFamily:'none'}}>
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          pagination={pagination}
          // Pass sortedInfo to indicate the current sorting state
          sortedInfo={sortedInfo}
        />
        
      </div>
    </div>
  );
};

export default UserList;
