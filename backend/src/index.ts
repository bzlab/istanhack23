import { agent } from './agent/agent.js'; // TODO bu agent nasil init edilmeli: server calistiginda hazir olmali?
import { startServer } from './server/server.js';

// agent load etsin diye
console.log(agent.availableMethods()) 

startServer();
