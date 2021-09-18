// Add imports here
const BIP39 = require("bip39");

// Add functions here
const generateMnemonic = () => {
  return BIP39.generateMnemonic();
};

let Mnemonic = generateMnemonic();

console.log(Mnemonic);
const isValidMnemonic = BIP39.validateMnemonic(Mnemonic);

if (isValidMnemonic) {
  console.log("The mnemonic is a valid mnemonic");
}

const generateSeed = (mnemonic) => {
  return BIP39.mnemonicToSeed(mnemonic);
};

let seed = generateSeed(Mnemonic);

console.log(seed);
/*

Do not edit code below this line.

*/

var mnemonicVue = new Vue({
  el: "#app",
  data: {
    mnemonic: "",
    privKey: "",
    pubKey: "",
    ETHaddress: "",
    sampleTransaction: {
      nonce: "0x00",
      gasPrice: "0x09184e72a000",
      gasLimit: "0x2710",
      to: "0x31c1c0fec59ceb9cbe6ec474c31c1dc5b66555b6",
      value: "0x10",
      data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
      chainId: 3,
    },
    signedSample: {},
    recoveredAddress: "",
  },
  methods: {
    generateNew: function () {
      this.mnemonic = generateMnemonic();
    },
    signSampleTx: function () {
      this.signedSample = signTx(this.privKey, this.sampleTransaction);
      console.log("signed Sample", this.signedSample);
    },
  },
  watch: {
    mnemonic: function (val) {
      this.privKey = generatePrivKey(val);
    },
    privKey: function (val) {
      this.pubKey = derivePubKey(val);
    },
    pubKey: function (val) {
      this.ETHaddress = deriveEthAddress(val);
      this.recoveredAddress = "";
    },
    signedSample: function (val) {
      this.recoveredAddress = getSignerAddress(val);
    },
  },
});
