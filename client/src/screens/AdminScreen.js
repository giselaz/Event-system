import React, { useState, useEffect } from "react";
import AddEventScreen from "./AddEventScreen";
import AdminEventScreen from "./AdminEventScreen";
import { Tabs } from "antd";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="ml-3 mt-3 mr-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Participants" key="1">
          Participants
          {/* <AdminBookingScreen></AdminBookingScreen> */}
        </TabPane>
        <TabPane tab="Events" key="2">
          <AdminEventScreen />
        </TabPane>
        <TabPane tab="Add Event" key="3">
          <AddEventScreen></AddEventScreen>
        </TabPane>
        <TabPane tab="Users" key="4">
          {/* <AdminUserScreen></AdminUserScreen> */}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
