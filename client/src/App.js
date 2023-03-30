import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import DemoNavbar from "./components/Navbars/DemoNavbar";
import SimpleFooter from "./components/SimpleFooter";
import Login from "./components/auth/Login";
import Landing from "./screens/Landing";
import Register2 from "./screens/Register2";
import ProfileScreen from "./screens/ProfileScreen";
import EventScreen from "./screens/Event/EventScreen";
import SingleEventScreen from "./screens/Event/SingleEventScreen";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/vendor/nucleo/css/nucleo.css";
import PrivateRoute from "./components/PrivateRoute";
import RouteAdmin from "./components/RouteAdmin";
import AdminScreen from "./screens/Admin/AdminScreen";
import AdminParticipantScreen from "./screens/Admin/AdminParticipants";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [backendData, SetBackendData] = useState("");
  return (
    <div className="App">
      {/* <Route exact path="/" component={Landing} /> */}
      <DemoNavbar />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/login" exact element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route
          path="/departament/:departamentId/events"
          element={<EventScreen />}
        />
        <Route path="/events/:eventId" element={<SingleEventScreen />} />
        <Route element={<RouteAdmin />}>
          <Route path="/admin" element={<AdminScreen />} />
          <Route
            path="/participants/:eventId"
            element={<AdminParticipantScreen />}
          />
        </Route>
      </Routes>
      <SimpleFooter />
    </div>
  );
}

export default App;
