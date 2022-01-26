import React, { useState } from "react";
import PropTypes from "prop-types";

// import { Layout, Menu } from "antd";
import { PageHeader } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
  // UploadOutlined,
} from "@ant-design/icons";
import "./pageTemplateStyle.css";
// import styled from "styled-components";

const PageTemplete = ({ children }) => {
  const [drawerToggle, setDrawerToggle] = useState(false);
  return (
    <div>
      <PageHeader
        className="site-page-header"
        backIcon={drawerToggle ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        onBack={() => {
          setDrawerToggle(!drawerToggle);
          alert("you triggered drawerToggle");
        }}
        title="Block"
        subTitle="BLock Operation here"
      />
      {children}
    </div>
  );
};
PageTemplete.propTypes = {
  children: PropTypes.element,
};

export default PageTemplete;
