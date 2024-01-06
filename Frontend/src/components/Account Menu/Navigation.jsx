import { useNavigate } from "react-router-dom";
import { ListItem } from "@mui/material";

const Navigation = ({ link, setting }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(link);

  return (
    <ListItem disablePadding component="a" onClick={handleNavigate}>
      {setting}
    </ListItem>
  );
};

export default Navigation;
