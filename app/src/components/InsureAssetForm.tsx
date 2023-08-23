import React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import { getSignerContract } from "../contract";

const InsureAssetForm = () => {

  const handleInsurenceApply = async () => {
    
    const r = await getSignerContract().insureAsset();
    console.log(r);

  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Insure Asset</Typography>

        <Button
          sx={{ marginTop: 4, marginBottom: 1 }}
          variant="contained"
          onClick={handleInsurenceApply}
        >
          Apply
        </Button>
      </Paper>
    </Box>
  );
};

export { InsureAssetForm };
