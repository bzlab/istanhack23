import { agent } from '../src/agent/agent.js';

async function main() {
  const identifier = await agent.didManagerCreate({ alias: 'test' });
  console.log(`New identifier created`);
  console.log(JSON.stringify(identifier, null, 2));
}

main().catch(console.log);
