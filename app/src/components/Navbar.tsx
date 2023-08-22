import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            MySigorta
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };