import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import "react-phone-input-2/lib/style.css";
import { useParams, useNavigate } from 'react-router-dom'

const { Option } = Select;

const Brandupdate = ({ userId }) => {
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const parmas = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        // Fetch user data based on userId when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log(parmas)
        let result = await fetch(`http://localhost:5500/BrandUpdate/${parmas.id}`)
        result = await result.json();
        setBrand(result.brand);
        setDescription(result.description);
    };

    const handleUpdate = async () => {
        let result = await fetch(`http://localhost:5500/BrandUpdate/${parmas.id}`, {
            method: 'put',
            body: JSON.stringify({ brand, description }),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        result = await result.json()
        console.log(result)
        Navigate('/brands')

    }


    return (
        <div className="new-car-form-container">
            <Form onFinish={handleUpdate} layout="vertical">
                <h1 className="form-title">Update Brand Data</h1>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Brand Name"
                            initialValue={brand}
                        >
                            <Input
                                value={brand}
                                className="input-field"
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Description"
                            initialValue={description}

                        >
                            <Input
                                value={description}
                                className="input-field"
                                onChange={e => setDescription(e.target.value)}
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

export default Brandupdate;
