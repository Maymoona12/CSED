import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coverpage from "./pages/general-pages/CoverPage/coverpage";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";
import ForgotPassword from "./pages/general-pages/PasswordPage/passwordpage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Coverpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordpage" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
