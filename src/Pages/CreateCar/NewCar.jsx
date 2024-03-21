import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Row, Col, Upload, Select } from "antd";
import moment from "moment";
import "./newCar.scss";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const NewCar = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    varient: "",
    year: "",
    color: "",
    price: "",
    registrationDate: moment(),
    image: [] // Initialize image as an empty array
  });

  const [brands, setBrands] = useState([]);
  const [varients, setVarients] = useState([]);

  const handleSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("model", formData.model);
      formDataToSubmit.append("brand", formData.brand);
      formDataToSubmit.append("varient", formData.varient);
      formDataToSubmit.append("year", formData.year);
      formDataToSubmit.append("color", formData.color);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("registrationDate", formData.registrationDate.toISOString());
      formDataToSubmit.append("image", formData.image[0]?.originFileObj); // Access originFileObj of the File object

      const response = await fetch("http://localhost:5500/Addcar", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!response.ok) {
        throw new Error("Failed to add car");
      }

      message.success("Car added successfully");
      form.resetFields();
      navigate("/cars");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to add car");
    }
  };

  useEffect(() => {
    // Fetch brands from the backend API when the component mounts
    fetchBrands();
  }, []);
  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5500/brands");
      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }
      const data = await response.json();
      setBrands(data);
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
      setVarients(data);
    } catch (error) {
      console.error("Error fetching varients:", error);
      message.error("Failed to fetch varients");
    }
  };
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={formData}
        onValuesChange={handleFormChange}
      >
        <h1>Add New Car</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Car Model"
              name="model"
              rules={[{ required: true, message: "Please enter car model" }]}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: "Please enter year" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Color"
              name="color"
              rules={[{ required: true, message: "Please enter year" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Registration Date"
              name="registrationDate"
              rules={[
                { required: true, message: "Please select registration date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please select an image" }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Varients"
              name="varient"
              rules={[{ required: true, message: "Please select varient" }]}
            >
              <Select>
                {varients.map((varient) => (
                  <Option key={varient._id} value={varient.varient}>
                    {varient.varient}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button className="submit-btn" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewCar;