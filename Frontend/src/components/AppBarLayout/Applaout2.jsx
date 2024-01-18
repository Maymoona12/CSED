import React from "react";
import AppBarGeneral from "./AppBarGeneral";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Applayout2 = () => {
  return (
    <>
      <AppBarGeneral />
      <Grid container sx={{ marginTop: "20px" }}>
        <Outlet />
      </Grid>
    </>
  );
};

export default Applayout2;
