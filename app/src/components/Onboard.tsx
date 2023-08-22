import { Box } from "@mui/material";
import { useEffect, useState } from "react";

// TODO buraya kendi offline provider'imi ekle

function Onboard() {
  useEffect(() => {
    const fetchSomething = async () => {};
  }, []);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Onboard</h1>
    </Box>
  );
}

export default Onboard;
