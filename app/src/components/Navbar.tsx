import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" color="yellow">
          Insh
        </Typography>
        <Typography variant="h4" component="div">
          urance
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
