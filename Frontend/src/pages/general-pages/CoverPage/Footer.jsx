import React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <div
      style={{
        color: "White",
        bottom: 0,
        width: "100%",
        backgroundColor: "grey",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: "Sitka Heading" }}>
        © CSED 2024. All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
