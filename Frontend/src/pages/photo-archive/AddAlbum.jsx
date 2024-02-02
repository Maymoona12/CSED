import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAddAlbum from "./useAddAlbum";

const AddAlbum = () => {
  const { mutate: AddAlbum } = useAddAlbum();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const folder_name = data.get("folder_name");
    console.log(folder_name);
    AddAlbum({ folder_name });
  };

  return (
    <div className="New-Album">
      <div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 600,
            height: "auto",
            maxWidth: "100%",
            border: "1px solid #ddd",
            padding: "50px",
            borderRadius: "20px",
            marginLeft: "50%",
            marginRight: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "#1f3f66",
              fontFamily: "Monaco",
              marginBottom: "40px",
              marginLeft: "175px",
            }}
          >
            Add New Album
          </h2>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "5px",
              marginLeft: "8px",
              fontFamily: "Monaco",
              color: "black",
            }}
          >
            Title
          </Typography>
          <TextField
            id="title"
            margin="normal"
            required
            fullWidth
            label="Title to your folder"
            name="folder_name"
            autoFocus
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              variant="contained"
              style={{
                marginTop: "10px",
                marginLeft: "88%",
                padding: "10px 20px",
                background: "white",
                color: "blue",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "Monaco",
                fontSize: "18px",
                color: "white",
                background: "#1f3f66",
                "&:hover": {
                  background: "#1f3f66",
                },
              }}
            >
              Add
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddAlbum;
