import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import Link from "antd/es/typography/Link";

const { Option } = Select;

const UpdateUser = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data based on userId when component mounts
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5500/UpdateUser/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5500/UpdateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            // Handle success
        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error
        }
    };

    const handleChange = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-container">
            <Form onFinish={handleUpdate} layout="vertical">
                <h1 className="form-title">Update User Data</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstname"
                            initialValue={user.firstname}
                            rules={[{ required: true, message: "Please input your name!" }]}
                        >
                            <Input
                                className="input-field"
                                onChange={(e) => handleChange('firstname', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            initialValue={user.lastnamename}
                            rules={[{ required: true, message: "Please input your lastname!" }]}
                        >
                            <Input
                                className="input-field"
                                onChange={(e) => handleChange('lastname', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={user.email}
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input
                                className="input-field"
                                type="email"
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Technology"
                            name="technology"
                            initialValue={user.technology}
                            rules={[{ required: true, message: "Please input your technology" }]}
                        >
                            <Input
                                className="input-field"
                                type="technology"
                                onChange={(e) => handleChange('technology', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Age"
                            name="age"
                            initialValue={user.age}
                            rules={[{ required: true, message: "Please input your age!" }]}
                        >
                            <Input
                                className="input-field"
                                type="number"
                                onChange={(e) => handleChange('age', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            initialValue={user.gender}
                            rules={[
                                { required: true, message: "Please select your gender!" },
                            ]}
                        >
                            <Select
                                className="form-select"
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            initialValue={user.phoneNumber}
                            rules={[
                                { required: true, message: "Please input your phone number!" },
                            ]}
                        >
                            <PhoneInput
                                country={"india"}
                                className="phone-input"
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Address"
                            name="address"
                            initialValue={user.address}
                            rules={[
                                { required: true, message: "Please input your address!" },
                            ]}
                        >
                            <Input
                                className="input-field"
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="submit-btn" type="primary" htmlType="submit"> Update </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUser;
