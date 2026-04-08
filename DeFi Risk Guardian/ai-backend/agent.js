import { ethers } from 'ethers';
import axios from 'axios';
import 'dotenv/config';
import abi from './abi.json' assert { type: 'json' };

// 1. Setup Connection
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const vaultContract = new ethers.Contract(process.env.VAULT_ADDRESS, abi, wallet);

console.log("🛡️ DeFi Risk Guardian Agent is starting...");

// 2. The Decision-Making Logic (The "AI" part)
async function evaluateRisk() {
    try {
        // Fetch live ETH price from Binance API
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
        const currentPrice = parseFloat(response.data.price);
        
        console.log(`📊 Current ETH Price: $${currentPrice}`);

        // Define your Risk Threshold (e.g., if price drops below $2500)
        const CRITICAL_PRICE = 2500;

        if (currentPrice < CRITICAL_PRICE) {
            console.warn("⚠️ CRITICAL RISK DETECTED! Price is below threshold.");
            await triggerProtection();
        } else {
            console.log("✅ Market is healthy. No action needed.");
        }
    } catch (error) {
        console.error("❌ Error fetching market data:", error.message);
    }
}

// 3. The Execution Logic
async function triggerProtection() {
    try {
        console.log("🚀 Sending Emergency Transaction to Smart Contract...");
        
        // We call the function you wrote in your Solidity contract
        const tx = await vaultContract.executeEmergencySave(wallet.address);
        
        console.log(`🔗 Transaction Sent! Hash: ${tx.hash}`);
        await tx.wait(); // Wait for the blockchain to confirm
        console.log("🔒 Funds have been safely returned to the user.");
    } catch (error) {
        console.error("❌ Transaction failed:", error.reason || error.message);
    }
}

// Run the agent every 1 minute
setInterval(evaluateRisk, 60000);
evaluateRisk(); // Run once immediately on start