import React from "react";
import AppBarLayout from "./AppBarLayout/AppBarLayout";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppSideBar } from "./AppSideBar";

const AppLayout = () => {
  return (
    <>
      <AppBarLayout />
      <AppSideBar />
      <Grid container sx={{ marginTop: "80px" }}>
        <Outlet />
      </Grid>
    </>
  );
};

export default AppLayout;
