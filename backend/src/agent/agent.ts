import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin,
  IIdentifier,
} from '@veramo/core';

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager';

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr';

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager';

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c';

import { DIDComm, IDIDComm, IDIDCommMessage } from '@veramo/did-comm';

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations, Identifier } from '@veramo/data-store';

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm';

import { providers } from 'ethers';

// TODO dotenv
// TODO HAQQ network'e deployt et

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';
// This will be the secret key for the KMS
const KMS_SECRET_KEY = 'becd1950e548309a5d3c695ed75324d5f4612350549e9368d0ae3481044b9e5c';
const ETH_PROVIDER_URL = process.env.ETH_PROVIDER_URL ?? 'https://rpc.eth.bag.org.tr';
const ETH_NETWORK_NAME = process.env.ETH_NETWORK_NAME ?? 'bageth';
const ETH_NETWORK_CHAIN_ID = Number(process.env.NETWORK_CHAIN_ID) ?? 12345;
const BAGETH_REGISTRY = process.env.BAGETH_REGISTRY ?? '0x8808BeDb4bd73568D861452F69Ab03a5bd40fEec';

const IDENTIFIER_NOT_FOUND_MSG = 'Identifier not found';

let provider = new providers.JsonRpcProvider({
  url: ETH_PROVIDER_URL,
});

const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize();

export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin & IDIDComm
>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr:bageth',
      providers: {
        'did:ethr:bageth': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'bageth',
          rpcUrl: 'https://rpc.eth.bag.org.tr',
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({
          networks: [
            {
              name: ETH_NETWORK_NAME,
              chainId: ETH_NETWORK_CHAIN_ID,
              provider: provider,
              registry: BAGETH_REGISTRY,
            },
          ],
        }),
        ...webDidResolver(),
      }),
    }),
    new CredentialPlugin(),
    new DIDComm(),
  ],
});

//? identifier'i export etmenin daha kisa ve oz bir yolu var midir?

let identifier: IIdentifier;

try {
  identifier = await agent.didManagerGetByAlias({ alias: 'default' });
} catch (error: any) {
  console.log(error);
  //? default identifier yoksa burada olusturulmali mi?
  if (error.message === IDENTIFIER_NOT_FOUND_MSG) {
    identifier = await agent.didManagerCreate({ alias: 'default' });
  }
}

console.log(agent)

console.log('issuer agent created');

export { identifier };
