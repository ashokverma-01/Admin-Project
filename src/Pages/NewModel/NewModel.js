import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col, Select } from "antd";
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const NewModel = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        model: "",
        brand: "",
    });
    const [brands, setBrand] = useState([]);

    const handleSubmit = async () => {
        try {
            const formDataToSubmit = {
                model: formData.model,
                brand: formData.brand,
            };

            const response = await fetch("http://localhost:5500/AddModel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formDataToSubmit)
            });

            if (!response.ok) {
                throw new Error("Failed to add model");
            }

            message.success("model added successfully");
            form.resetFields();
            navigate("/model");
        } catch (error) {
            console.error("Error:", error);
            message.error("Failed to add model");
        }
    };

    useEffect(() => {
        fetchBrands();

    }, []);
    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:5500/brands");
            if (!response.ok) {
                throw new Error("Failed to fetch brands");
            }
            const data = await response.json();
            setBrand(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
            message.error("Failed to fetch brands");
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
                <h1 className="form-title">Add New  Model</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Model Name"
                            name="model"
                            rules={[{ required: true, message: "Please enter model" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Brands"
                            name="brand"
                            rules={[{ required: true, message: "Please select brand" }]}
                        >
                            <Select>
                                {brands.map((brand) => (
                                    <Option key={brand._id} value={brand.brand}>
                                        {brand.brand}
                                    </Option>
                                ))}
                            </Select>
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

export default NewModel;