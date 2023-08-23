import React, { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { getSignerContract } from "../contract";

const InsuranceApplyForm = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(1);
  const [assetID, setAssetID] = useState(1);

  const handleInsurenceApply = async () => {
    console.log({ description: description, value: value, assetID: assetID });

    const r = await getSignerContract().applyOfDisadvantagedIndividuals(
      description,
      assetID,
      value,
    );

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
        <Typography variant="h3">Apply Underserved Insurance</Typography>

        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{
            mt: 4,
          }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          sx={{
            mt: 2,
          }}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
        />

        <TextField
          id="outlined-basic"
          label="Asset ID"
          variant="outlined"
          sx={{
            mt: 2,
          }}
          onChange={(e) => {
            setAssetID(Number(e.target.value));
          }}
        />

        <Button
          sx={{ marginTop: 2, marginBottom: 1 }}
          variant="contained"
          onClick={handleInsurenceApply}
        >
          Apply
        </Button>
      </Paper>
    </Box>
  );
};

export { InsuranceApplyForm };
