import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Contact = () => {
  const handleSend = () => {
    // Simulate sending an email to the admin
    // In a real-world scenario, make an API call to the server to send the suggestion
    const suggestion = document.getElementById("suggestion").value;

    // Clear the form or perform other actions as needed
    document.getElementById("suggestion").value = "";
  };

  const handleCancel = () => {
    // Clear the form when the "Cancel" button is clicked
    document.getElementById("suggestion").value = "";
  };

  return (
    <div>
      <Typography variant="h3" component="div" sx={{ color: "Highlight", marginBottom: 2, fontFamily: "Brush Script MT", margin: "80px" }}>
        Contact CSED
      </Typography>
      <Card sx={{ maxWidth: "80%", margin: "40px", marginTop: "0px" }}>
        <CardContent>
          <form>
            <TextField
              id="suggestion"
              label="Your Suggestion"
              multiline
              rows={4}
              margin="normal"
              style={{ width: "100%", marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginRight: 2, marginTop: 3 }}>
              Send
            </Button>
            <Button variant="contained" color="inherit" onClick={handleCancel} sx={{ marginLeft: 2, marginTop: 3 }}>
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
