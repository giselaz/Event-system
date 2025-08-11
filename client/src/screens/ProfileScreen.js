import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import Container from "react-bootstrap/esm/Container";
import MyBookingScreen from "./Event/MyBookingScreen";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;

function ProfileScreen() {
  // const user = JSON.parse(localStorage.getItem("userData"));
  // const access_token = JSON.parse(localStorage.getItem("currentUser"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
    // if (!user) {
    //   <Navigate to="/login" />;
    // }
  }, [user]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setUser(null);
    // const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    // try {
    //   const result = axios.post("/auth/logout", refresh_token, {
    //     headers: {
    //       Authorization: `${access_token}`,
    //     },
    //   });
    //   localStorage.removeItem("currentUser");
    //   localStorage.removeItem("userData");
    //   localStorage.removeItem("refresh_token");
    //   window.location.href = "/login";
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <Container style={{ paddingBottom: "30px" }}>
            <div className="row">
              <div className="col-xs-12 mb-5">
                <div className="bs">
                  <h4>My Profile</h4>
                  <p>
                    <b>Name : </b>
                    {user.user.name}
                  </p>
                  <p>
                    <b>Email :</b> {user.user.email}
                  </p>
                </div>
              </div>
              <div class="col">
                <Button onClick={logout}>Log out</Button>
              </div>
            </div>
          </Container>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen></MyBookingScreen>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
