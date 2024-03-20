import React, { useState } from "react";
import { Form, Input, Button, DatePicker, message, Row, Col, Upload } from "antd";
import moment from "moment";
import "./newCar.scss";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

const NewCar = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    year: "",
    color: "",
    price: "",
    registrationDate: moment(),
    image: [] // Initialize image as an empty array
  });

  const handleSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("model", formData.model);
      formDataToSubmit.append("brand", formData.brand);
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
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please enter brand" }]}
            >
              <Input />
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
            <Form.Item label="Color" name="color">
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
          <Col span={24}>
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