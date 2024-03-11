import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Logout = () => {
    const navigate = useNavigate();

    // Retrieve user email and image URL from local storage
    const userEmail = localStorage.getItem("userEmail");
    const userImage = localStorage.getItem("userImage") || ""; // set default value to an empty string if userImage is null
    // You don't need to set userImage again from user object. It's already retrieved from localStorage.

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImage");

        navigate("/Login");
    };

    return (
        <Popover
            content={
                <div>
                    <Avatar
                        size={64}
                        src={userImage} // set the image source
                        icon={!userImage && <UserOutlined />} // fallback to default icon if no image is provided
                        style={{ marginBottom: "10px" }}
                    />
                    <p>Email: {userEmail}</p>
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            }
            title="User Profile"
            trigger="click"
        >
            <Button type="primary" shape="circle" icon={<UserOutlined />} />
        </Popover>
    );
};

export default Logout;
