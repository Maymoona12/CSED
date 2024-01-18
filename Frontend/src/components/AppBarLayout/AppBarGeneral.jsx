import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Stack, ImageListItem } from "@mui/material";
import circle from "../../../CoverImages/circle.png";
import text from "../../../CoverImages/text.png";

export default function AppBarGeneral() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
        sx={{ background: "#1f3f66" }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: (theme) => theme.mixins.toolbar.minHeight,
              maxWidth: "275px",
              mx: "auto", // Center the Stack horizontally
              gap: 1,
            }}
          >
            <ImageListItem>
              <img
                src={circle}
                style={{ height: 54, width: 54 }}
                alt="Circle"
              ></img>
            </ImageListItem>
            <ImageListItem>
              <img src={text} alt="Text"></img>
            </ImageListItem>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
