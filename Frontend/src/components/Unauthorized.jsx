import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material/styles/createTypography";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="h2"
          component="div"
          sx={{ flexGrow: 1, fontFamily: "Times New Roman" }}
        >
          You do not have access to the requested page!
        </Typography>

        <CircularProgress disableShrink />
      </Box>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </>
  );
};

export default Unauthorized;
