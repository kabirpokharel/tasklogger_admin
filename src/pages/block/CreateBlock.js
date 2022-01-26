import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Tag,
  Select,
  Result,
  Typography,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import CreateBlockForm from "../../modules/form/blockForm/CreateBlockForm";
import baseUrl from "../../modules/common/constant/baseUrl";
import { roomNumberGenerator } from "./blockFunciton";

const { Paragraph, Text } = Typography;

const ResultCard = ({
  error,
  setStatusPopup,
  setModalVisible_createBlock,
  loading,
}) => {
  if (error.length) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      >
        <div className="desc">
          {error.map((err) => {
            return (
              <>
                <Paragraph>
                  <Text
                    strong
                    style={{
                      fontSize: 16,
                    }}
                  >
                    The content you submitted has the following error:
                  </Text>
                </Paragraph>
                <Paragraph>
                  <CloseCircleOutlined className="site-result-demo-error-icon" />
                  <span>{err}</span>
                </Paragraph>
              </>
            );
          })}
        </div>
      </Result>
    );
  } else {
    return (
      <Result
        status="success"
        title="Created Block Successfully!"
        subTitle="Click on 'Add Block' to add new block to location"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              setStatusPopup(false);
              setModalVisible_createBlock(true);
            }}
          >
            Add Block
          </Button>,
          <Button
            key="buy"
            onClick={() => {
              // setStatusPopup(false);
              // setModalVisible_createBlock(false);
              window.location.reload();
            }}
          >
            Done
          </Button>,
        ]}
      />
    );
  }
};
const Block = ({
  setCreateBlock_Loading,
  location_id,
  setModalVisible_createBlock,
  windowLoaderFunc,
  loading,
}) => {
  const [statusPopup, setStatusPopup] = useState(false);
  // const [loading, setCreateBlock_Loding] = useState(false);
  const [error, setError] = useState([]);
  const createBlock = (values) => {
    setCreateBlock_Loading(true);
    const { blockName, blockRooms, extras } = values;
    console.log("see this is values", values);
    axios({
      method: "post",
      url: `${baseUrl}/block/create`,
      data: {
        name: blockName,
        rooms: roomNumberGenerator(blockRooms),
        extras: extras,
        location: location_id,
      },
    })
      .then((response) => {
        console.log("see this is response from createBlock", response);
        setCreateBlock_Loading(false);
        setStatusPopup(true);
      })
      .catch((err) => {
        setError([...error, err.type]);
        setCreateBlock_Loading(false);
        setStatusPopup(true);
        console.log("see this is an error from createBlock --------> ", err);
      });
  };
  return (
    <Row>
      <Col
        span={24}
        // xs={{ span: 24 }}
        // lg={{ span: 18 }}
        // style={{ background: "green" }}
      >
        {statusPopup ? (
          <ResultCard
            {...{
              error,
              setStatusPopup,
              setModalVisible_createBlock,
              windowLoaderFunc,
            }}
          />
        ) : (
          // <CardComponent
          //   loading={loading}
          //   style={{
          //     border: "none",
          //     paddingTop: "20px",
          //     boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          //   }}
          // >
          <CreateBlockForm {...{ createBlock, loading }} />
          // </CardComponent>
        )}
      </Col>
    </Row>
  );
};

Block.propTypes = {};

export default Block;
