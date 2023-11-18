import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Coverpage from "./pages/general-pages/CoverPage/coverpage";
import Signup from "./pages/general-pages/Signup/signup";
import Login from "./pages/general-pages/Login/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Coverpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/passwordpage" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Routes> */}
      </Router>
    </>
  );
}

export default App;
