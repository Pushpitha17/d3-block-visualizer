import React from "react";
import { Box, Typography } from "@mui/material";

function AppBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        p: 0,
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" p={3}>
        Data visualization with React and D3.js
      </Typography>
    </Box>
  );
}

export default AppBar;
