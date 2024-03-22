import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message, Select } from "antd";
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const CarUpdate = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState([]);
  const [varient, setVarient] = useState([]);
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchBrands();

  }, []);

  const fetchData = async () => {
    try {
      let result = await fetch(`http://localhost:5500/UpdateCar/${params.id}`);
      if (!result.ok) {
        throw new Error("Failed to fetch car data");
      }
      result = await result.json();
      setModel(result.model);
      setBrand(result.brand);
      setVarient(result.varient);
      setYear(result.year);
      setColor(result.color);
      setPrice(result.price);
      setRegistrationDate(result.registrationDate);
      setImage(result.image);
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
      setBrand(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      message.error("Failed to fetch brands");
    }
  };


  useEffect(() => {
    // Fetch brands from the backend API when the component mounts
    fetchVarients();
  }, []);

  const fetchVarients = async () => {
    try {
      const response = await fetch("http://localhost:5500/varients");
      if (!response.ok) {
        throw new Error("Failed to fetch varients");
      }
      const data = await response.json();
      setVarient(data);
    } catch (error) {
      console.error("Error fetching varients:", error);
      message.error("Failed to fetch varients");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("model", model);
      formData.append("brand", brand);
      formData.append("varient", varient);
      formData.append("year", year);
      formData.append("color", color);
      formData.append("price", price);
      formData.append("registrationDate", registrationDate);
      if (image) {
        formData.append("image", image);
      }

      let result = await fetch(`http://localhost:5500/UpdateCar/${params.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!result.ok) {
        throw new Error("Failed to update car data");
      }
      result = await result.json();
      console.log(result);
      message.success("Car data updated successfully");
      navigate('/cars');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImage(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      setError('Image upload failed');
    }
  };

  return (
    <div className="form-container">
      <Form onFinish={handleUpdate} layout="vertical">
        <h1 className="form-title">Update Car Data</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Car Model" initialValue={model}>
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
                {brand.map(brand => (
                  <Option key={brand._id} value={brand.brand}>
                    {brand.brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Year" initialValue={year}>
              <Input type="number" className="input-field" value={year} onChange={e => setYear(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Color" initialValue={color}>
              <Input className="input-field" value={color} onChange={e => setColor(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Price" initialValue={price}>
              <Input type="number" className="input-field" value={price} onChange={e => setPrice(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Registration Date" initialValue={registrationDate}>
              <Input type="date" className="input-field" value={registrationDate} onChange={e => setRegistrationDate(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Image">
              <input
                type="file"
                className="form-control"
                onChange={(e) => { setImage(e.target.files[0]) }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Varient" initialValue={varient}>
              <Select
                className="input-field"
                value={varient}
                onChange={(value) => setVarient(value)}
              >
                {varient.map(variant => (
                  <Option key={variant._id} value={variant.varient}>
                    {variant.varient}
                  </Option>
                ))}
              </Select>
            </Form.Item>

          </Col>
        </Row>
        <Form.Item>
          <Button className="submit-btn" type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default CarUpdate;
