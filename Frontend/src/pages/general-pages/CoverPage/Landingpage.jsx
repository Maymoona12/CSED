import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Coverpage from "./../../../pages/general-pages/CoverPage/Homepage";
import About from "./../../../pages/general-pages/CoverPage/About";
import Feature from "./../../../pages/general-pages/CoverPage/Feature";
import Contact from "./../../../pages/general-pages/CoverPage/Contact";
import Footer from "./../../../pages/general-pages/CoverPage/Footer";

const LandingPage = () => {
  const scrollToSection = (section) => {
    // Scroll to the specified section using smooth behavior
    document.getElementById(section).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <nav>
        {/* Add navigation links with onClick to trigger smooth scroll */}
        <Link to="/" onClick={() => scrollToSection("coverpage")}>
          Home
        </Link>
        <Link to="/about" onClick={() => scrollToSection("about")}>
          About
        </Link>
        <Link to="/feature" onClick={() => scrollToSection("feature")}>
          Feature
        </Link>
        <Link to="/contact" onClick={() => scrollToSection("contact")}>
          Contact
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div id="coverpage">
                <Coverpage />
              </div>
              <div id="about">
                <About/>
              </div>
              <div id="feature">
                <Feature />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default LandingPage;
