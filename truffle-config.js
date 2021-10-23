const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;
//const Mnemonic = "claw situate area park empty palm hockey fee name couch giraffe anchor";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ganache_local: {
      provider: function() {       
         return new HDWalletProvider(process.env.MNEMONIC,"http://127.0.0.1:8545",AccountIndex) 
        },
        network_id: 5777
    },
    goerli_infura: {
      provider: function() {       
         return new HDWalletProvider(process.env.MNEMONIC,"https://goerli.infura.io/v3/6cf18e3eb9054c68b16e8f6bea7c6de7",AccountIndex) 
        },
        network_id: 5
    },
    ropsten_infura: {
      provider: function() {       
         return new HDWalletProvider(process.env.MNEMONIC,"https://ropsten.infura.io/v3/6cf18e3eb9054c68b16e8f6bea7c6de7",AccountIndex) 
        },
        network_id: 3
    }
    
  },
  compilers: {
	  solc: {
		  version: "0.6.0"
	  }
  }
}
;
