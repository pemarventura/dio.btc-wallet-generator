//dependency import
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//define the project to the test network
const network = bitcoin.networks.testnet;

//define the project to the bitcoin network
// const network = bitcoin.networks.bitcoin;

//HD wallet derivation 
const path = `m/49'/1'/0'/0`;

//creating a random string for the seed
let mnemonic = bip39.generateMnemonic();

//crypting into a seed
const seed = bip39.mnemonicToSeedSync(mnemonic);

//creating the wallet root in the network
let root = bip32.fromSeed(seed, network);

//creating an account - par pvt-pub keys
let account = root.derivePath(path);

//creating account node
let node = account.derive(0).derive(0);

//creating the btc adress
let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

//loggin the information generated
console.log("Wallet generated");
console.log("Adress: ", btcAdress);
console.log("Private key: ", node.toWIF());
console.log("Seed: ", mnemonic);





