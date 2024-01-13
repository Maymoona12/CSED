import React, { useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Homepage";
import About from "./About";
import Feature from "./Feature";
import Contact from "./Contact";
import Footer from "./Footer";

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
        <Link to="/" onClick={() => scrollToSection("homePage")}>
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
              <div id="homePage">
                <HomePage />
              </div>
              <div id="about">
                <About />
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
