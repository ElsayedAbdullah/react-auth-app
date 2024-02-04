import { Container } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex h-100 flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
