import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Modal } from "antd";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import moment from "moment";

const { Search } = Input;

const VarientList = () => {
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
            const response = await fetch("http://localhost:5500/Varients");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const searchHandle = async (key) => {
        try {
            if (key) {
                let result = await fetch(`http://localhost:5500/searchVarient/${key}`);
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

    const handleModalOk = async () => {
        try {
            await fetch(`http://localhost:5500/Varient/${deleteCarId}`, {
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

    const columns = [
        {
            title: "Varient Name",
            dataIndex: "varient",
            key: "varient",
        },
        {
            title: "Brands",
            dataIndex: "brand",
            key: "brand",
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
            title: "Action",
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"/VarientUpdate/" + record._id}>
                        <FaRegEdit style={{ width: "20px", height: "20px" }}></FaRegEdit>
                    </Link>
                    <MdDelete
                        style={{ width: "20px", height: "20px", color: 'red' }}
                        onClick={() => handleDelete(record._id)}
                    />
                </Space>
            ),
        },
    ]

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
                        <Link to="/newVarient">+ Add New Varient</Link>
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
                <p>Are you sure you want to delete this varient?</p>
            </Modal>
        </div>
    );
};

export default VarientList;
