import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import MyToken from "./contracts/MyToken.json";
import Kyc from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false , kycAddress : "0x123..", tokenSaleAddress : null, sellerBalance : null, userTokens : 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
    //  const deployedNetwork = SimpleStorageContract.networks[networkId];
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );

      this.kycInstance = new this.web3.eth.Contract(
        Kyc.abi,
        Kyc.networks[this.networkId] && Kyc.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded : true , tokenSaleAddress : MyTokenSale.networks[this.networkId].address,
      sellerBalance : await this.tokenInstance.methods.balanceOf(MyTokenSale.networks[this.networkId].address).call()},
      this.updateUserTokens ,  this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name] : value
    });
  }

  handleBuyTokens = async() => {

    await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1","wei")}); 

  }

  listenToTokenTransfer = () => {
    this.tokenInstance.events.Transfer({to:this.accounts[0]}).on("data", this.updateUserTokens);
  }

  updateUserTokens = async () => {
      let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
      this.setState({userTokens: userTokens});
      this.updateSellerTokens();
  }

  updateSellerTokens = async () => {
    let sellerToken = await this.tokenInstance.methods.balanceOf(MyTokenSale.networks[this.networkId].address).call();
    this.setState({sellerBalance: sellerToken});
}

  handleWhiteListing = async () => {
    
    await  this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC is completed for Account "+ this.state.kycAddress);
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Starduck Token Sale</h1>
        <p>Get your Token Now!!</p>
        
        
       
        <div>
          Address to whitelist : <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
          
        <button type="button" onClick={this.handleWhiteListing}> Add to whitelist </button> 
        </div>
        <div>To get tokens please send wei to  address: {this.state.tokenSaleAddress}</div>
        <div>You currently have  : {this.state.userTokens}</div>
        <div>Buy Tokens by clicking this Button</div>
        <button type="button" onClick={this.handleBuyTokens}> Buy Tokens </button> 
         <div>Seller Balance : {this.state.sellerBalance}</div>


      </div>
    );
  }
}

export default App;
