// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RiskVault {
    address public owner;
    address public aiAgent; // The wallet address controlled by your backend
    mapping(address => uint256) public balances;

    // Events let your backend easily listen for blockchain activity
    event Deposited(address indexed user, uint256 amount);
    event ProtectionExecuted(address indexed user, uint256 amountSaved);

    constructor(address _aiAgent) {
        owner = msg.sender;
        aiAgent = _aiAgent; 
    }

    // 1. Users deposit funds into the vault
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // 2. The AI Agent monitors risk off-chain and calls this if a crash happens
    function executeEmergencySave(address user) external {
        require(msg.sender == aiAgent, "Unauthorized: Only AI Agent can execute");
        
        uint256 amount = balances[user];
        require(amount > 0, "No funds to save");

        // Zero out the balance before transferring to prevent re-entrancy attacks
        balances[user] = 0;
        
        // For the hackathon demo, the "save" action is just sending funds safely back to the user's wallet.
        // In a real app, this might move funds to a stablecoin pool like USDC.
        payable(user).transfer(amount);

        emit ProtectionExecuted(user, amount);
    }
}