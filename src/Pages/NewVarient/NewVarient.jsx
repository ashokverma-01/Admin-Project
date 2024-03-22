import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col, Cascader } from "antd";
import { useNavigate } from "react-router-dom";
import "./NewVarient.scss";

const NewVarient = () => {
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        varient: "",
        brand: [],
        model: "",
    });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchDataFrom();
    }, []);

    const fetchDataFrom = async () => {
        try {
            // Fetch data from your backend API
            const response = await fetch("http://localhost:5500/models");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            // Format data for Cascader options
            const formattedData = data.map((item) => ({
                value: item.brand,
                label: item.brand,
                children: [
                    {
                        value: item.model,
                        label: item.model,
                    },
                ],
            }));

            // Set the formatted data to the options state
            setOptions(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const formDataToSubmit = {
                varient: formData.varient,
                brand: formData.brand[0],
                model: formData.brand[1],
            };

            const response = await fetch("http://localhost:5500/AddVarient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formDataToSubmit)
            });

            if (!response.ok) {
                throw new Error("Failed to add varient");
            }

            message.success("Varient added successfully");
            form.resetFields();
            navigate("/varients");
        } catch (error) {
            console.error("Error:", error);
            message.error("Failed to add varient");
        }
    };

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    return (
        <div className="new-car-form-container">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={formData}
                onValuesChange={handleFormChange}
            >
                <h1 className="form-title">Add New Varient</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Varient Name"
                            name="varient"
                            rules={[{ required: true, message: "Please enter varient" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Brands">
                            <Cascader
                                options={options}
                                placeholder="Please select"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button className="submit-btn2" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default NewVarient;
