import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { errorHandler } from './middlewares.js';
import { healthCheck, issueSocialSecurityCredential, onboardCardUser } from './handlers.js';

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // -H "Content-type: application/json" // bu header'in gelmesi lazim
app.use(morgan('combined')); // HTTP request logger

app.post('/issue/social/', issueSocialSecurityCredential);
app.post('/onboard', onboardCardUser);
app.get('/health', healthCheck);

// You define error-handling middleware last, after other app.use() and routes calls; for example:
app.use(errorHandler);

export function startServer() {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
}
