import React from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { getUser } = useAuth();
  const user = getUser();
  return (
    <div
      style={{ textAlign: "center", marginTop: "100px", fontFamily: "Georgia" }}
    >
      <h1
        style={{
          fontSize: "70px",
          color: "black",
          borderBottom: "solid",
          marginBottom: "8px",
        }}
      >
        Hello {user?.name}
      </h1>
    </div>
  );
};

export default Home;
