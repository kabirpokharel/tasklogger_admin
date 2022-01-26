import React, { useState } from "react";
import PropTypes from "prop-types";
import { Drawer, Button } from "antd";

const DrawerComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const { children } = props;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {children}
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Drawer>
    </>
  );
};

DrawerComponent.propTypes = {
  children: PropTypes.element,
};

export default DrawerComponent;
