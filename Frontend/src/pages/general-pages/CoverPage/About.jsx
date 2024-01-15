import React from "react";
import Typography from "@mui/material/Typography";
import Logo from "../../../../CoverImages/logo.png";

const About = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" , marginTop: "2%"}}>
      <div>
        <img src={Logo} alt="Logo" style={{ width: "100%", height: "auto" , marginTop:"60px" }} />
      </div>

      <div style={{ maxWidth: "60%" }}>
        <Typography variant="h3" component="div" color="secondary" sx={{  margin: "80px 60px" , fontFamily: "Brush Script MT"}}>
         About CSED
        </Typography>
        <Typography variant="h5" sx={{ margin: "50px " ,fontFamily: "Comic Sans MS"}}>
          The CSED (Computer Systems Engineering Department) Portal is a dedicated platform designed for streamlined communication and enhanced engagement within the department.
          Exclusively accessible to department members: Lecturers or Students, the portal addresses challenges in existing academic platforms, offering a secure and department-specific space.
          By combining streamlined communication, simplified academic interactions, and community building, CSED promises to elevate the academic environment at Palestine Technical University - Kadoorie.
        </Typography>
      </div>
    </div>
  );
};

export default About;
