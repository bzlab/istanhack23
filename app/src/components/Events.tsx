import React, { useEffect, useState } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";

import { provider } from "../lib";
import { getSignerContract } from "../contract";

const Events = () => {
  const [newApplyEvents, setNewApplyEvents] = useState("");
  const [approvedEvents, setApprovedEvents] = useState("");

  const fetchApproved = async () => {
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);
    const fetchedEvents = await getSignerContract().queryFilter(
      "Approved",
      blockNumber - 10000,
      blockNumber,
    );

    let es: string[] = [];

    fetchedEvents.forEach((event) => {
      es.push(event.blockNumber.toString());
    });

    setApprovedEvents(JSON.stringify(es, null, 2));
  };

  const fetchNewApply = async () => {
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);
    const fetchedEvents = await getSignerContract().queryFilter(
      "NewApply",
      blockNumber - 10000,
      blockNumber,
    );

    let es: string[] = [];

    fetchedEvents.forEach((event) => {
      es.push(event.blockNumber.toString());
    });
    setNewApplyEvents(JSON.stringify(es, null, 2));
  };

  const handleGetEvents = async () => {
    fetchNewApply().catch(console.error);
    fetchApproved().catch(console.error)
  };

  useEffect(() => {
    fetchNewApply().catch(console.error);
    fetchApproved().catch(console.error);
  }, []);

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
        <Typography variant="h3">Events</Typography>

        <Typography variant="h5">Apply Event Block Numbers</Typography>
        <Typography variant="caption">{newApplyEvents}</Typography>

        <Typography variant="h5">Approved Event Block Numbers</Typography>
        <Typography variant="caption">{approvedEvents}</Typography>

        <Button
          sx={{ marginTop: 4, marginBottom: 1 }}
          variant="contained"
          onClick={handleGetEvents}
        >
          Get Events
        </Button>
      </Paper>
    </Box>
  );
};

export { Events };
