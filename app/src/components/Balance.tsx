import { useEffect, useState } from "react";
import { provider } from "../lib";

// TODO buraya kendi offline provider'imi ekle

function Balance() {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");

  console.log(window.ethereum);
  useEffect(() => {
    const fetchAddress = async () => {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setAccount(accounts[0])
    };

    const fetchBalance = async () => {
      const b = await provider.getBalance(account);
      console.log(b)
      setBalance(b.toString())
    };

    fetchAddress().catch(console.error);
    fetchBalance().catch(console.error);
  }, [balance, account]);

  return (
    <>
      <p>Balance {balance}</p>
      <p>Account {account}</p>
    </>
  );
}

export default Balance;
