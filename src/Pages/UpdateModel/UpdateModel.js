import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const UpdateModel = () => {
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [brandsList, setBrandsList] = useState([]);
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchBrands();
    }, []);

    const fetchData = async () => {
        try {
            let result = await fetch(`http://localhost:5500/UpdateModel/${params.id}`);
            if (!result.ok) {
                throw new Error("Failed to fetch model data");
            }
            result = await result.json();
            setModel(result.model);
            setBrand(result.brand);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            let result = await fetch(`http://localhost:5500/UpdateModel/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ model, brand }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!result.ok) {
                throw new Error("Failed to update model data");
            }
            result = await result.json();
            console.log(result);
            navigate('/model');
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:5500/brands");
            if (!response.ok) {
                throw new Error("Failed to fetch brands");
            }
            const data = await response.json();
            setBrandsList(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
            message.error("Failed to fetch brands");
        }
    };

    return (
        <div className="new-car-form-container">
            <Form onFinish={handleUpdate} layout="vertical">
                <h1 className="form-title">Update Model Data</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Model Name"
                            initialValue={model}
                        >
                            <Input className="input-field" value={model} onChange={e => setModel(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Brand" initialValue={brand}>
                            <Select
                                className="input-field"
                                value={brand}
                                onChange={(value) => setBrand(value)}
                            >
                                {brandsList.map(brand => (
                                    <Option key={brand._id} value={brand.brand}>
                                        {brand.brand}
                                    </Option>
                                ))}
                            </Select>
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

export default UpdateModel;
