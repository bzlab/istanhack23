import { NextFunction, Request, Response } from 'express';

import { agent, identifier } from '../agent/agent.js';

export const issueSocialSecurityCredential = async (req: Request, res: Response, next: NextFunction) => {
  const { did, tckk } = req.body;
  console.log(req.body);
  console.log(did, tckk);

  if (tckk === undefined || did === undefined) {
    res.status(400).send({ errorMessage: 'credential payload error' });
    return;
  }

  agent
    .createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject: {
          id: did,
          tckk: tckk,
        },
      },
      proofFormat: 'jwt',
    })
    .then((credential) => {
      console.log(JSON.stringify(credential, null, 2));
      res.json({ credential: credential });
    })
    .catch((error) => {
      console.log(error);
      next(error); // error handler middleware'ine gonder
    });
};

export const onboardCardUser = async (req: Request, res: Response, next: NextFunction) => {
  const { credential } = req.body;
  console.log(credential);

  if (credential === undefined) {
    res.status(400).send({ errorMessage: 'payload error' });
    return;
  }

  agent
    .verifyCredential({ credential })
    .then((result) => {
      console.log(result);
      res.send({ verified: result.verified }); // TODO response object nasil olmali?
    })

    .catch((error) => {
      console.log(error);
      next(error); // error handler middleware'ine gonder
    });

  // TOOD response'i dusun
};

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  res.send(200);
};
