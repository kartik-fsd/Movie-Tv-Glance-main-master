import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ size = 40, color = "secondary" }) => {


  return (
    <div style={{display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width:'100%'}}>
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default Loader;
