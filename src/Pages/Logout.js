import React, { useState, useEffect } from "react";
import { Popover, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // Function to fetch user's image when component mounts
        async function fetchUserImage() {
            try {
                const response = await fetch(`http://localhost:5000/user/image?email=${userEmail}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user image");
                }
                const data = await response.json();
                setUserImage(data.imageUrl);
            } catch (error) {
                console.error("Error fetching user image:", error);
            }
        }

        // Retrieve user email from local storage
        const userEmail = localStorage.getItem("userEmail");
        setUserEmail(userEmail);

        // Fetch user's image
        fetchUserImage();
    }, [userEmail]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImage"); // Remove the image URL from local storage
        navigate("/Login");
    };

    return (
        <Popover
            content={
                <div>
                    <div>
                        {userImage ? (
                            <Avatar
                                size={64}
                                src={userImage}
                                alt="User Image"
                                style={{ marginBottom: "10px" }}
                            />
                        ) : (
                            <Avatar size={64} icon={<UserOutlined />} style={{ marginBottom: "10px" }} />
                        )}
                    </div>
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
