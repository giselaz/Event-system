import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Home from "./Pages/Home/Home";
import SingleEvent from "./Pages/SingleEvent/SingleEvent";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Footer from "./components/Layout/Footer/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/events/:eventId" element={<SingleEvent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup/email-verify" element={<Signup />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
