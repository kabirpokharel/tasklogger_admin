import React from "react";
// import PropTypes from "prop-types";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DrawerComponent from "../../modules/common/components/DrawerComponent";
import { useSelector, useDispatch } from "react-redux";
import Block from "../block/Block";
import CreateLocation from "../Location/CreateLocation";
import Location from "../Location/Location";
import LocationDetails from "../Location/LocationDetails";
import RoomStatus from "../Room/RoomStatus";
import DashboardBody from "./DashbordBody";

const Dashboard = () => {
  const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);
  console.log("this is cleaning data", cleaningData);
  return (
    <Router>
      <DrawerComponent>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
          <li>
            <Link to="/block">Block</Link>
          </li>
          <li>
            <Link to="/create_location">Create Location</Link>
          </li>
        </ul>
      </DrawerComponent>
      <Routes>
        <Route exact path="/">
          <DashboardBody />
        </Route>
        <Route path="/location/:location_id/roomStatus">
          <RoomStatus />
        </Route>
        <Route path="/location">
          <Location />
        </Route>
        <Route path="/block">
          <Block />
        </Route>
        <Route path="/location_details/:location_id">
          <LocationDetails />
        </Route>
        <Route path="/create_location">
          <CreateLocation />
        </Route>
      </Routes>
    </Router>
  );
};

// Dashboard.propTypes = {};

export default Dashboard;
