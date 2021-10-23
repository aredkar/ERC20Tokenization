//pragma solidity 0.6.1;
pragma solidity ^0.6.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20 {  //"Starducs Cappucino Token", "Cappu", 0
    constructor(uint256 initialSupply) ERC20() public {
        _mint(msg.sender, initialSupply);
    }
}