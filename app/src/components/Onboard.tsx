import { Box, Button, FormControl, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatDID, verifyCredential, getCredential } from "../lib";
import { getLocalCredential } from "../lib/did";

function Onboard() {
  const [did, setDID] = useState("did:ethr");
  const [tckk, setTCKK] = useState("");

  const [cTckk, setCtckk] = useState("");
  const [cIssuerDID, setCissuerDID] = useState("");
  const [cIssuanceDate, setCissuanceDate] = useState("");
  const [cSubjectDID, setCsubjectDID] = useState("");

  const [verified, setVerified] = useState(false);

  const fetchDID = async () => {
    let accounts = (await window.ethereum.request({
      method: "eth_accounts", //  request without popup
    })) as string[];

    if (accounts.length === 0) throw new Error("no account hence no did");

    setDID(formatDID(accounts[0]));
  };

  useEffect(() => {
    fetchDID().catch(console.error);
  }, [did]);

  const handleGenerate = async () => {
    let accounts = (await window.ethereum.request({
      method: "eth_accounts", //  request without popup
    })) as string[];

    if (accounts.length === 0) throw new Error("did generation error");

    setDID(formatDID(accounts[0]));
  };

  const handleRequestCredential = async () => {
    if (tckk.length != 11) throw new Error("malformed tckk");

    let accounts = (await window.ethereum.request({
      method: "eth_accounts", //  request without popup
    })) as string[];

    await getCredential(tckk, formatDID(accounts[0]));
    const c = getLocalCredential();
    console.log(c);
    setCissuerDID(c.issuer);
    setCtckk(c.tckk);
    setCissuanceDate(c.issuanceDate);
    setCsubjectDID(c.did);
  };

  const handleVerifyCredential = async () => {
    const v = await verifyCredential();
    console.log(v);
    setVerified(v);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
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
        <Typography variant="h3" component="div">
          Onboard Social Security
        </Typography>

        <Typography variant="body2" sx={{ marginTop: 4 }}>
          Decentralised Identitfer
        </Typography>

        <Typography variant="body1">{did}</Typography>

        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          color="secondary"
          onClick={handleGenerate}
        >
          Generate
        </Button>

        <FormControl sx={{ m: 3, minWidth: 200 }}>
          <TextField
            id="outlined-basic"
            label="TCKK"
            variant="outlined"
            onChange={(e) => {
              setTCKK(e.target.value);
            }}
          />

          <Button
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="contained"
            onClick={handleRequestCredential}
          >
            Request Credential
          </Button>
        </FormControl>

        <Typography variant="h5">Credeintial</Typography>

        <Typography variant="h6">Issuer Decentralised Identifier</Typography>
        <Typography variant="body2">{cIssuerDID}</Typography>

        <Typography variant="h6">Issuance Date</Typography>
        <Typography variant="body2">{cIssuanceDate}</Typography>

        <Typography variant="h6">Subject Decentralised Identifier</Typography>
        <Typography variant="body2">{cSubjectDID}</Typography>

        <Typography variant="h6">TCKK</Typography>
        <Typography variant="body2">{cTckk}</Typography>

        <Button
          sx={{ marginTop: 2, marginBottom: 2 }}
          variant="contained"
          onClick={handleVerifyCredential}
        >
          Verify Credential {verified}
        </Button>

        <Typography variant="h5">Verfication result {verified.toString()}</Typography>
      </Paper>
    </Box>
  );
}

export default Onboard;
