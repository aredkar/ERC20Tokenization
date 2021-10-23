const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

/*var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");


chai.use(chaiAsPromised);
*/
const chai = require("./setupchai.js");
const expect = chai.expect;
const BN = web3.utils.BN;
require("dotenv").config({path: "../.env"});

contract("Token Test", async(accounts)=> {
    const [deployerAccounts,recipient,anotherAccount] = accounts;

 /*   beforeEach( async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })
    */

     it('should not have any tokens in deployerAccounts', async() => {
         
        let instance = await Token.deployed();
        return  expect(await instance.balanceOf(deployerAccounts)).to.be.a.bignumber.equal(new BN(0));

     });

     it('should have ALL tokens in TokenSale', async() => {
         
        let instance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        const totalTokens = await instance.totalSupply();
        return  expect(await instance.balanceOf(tokenSaleInstance.address)).to.be.a.bignumber.equal(totalTokens);

     });

     it('should be possible to buy tokens from TokenSale', async() => {
         
        let instance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let KycContractInstance = await KycContract.deployed();
        let balanceBefore = await instance.balanceOf(deployerAccounts);
        KycContractInstance.setKycCompleted(deployerAccounts, {from:deployerAccounts});
        console.log(await web3.eth.getBalance(deployerAccounts));
        expect(tokenSaleInstance.sendTransaction({from: deployerAccounts, value: web3.utils.toWei("1","wei")})).to.eventually.be.fulfilled;
        console.log(await instance.balanceOf(deployerAccounts));
        console.log(await instance.balanceOf(tokenSaleInstance.address));
        console.log(await web3.eth.getBalance(deployerAccounts));
       //   expect(await instance.balanceOf(deployerAccounts)).to.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
          return console.log(await web3.eth.getBalance(deployerAccounts));
        
     });

          

  

});