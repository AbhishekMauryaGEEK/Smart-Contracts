// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PolkaRiskVault is AccessControl, ReentrancyGuard {
    // Define a specific role for your AI Agent
    bytes32 public constant PROTECTOR_ROLE = keccak256("PROTECTOR_ROLE");

    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event ProtectionExecuted(address indexed user, uint256 amountSaved);

    constructor(address _aiAgent) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PROTECTOR_ROLE, _aiAgent);
    }

    // Users deposit DOT/Tokens into the vault
    function deposit() external payable {
        require(msg.value > 0, "Amount must be > 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Triggered by AI Agent on Polkadot Hub
    function executeEmergencySave(address user) external onlyRole(PROTECTOR_ROLE) nonReentrant {
        uint256 amount = balances[user];
        require(amount > 0, "No funds to save");

        balances[user] = 0;
        
        // Return funds to user (on Polkadot Hub this would be the native asset)
        (bool success, ) = payable(user).call{value: amount}("");
        require(success, "Transfer failed");

        emit ProtectionExecuted(user, amount);
    }

    // Allow the admin to update the AI Agent if needed
    function updateAgent(address newAgent) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(PROTECTOR_ROLE, newAgent);
    }
}