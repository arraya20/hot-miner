const { Contract, keyStores, connect } = require('near-api-js');
const { KeyPairEd25519 } = require('near-api-js/lib/utils');
const data = require('../wallets.json');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  for (const accountData of data) {
    const keyStore = new keyStores.InMemoryKeyStore();
    keyStore.setKey('mainnet', accountData.publicKey, new KeyPairEd25519(accountData.privateKey));

    const config = {
      keyStore,
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org/'
    };

    const near = await connect(config);
    const account = await near.account(accountData.publicKey);
    const contract = new Contract(account, 'game.hot.tg', {
      changeMethods: ['claim'],
      viewMethods: [],
      useLocalViewExecution: false
    });

    await contract.claim({ args: {} });
    const balances = await account.getAccountBalance();
    console.log(`Account: ${accountData.publicKey}, Balance: ${balances.total}`);

    // Sleep for 5 seconds before the next iteration
    await sleep(5000);
  }
}

module.exports = main;
