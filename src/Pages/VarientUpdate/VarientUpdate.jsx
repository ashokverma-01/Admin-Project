import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col, Cascader } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const UpdateVariant = () => {
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    varient: "",
    brand: [], // This will hold the selected brand and model as an array [brand, model]
  });
  const [options, setOptions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchDataFrom();
    fetchVariantData();
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

  const fetchVariantData = async () => {
    try {
      const response = await fetch(`http://localhost:5500/varientUpdate/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch variant data");
      }
      const data = await response.json();
      // Set the form data with the fetched variant data
      setFormData({
        varient: data.varient,
        brand: [data.brand, data.model], // Set brand and model as an array
      });
    } catch (error) {
      console.error("Error fetching variant data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Construct the data object to submit
      const formDataToSubmit = {
        varient: formData.varient,
        brand: formData.brand[0], // Extract brand from the array
        model: formData.brand[1], // Extract model from the array
      };

      // Submit data to backend
      const response = await fetch(
        `http://localhost:5500/varientUpdate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update variant");
      }

      // If successful, show success message and navigate
      message.success("Variant updated successfully");

      // Refetch the updated variant data
      await fetchVariantData();

      // Reset form fields
      form.resetFields();
      navigate("/varients");
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update variant");
    }
  };


  const handleFormChange = (changedValues, allValues) => {
    // Update formData state with all form values
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
        <h1 className="form-title">Update Variant</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Variant Name"
              name="varient"
              rules={[{ required: true, message: "Please enter variant" }]}
              initialValue={formData.varient} // Set initial value from form data
            >
              <Input
                className="input-field"
                value={formData.varient} // Set value to the varient field in formData
                onChange={(e) =>
                  setFormData({ ...formData, varient: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Brand and Model" name="brand">
              <Cascader
                options={options}
                placeholder="Please select"
                value={formData.brand} // Provide the selected value from form data
                onChange={(value) => setFormData({ ...formData, brand: value })} // Update form data on change
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button className="submit-btn2" type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateVariant;
