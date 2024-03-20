import React, { useState, useEffect } from "react";
import { Popover, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile"; // Import the ChangePassword component
import "./Logout.scss";

const Logout = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [changePasswordVisible, setChangePasswordVisible] = useState(false); // State to control Change Password popover visibility
    const [editProfileVisible, setEditProfileVisible] = useState(false); // State to control Edit Profile popover visibility

    useEffect(() => {
        // Retrieve user email from local storage
        const userEmailFromStorage = localStorage.getItem("userEmail");
        if (userEmailFromStorage) {
            setUserEmail(userEmailFromStorage);
        }
    }, []);

    useEffect(() => {
        if (userEmail) {
            // Function to fetch user's image when userEmail is available
            async function fetchUserImage() {
                try {
                    const response = await fetch(
                        `http://localhost:5000/user/image?email=${userEmail}`
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch user image");
                    }
                    const data = await response.json();
                    setUserImage(data.imageUrl);
                    localStorage.setItem("userImage", data.imageUrl); // Store the image URL in local storage
                } catch (error) {
                    console.error("Error fetching user image:", error);
                }
            }
            // Fetch user's image
            fetchUserImage();
        }
    }, [userEmail]);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userImage"); // Remove the image URL from local storage
        navigate("/Login");
    };

    const handleOpenChangePassword = () => {
        setChangePasswordVisible(true); // Set state to open the Change Password popover
    };

    const handleCloseChangePassword = () => {
        setChangePasswordVisible(false); // Set state to close the Change Password popover
    };

    const handleOpenEditProfile = () => {
        setEditProfileVisible(true); // Set state to open the Edit Profile popover
    };

    const handleCloseEditProfile = () => {
        setEditProfileVisible(false); // Set state to close the Edit Profile popover
    };

    return (
        <>
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
                                <Avatar
                                    size={64}
                                    icon={<UserOutlined />}
                                    style={{ marginBottom: "10px" }}
                                />
                            )}
                        </div>
                        <p>Email: {userEmail}</p>
                        <div className="edit">
                            <Button
                                type="primary"
                                onClick={handleOpenChangePassword}
                                style={{ width: "175px", marginBottom: "10px" }}
                            >
                                Change Password
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleOpenEditProfile}
                                style={{ width: "175px", display: 'block' }}
                            >
                                Edit Profile
                            </Button>
                        </div>
                        <div className="logout">
                            <Button
                                type="primary"
                                danger
                                onClick={handleLogout}
                                style={{ width: "175px" }}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                }
                title="User Profile"
                trigger="click"
            >
                <Button type="primary" shape="circle" icon={<UserOutlined />} />
            </Popover>
            {changePasswordVisible && (
                <Popover
                    content={<ChangePassword onClose={handleCloseChangePassword} />} // Pass a prop to handle closing the popover
                    title="Change Password"
                    trigger="click"
                    visible={changePasswordVisible}
                    onVisibleChange={setChangePasswordVisible}
                >
                    <Button type="primary">Change Password</Button>
                </Popover>
            )}
            {editProfileVisible && (
                <Popover
                    content={<EditProfile onClose={handleCloseEditProfile} />}
                    title="Edit Profile"
                    trigger="click"
                    visible={editProfileVisible}
                    onVisibleChange={setEditProfileVisible}
                >
                    <Button type="primary" >Edit Profile</Button>
                </Popover>
            )}
        </>
    );
};

export default Logout;
