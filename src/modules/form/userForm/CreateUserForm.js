import React from "react";
import PropTypes from "prop-types";

import {
  Form,
  Input,
  Button,
  Typography,
  // Row,
  // Col,
  // Tag,
  // Select,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// const { Option } = Select;
const formFields = [
  "firstName",
  "surname",
  "role", //["admin", "editor", "user"]
  "dob", //date
  "email",
  "password",
];
const CreateUserForm = ({ locationActionFunc, initialValueProp, actionType }) => {
  // const { locationActionFunc, initialValueProp } = props;
  console.log("see this is  =---->", initialValueProp);
  // console.log("loading from block form page--- > ", loading);
  // console.log("this is ref --- > ", ref);
  // const [form] = Form.useForm();

  // useImperativeHandle(ref, () => ({
  //   resetBlockForm() {
  //     form.resetFields();
  //     alert("Child function called");
  //   },
  // }));

  // // useImperativeHandle(ref, () => {
  // //   console.log("triggered from parent element");
  // //   const resetForm = () => form.resetFields();
  // // });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: >--->", errorInfo);
  };

  return (
    <Form
      name="createUserForm"
      initialValues={{
        firstName: initialValueProp.firstName,
        surname: initialValueProp.surname,
        role: initialValueProp.role, //["admin", "editor", "user"]
        dob: initialValueProp.dob, //date
        email: initialValueProp.email,
        password: initialValueProp.password,

        // locationName: initialValueProp.name,
        // locationAddress: initialValueProp.location,
        // rate: initialValueProp.rate,
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={locationActionFunc}
      onFinishFailed={onFinishFailed}
    >
      {formFields.map((field, id) => (
        <Form.Item
          label={field === "dob" ? "Date of birth" : field}
          name={field}
          rules={[
            {
              required: true,
              message: `Please enter ${field}!`,
            },
          ]}
        >
          <Input placeholder={`Enter ${field}`} />
        </Form.Item>
      ))}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {actionType === "edit" ? "Edit User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

CreateUserForm.propTypes = {
  locationActionFunc: PropTypes.func,
  initialValueProp: PropTypes.object,
};
CreateUserForm.defaultProps = {
  initialValueProp: {
    firstName: "",
    surname: "",
    role: "", //["admin", "editor", "user"]
    dob: "", //date
    email: "",
    password: "",
  },
  actionType: "create",
};

export default CreateUserForm;
