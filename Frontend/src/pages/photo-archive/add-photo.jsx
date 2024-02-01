import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useAddAlbum from "./useAddAlbum";

const NewAlbum = () => {
  const { mutate } = useAddAlbum();
  const [folder_name, setfolder_name] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("folder_name", folder_name);
    console.log("Form Data:", formData);
    mutate(formData);
  };

  return (
    <div className="New-Album">
      <div>
        <Box
        component="form"
          sx={{
            width: 600,
            height: "auto",
            maxWidth: "100%",
            border: "1px solid #ddd",
            padding: "50px",
            borderRadius: "20px",
            marginLeft: "50%", 
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              alignItems: "center",
              color: "#1f3f66",
              fontFamily: "Monaco",
              marginBottom: "40px",
              textAlign: "center", 
            }}
          >
            Add New Album
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              label="Album's Name"
              fullWidth
              id="folder_name"
              value={folder_name}
              onChange={(e) => setfolder_name(e.target.value)}
              sx={{ marginTop: "20px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              alignItems: "center",
            }}
          >
            <Button
             type="submit"
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                marginLeft: "82%",
                padding: "10px 35px",
                background: "#1f3f66",
                color: "white",
                cursor: "pointer",
                fontFamily:"Monaco",
                transition: "background 0.3s ease",
                fontSize: "16px",
              }}
            >
              Add
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default NewAlbum;
