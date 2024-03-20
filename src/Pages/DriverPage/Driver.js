import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const UpdateDriver = (userId) => {
    const [driverName, setDriverName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        let result = await fetch(`http://localhost:5500/UpdateDriver/${params.id}`);
        result = await result.json();
        setDriverName(result.driverName);
        setLicenseNumber(result.licenseNumber);
        setPhoneNumber(result.phoneNumber);
        setAddress(result.address);
    };

    const handleUpdate = async () => {
        let result = await fetch(`http://localhost:5500/UpdateDriver/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ driverName, licenseNumber, phoneNumber, address }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        result = await result.json()
        console.log(result)
        navigate('/drivers')
    };

    return (
        <div className="form-container">
            <Form onFinish={handleUpdate} layout="vertical">
                <h1 className="form-title">Update Driver Data</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Driver Name" initialValue={driverName}>
                            <Input className="input-field" value={driverName} onChange={e => setDriverName(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="License Number" initialValue={licenseNumber}>
                            <Input type="number" className="input-field" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Phone Number" initialValue={phoneNumber}>
                            <PhoneInput
                                country={'us'}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Address" initialValue={address}>
                            <Input className="input-field" value={address} onChange={e => setAddress(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button className="submit-btn" type="primary" htmlType="submit">Update</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateDriver;
