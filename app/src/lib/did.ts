// const didKey = "did";
const credentialKey = "credential";

const formatDID = (address: string) => {
  if (address.length < 42) throw new Error(`did format error ${address}`);

  return "did:ethr:bageth:" + address;
};

const getCredential = async (tckk: string, did: string) => {
  const body = JSON.stringify({
    did: did,
    tckk: tckk,
  });

  console.log(`getCredential body ${body}`);

  let resp = await fetch("http://localhost:3000/issue/social", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  let b = await resp.json();
  let c = b.credential;

  console.log("issued credential");
  console.log(c);

  window.localStorage.setItem(credentialKey, JSON.stringify(c));
};

const verifyCredential = async (): Promise<boolean> => {
  let body = JSON.stringify({
    credential: JSON.parse(window.localStorage.getItem(credentialKey)!),
  });

  console.log("verifyCredential body");
  console.log(body);

  let resp = await fetch("http://localhost:3000/onboard", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  let r = await resp.json();
  console.log(r);
  return r.verified;
};

const getLocalCredential = () => {
  const cStr = window.localStorage.getItem(credentialKey);
  if (cStr === null) throw new Error("no credential in local storage");

  const c = JSON.parse(cStr);
  console.log(c);

  return {
    issuer: c.issuer.id,
    issuanceDate: c.issuanceDate,
    did: c.credentialSubject.id,
    tckk: c.credentialSubject.tckk,
  };
};

// const onboard = () => {
//   fetch("http://localhost:3000/health").then((resp) => {
//     // console.log(resp)
//   });
// };

export { formatDID, getCredential, getLocalCredential, verifyCredential };
