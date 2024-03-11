import "./Login.css"
import React from "react";
import { Input, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5500/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.getFieldValue("email"),
          password: form.getFieldValue("password"),
        }),
      });

      let data = JSON.stringify({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });


      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        message.success("Login successful");
        localStorage.setItem("userEmail", form.getFieldValue("email"));
        navigate("/", { replace: true });
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        message.error(errorData.message);
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
      message.error("An unexpected error occurred");
    }
  };



  return (
    <div className="container2" >
      <h1>Login</h1>
      <Form
        form={form}
        className="form"
      >

        <Form.Item label="Current password" name="currentpassword">
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginLeft: '15px' }}
          label="New Password"
          name="newpassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginLeft: '-5px' }}
          label="Confirm Password"
          name="confirmpassword"
        >
          <Input.Password />
        </Form.Item>
        <div className="btn">
          <Button
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>

        </div>
      </Form>

    </div>
  );
};

export default Login;