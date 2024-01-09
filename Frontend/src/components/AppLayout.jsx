import React from "react";
import AppBarLayout from "./AppBarLayout/AppBarLayout";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AppBarLayout />
      <Grid container sx={{ marginTop: "64px" }}>
        <Outlet />
      </Grid>
    </>
  );
};

export default AppLayout;
