import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./locationStyles.css";
import baseUrl from "../../modules/common/constant/baseUrl";
import { Table, Tag, Space, Button, Typography } from "antd";
import Loader from "../../modules/common/components/Loader";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import CreateBlockForm from "../../modules/form/blockForm/CreateBlockForm";
import CreateBlock from "../block/CreateBlock";
import CreateLocationForm from "../../modules/form/locationForm/CreateLocationForm";

const { Column } = Table;
const { Text, Title, Link } = Typography;
const fotmatTableData = (locationData, setLocationDetails) => {
  console.log("this is formatted data of location and blocks", locationData);
  const { name, address, blocks } = locationData;
  const data = [
    {
      key: "1",
      name,
      address,
      blocks: blocks.map((block) => block.name),
    },
  ];
  setLocationDetails(data);
};

const LocationDetails = (props) => {
  let { location_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [locationDetails, setLocationDetails] = useState([]);
  const [modalVisible_createBlock, setModalVisible_createBlock] =
    useState(false);
  const [modalVisible_editLocation, setModalVisible_editLocation] =
    useState(false);
  const [createBlock_Loading, setCreateBlock_Loading] = useState(false);
  const [editLocation_Loding, setEditLocation_Loding] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}/location/${location_id}`,
    })
      .then((res) => {
        console.log("see this is response from location details page", res);
        setLoading(false);
        fotmatTableData(res.data.location, setLocationDetails);

        // dispatch(initilizeLocations(res.data.locations));
        // setLocations(res.data.locations);
        // setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.log("see this is an error from locaiton page --------> ", err);
        setLoading(false);
      });
  }, []);
  //  const deleteLocation = (locaitonId) => {
  //   axios({
  //     method: "get",
  //     url: `${baseUrl}/location/delete`,
  //     data: {
  //       locationId: location_id,
  //       name: locationName,
  //       rate: rate,
  //       address: locationAddress,
  //     },
  //   })
  //     .then((res) => {
  //       console.log("see this is response from create Location", res);
  //       window.location.reload();
  //       // setLoading(false);
  //       // setModalVisible_createBlock(false);
  //     })
  //     .catch((err) => {
  //       // setError([...error, err.type]);
  //       // setStatusPopup(true);
  //       setLoading(false);
  //       console.log("see this is an error from createBlock --------> ", err);
  //     });
  //  }
  const locationActionFunc = (values) => {
    setLoading(true);
    const { locationName, rate, locationAddress } = values;
    console.log("see this is values of create location form", values);
    axios({
      method: "post",
      url: `${baseUrl}/location/update`,
      data: {
        locationId: location_id,
        name: locationName,
        rate: rate,
        address: locationAddress,
      },
    })
      .then((res) => {
        console.log("see this is response from create Location", res);
        window.location.reload();
        // setLoading(false);
        // setModalVisible_createBlock(false);
      })
      .catch((err) => {
        // setError([...error, err.type]);
        // setStatusPopup(true);
        setLoading(false);
        console.log("see this is an error from createBlock --------> ", err);
      });
  };
  console.log("Location details page", location_id);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "200px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Table className="LocationDetails" dataSource={locationDetails}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Blocks"
          dataIndex="blocks"
          key="blocks"
          render={(blocks) => {
            return (
              <>
                {blocks.length ? (
                  <>
                    {blocks.map((tag) => (
                      <Tag
                        style={{
                          cursor: "pointer",
                          textTransform: "capitalize",
                          marginBottom: "8spx",
                        }}
                        onClick={() => alert(`${tag} is clicked`)}
                        color="blue"
                        key={tag}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </>
                ) : (
                  // <Text>Edit location to add blocks</Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      cursor: "pointer",
                    }}
                    // onClick={() => alert("to create block form")}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <InboxOutlined
                        style={{ fontSize: 40, color: "#d9d9d9" }}
                      />
                      <Text type="secondary">No block found</Text>
                    </div>
                    {/* <Link>+ Add block</Link> */}
                  </div>
                )}
                <Button
                  onClick={() => setModalVisible_createBlock(true)}
                  type="link"
                  size="small"
                >
                  + Add block
                </Button>
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => setModalVisible_editLocation(true)}
              >
                Edit
              </Button>
              <Button
                // onClick = {()=>deleteLocation(location_id)}
                danger
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Create Block"
        footer={null}
        visible={modalVisible_createBlock}
        // onOk_createBlock={() => alert("handle okay!!")}
        confirmLoading={createBlock_Loading}
        onCancel={() => {
          setModalVisible_createBlock(false);
        }}
      >
        <CreateBlock
          {...{
            loading: createBlock_Loading,
            // windowLoaderFunc: window.location.reload,
            setCreateBlock_Loading,
            location_id,
            setModalVisible_createBlock,
          }}
        />
      </Modal>
      <Modal
        title="Edit Location"
        footer={null}
        visible={modalVisible_editLocation}
        // onOk_createBlock={() => alert("handle okay!!")}
        // confirmLoading={editLocation_Loding}
        onCancel={() => {
          setModalVisible_editLocation(false);
        }}
      >
        <CreateLocationForm
          loading={editLocation_Loding}
          locationActionFunc={locationActionFunc}
          actionType={"edit"}
          initialValueProp={
            locationDetails.length
              ? {
                  name: locationDetails[0].name,
                  location: locationDetails[0].address,
                  rate: 12,
                }
              : {}
          }
        />
      </Modal>
    </div>
  );
};

LocationDetails.propTypes = {};

export default LocationDetails;
