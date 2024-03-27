import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col, Cascader } from "antd";
import { useNavigate } from "react-router-dom";
import "./NewVarient.scss";

const NewVarient = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        varient: "",
        brand: [], // This will hold the selected brand and model as an array [brand, model]
    });
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDataFrom();
    }, []);

    const fetchDataFrom = async () => {
        try {
            const response = await fetch("http://localhost:5500/models");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
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
            setOptions(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Failed to fetch data");
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (changedValues, allValues) => {
        setFormData({ ...formData, ...allValues });
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
                <h1 className="form-title">Add New Variant</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Variant Name"
                            name="varient"
                            rules={[{ required: true, message: "Please enter variant" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Brands / Models">
                            <Cascader
                                options={options}
                                placeholder="Please select"
                                onChange={(value) => setFormData({ ...formData, brand: value })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button className="submit-btn2" type="primary" htmlType="submit" loading={loading}>
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
