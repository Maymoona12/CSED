import React from "react";

const Home = () => {
  const Users = [
    {
      name: "User",
      //   photoUrl: "ProfileImages/thaer.PNG",
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
        <div style={{ marginBottom: "8px" }}>{Users[0].name}</div>
      </div>
    </div>
  );
};

export default Home;
