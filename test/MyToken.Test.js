const Token = artifacts.require("MyToken");

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

//require("dotenv").config({path: "../.env"});

contract("Token Test", async(accounts)=> {
    const [deployerAccounts,recipient,anotherAccount] = accounts;

    beforeEach( async() => {
        this.myToken =  await Token.new(process.env.INITIAL_TOKENS);
    })

        it("all token should be in my account", async() => {
        //    return;
            let instance = this.myToken; // await Token.deployed();
            let totalSupply = await instance.totalSupply();
           
          return  expect(await instance.balanceOf(deployerAccounts)).to.be.a.bignumber.equal(totalSupply);
        })


          
        it("is not possible to send more tokens then available", async() => {
            //    return;
                let instance = this.myToken; // await Token.deployed();
              //  let totalSupply = await instance.totalSupply();
                let deployerBalance = await instance.balanceOf(deployerAccounts);// instance.balanceOf(deployerAccounts);
                let recipientBalance = await instance.balanceOf(recipient);
                const sendToken = 1;
                expect(instance.balanceOf(deployerAccounts)).to.eventually.be.a.bignumber.equal(new BN(deployerBalance));
                 expect( instance.transfer(recipient,new BN(deployerBalance+1))).to.eventually.be.rejected;
               //await instance.web3.
                expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(recipientBalance);
               return expect(instance.balanceOf(deployerAccounts)).to.eventually.be.a.bignumber.equal(deployerBalance);
    
            })
 
      
        it("is possible to send token between the accounts", async() => {

            let instance = this.myToken; // await Token.deployed();
            let totalSupply = await instance.totalSupply();
            let deployerBalance = await instance.balanceOf(deployerAccounts);
            const sendToken = 1;
            expect(await instance.balanceOf(deployerAccounts)).to.be.a.bignumber.equal(totalSupply);
            expect(instance.transfer(recipient,sendToken)).to.eventually.be.fulfilled;
           //await instance.web3.
           console.log(await instance.balanceOf(recipient));
            expect(await instance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(sendToken));
            return   expect(await instance.balanceOf(deployerAccounts)).to.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
            
        })


          

  

});