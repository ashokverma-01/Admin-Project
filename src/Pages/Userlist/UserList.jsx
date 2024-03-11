import React, { useState, useEffect } from "react";
import { Button, Space, Table, Select, Switch, Input, Form } from "antd"; // Import Modal
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import "./userList.scss";

const { Search } = Input;
const { Option } = Select;

const UserList = () => {
  const [data, setData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearchValue] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 7, // Number of records per page
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

  const searchHandle = async (value) => {
    try {
      if (value) {
        let result = await fetch(`http://localhost:5500/Search/${value}`);
        if (!result.ok) {
          throw new Error("Failed to search data");
        }
        result = await result.json();
        setData(result);
      } else {
        fetchData();
      }

      // Clear the search input value
      setSearchValue(""); // Assuming setSearchValue is the function to update the search input value
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log('Various parameters', pagination, filters, sorter, extra);
    setSortedInfo(sorter);
    setPagination(pagination);

    // Apply gender filter
    const { gender } = filters;
    if (gender && gender.length > 0 && gender[0] !== "all") {
      const filteredData = data.filter((item) => item.gender === gender[0]);
      setData(filteredData);
    } else {
      fetchData(); // If no filter is applied, fetch the data again
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
        body: JSON.stringify({ active }), // Send the current switch state as true or false
      });
      if (!response.ok) {
        throw new Error("Failed to update active state");
      }
      // If the update is successful, update the data by refetching
      fetchData();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      // sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      // sortOrder: sortedInfo.columnKey === "firstname" && sortedInfo.order,
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
      sortOrder: sortedInfo.columnKey === "gender" && sortedInfo.order,
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
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={(checked) => handleActiveChange(record._id, checked)}
        />
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/user/" + record._id}>
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
              onSearch={searchHandle}
              style={{
                width: 300,
              }}
            />
          </Space>
        </div>
        <div className="filters">
          <Form layout="inline">
            <Form.Item label="Filter by Gender">
              <Select defaultValue="all" onChange={handleGenderChange} style={{ width: 120 }}>
                <Option value="all">All</Option>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="addbtn">
          <Button type="primary">
            <Link to="/newUser">+ Add User</Link>
          </Button>
        </div>
      </div>
      <div className="table" style={{ fontFamily: 'none' }}>
        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
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
