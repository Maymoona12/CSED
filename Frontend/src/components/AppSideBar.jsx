import React from "react";
import { Drawer } from "@mui/material";
import useAuth from "../hooks/useAuth";
import DrawerHeader from "./DrawerHeader";
import SideBarMenu from "./SideBarMenu";

const drawerWidth = 210;

export const AppSideBar = () => {
  const { sideBar } = useAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "64px",
          backgroundColor: "#555b63",
          opacity: "0.9",
        },
      }}
      variant="persistent"
      anchor="left"
      open={sideBar}
    >
      <DrawerHeader />
      <SideBarMenu />
    </Drawer>
  );
};
