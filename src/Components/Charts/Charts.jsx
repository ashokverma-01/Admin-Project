import React, { useState, useEffect } from "react";
import './charts.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import {
    faBox,
    faUser,
    faUsers,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMaleUsers, setTotalMaleUsers] = useState(0); // State for total male users

    useEffect(() => {
        fetchTotalUsers();
        fetchTotalMaleUsers(); // Fetch total male users count on component mount
    }, []);

    const fetchTotalUsers = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/total-users');
            const data = await response.json();
            setTotalUsers(data.totalUsers);
        } catch (error) {
            console.error('Error fetching total users:', error);
        }
    };

    const fetchTotalMaleUsers = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/total-male'); // Assuming this is the endpoint to fetch total male users count
            const data = await response.json();
            setTotalMaleUsers(data.totalMaleUsers);
        } catch (error) {
            console.error('Error fetching total male users:', error);
        }
    };

    const data = [
        { name: "Jan", "Active User": 4000 },
        { name: "Feb", "Active User": 3000 },
        { name: "March", "Active User": 2000 },
        { name: "April", "Active User": 2780 },
        { name: "May", "Active User": 1890 },
        { name: "June", "Active User": 2390 },
        { name: "July", "Active User": 3490 },
        { name: "August", "Active User": 3490 },
        { name: "September", "Active User": 3490 },
        { name: "October", "Active User": 3490 },
        { name: "November", "Active User": 3490 },
        { name: "December", "Active User": 3490 },
    ];

    return (
        <div className="dashboard">
            <div className="grid-container">
                <div className="grid-item" style={{ backgroundColor: "red" }}>
                    <FontAwesomeIcon icon={faBox} />
                    <p>Total User</p>
                    <h2>{totalUsers}</h2>
                </div>
                <div className="grid-item" style={{ backgroundColor: "blue" }}>
                    <FontAwesomeIcon icon={faUser} />
                    <p>Male User</p>
                    <h2>{totalMaleUsers}</h2> {/* Display total male users count */}
                </div>
                <div className="grid-item" style={{ backgroundColor: "green" }}>
                    <FontAwesomeIcon icon={faUsers} />
                    <p>Female User</p>
                    <h2>{totalUsers - totalMaleUsers}</h2> {/* Calculate total female users count */}
                </div>
                <div className="grid-item" style={{ backgroundColor: "aqua" }}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <p>Sales</p>
                    <h2>2450</h2>
                </div>
            </div>

            <div className="charts">
                <h3 className="chartTitle">Users Analysis</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#5550bd" />
                        <Line type="monotone" dataKey="Active User" stroke="#5550bd" />
                        <Tooltip />
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
