import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { useParams, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const CarUpdate = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [image, setImage] = useState(null); // Change to null to represent no image selected
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
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
      setYear(result.year);
      setColor(result.color);
      setPrice(result.price);
      setRegistrationDate(result.registrationDate);
      // Assuming image is stored as URL, set it directly
      setImage(result.image);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("model", model);
      formData.append("brand", brand);
      formData.append("year", year);
      formData.append("color", color);
      formData.append("price", price);
      formData.append("registrationDate", registrationDate);
      if (image) {
        formData.append("image", image); // Append the image file to the formData if it's not null
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
      setImage(info.file.originFileObj); // Store the file object in state
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
              <Input className="input-field" value={brand} onChange={e => setBrand(e.target.value)} />
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
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={handleImageChange}
            >
              <Upload beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
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