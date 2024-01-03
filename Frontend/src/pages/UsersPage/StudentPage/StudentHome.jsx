import React from "react";

const StudentHome = () => {
  const Students = [
    {
      name: "Student",
      photoUrl: "CoverImages/image1.jpg",
    },
  ];

  return (
    <div>
      <div
        style={{
          font: "70px  black  solid",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "320px",
          fontFamily: "Georgia",
        }}
      >
        <div style={{ marginBottom: "8px", marginRight: "8px" }}>Hello,</div>
        <div style={{ marginBottom: "8px" }}>{Students[0].name}</div>
      </div>
    </div>
  );
};

export default StudentHome;
