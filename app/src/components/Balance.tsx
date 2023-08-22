import { useEffect, useState } from "react";
import { provider } from "../lib";
import { Box } from "@mui/material";

// TODO buraya kendi offline provider'imi ekle

function Account() {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");

  console.log(window.ethereum);
  useEffect(() => {
    const fetchAddress = async () => {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      setAccount(accounts[0]);
    };

    const fetchBalance = async () => {
      const b = await provider.getBalance(account);
      // console.log(b)
      setBalance(b.toString());
    };

    fetchAddress().catch(console.error);
    fetchBalance().catch(console.error);
  }, [balance, account]);

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
      <h1>Account</h1>
      <p>Account {account}</p>
      <p>Balance {balance}</p>
    </Box>
  );
}

export default Account;
