import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginLeft: "23%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Times New Roman",
            marginBottom: "40px",
            color: "#1f3f66",
            textAlign: "center",
          }}
        >
          You do not have access to the requested page!
        </Typography>

        <CircularProgress disableShrink style={{ color: "#1f3f66" }} />
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={goBack} style={{ color: "#1f3f66" }}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
