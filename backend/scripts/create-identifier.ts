/**
 * server kodu icinde bu identifier otomatik mi uretilmeli yoksa bu script ile disarida mi olusturulmali?
 * Default identifier olusturmak icin script
 * $ npx ts-node --esm scripts/create-identifier.ts
 */

import { agent } from '../src/agent/agent.js';

async function main() {
  const identifier = await agent.didManagerCreate({ alias: 'test' });
  console.log(`New identifier created`);
  console.log(JSON.stringify(identifier, null, 2));
}

main().catch(console.log);
