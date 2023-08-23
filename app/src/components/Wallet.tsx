import { useEffect, useState } from "react";
import { persistCurrentAccount, provider, weiToEther } from "../lib";
import { Box, Button, Paper, Typography } from "@mui/material";

function Wallet() {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");

  const requestAccount = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // console.log(accounts);
    setAccount(accounts[0]);
    persistCurrentAccount(accounts[0]);
  };

  const handleConnect = async () => {
    await requestAccount().catch(console.error);
  };

  const fetchBalance = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_accounts", //  request without popup
    });
    if (accounts.length === 0) return;
    const a = accounts[0];
    console.log(`fetching balance of ${a}`);
    const b = await provider.getBalance(a);
    console.log(`fetched balance ${b}`);
    setAccount(a);
    setBalance(weiToEther(b.toString()));
  };

  useEffect(() => {
    fetchBalance().catch(console.error);
  }, [balance, account]);

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
        <Typography variant="h3">Wallet</Typography>

        <Typography variant="body2" sx={{ marginTop: 4 }}>
          Account
        </Typography>

        <Typography variant="body1">{account}</Typography>

        <Typography variant="body2" sx={{ marginTop: 1 }}>
          Balance
        </Typography>

        <Typography variant="body1">{balance} ISLM</Typography>

        <Button sx={{ marginTop: 2 }} variant="contained" onClick={handleConnect}>
          Connect Wallet
        </Button>
      </Paper>
    </Box>
  );
}

export default Wallet;
