import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams, useNavigate } from 'react-router-dom'

const { Option } = Select;

const UpdateUser = ({ userId }) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [technology, setTechnology] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const parmas = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch user data based on userId when component mounts
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        console.log(parmas)
        let result = await fetch(`http://localhost:5500/UpdateUser/${parmas.id}`)
        result = await result.json();
        setFirstName(result.firstname);
        setLastName(result.lastname);
        setEmail(result.email);
        setTechnology(result.technology);
        setAge(result.age);
        setGender(result.gender);
        setPhoneNumber(result.phoneNumber);
        setAddress(result.address);
    };

    const handleUpdate = async () => {
        console.log(firstname, lastname, email, technology, age, gender, phoneNumber, address)
        let result = await fetch(`http://localhost:5500/UpdateUser/${parmas.id}`, {
            method: 'put',
            body: JSON.stringify({ firstname, lastname, email, technology, age, gender, phoneNumber, address }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        result = await result.json()
        console.log(result)
        Navigate('/users')

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
                            initialValue={firstname}

                        >
                            <Input
                                className="input-field"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            initialValue={lastname}

                        >
                            <Input
                                className="input-field"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={email}
                        // rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input
                                className="input-field"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Technology"
                            name="technology"
                            initialValue={technology}
                        // rules={[{ required: true, message: "Please input your technology" }]}
                        >
                            <Input
                                className="input-field"
                                type="technology"
                                onChange={(e) => setTechnology(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Age"
                            name="age"
                            initialValue={age}
                        // rules={[{ required: true, message: "Please input your age!" }]}
                        >
                            <Input
                                className="input-field"
                                type="number"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            initialValue={gender}

                        >
                            <Select
                                className="form-select"
                                onChange={(e) => setGender('gender', e.target.value)}
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
                            initialValue={phoneNumber}

                        >
                            <PhoneInput
                                country={"india"}
                                className="phone-input"
                                onChange={(e) => setPhoneNumber('phoneNumber', e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Address"
                            name="address"
                            initialValue={address}

                        >
                            <Input
                                className="input-field"
                                onChange={(e) => setAddress('address', e.target.value)}
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
