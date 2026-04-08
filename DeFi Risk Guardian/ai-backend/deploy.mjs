import { ethers } from 'ethers';
import 'dotenv/config';

async function main() {
    console.log("--- STARTING DEPLOYMENT ---");
    
    // Updated RPC URL for 2026 Paseo Asset Hub
    const RPC_URL = "https://pas-rpc.dwellir.com"; 
    
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Testing connection before moving forward
    try {
        const network = await provider.getNetwork();
        console.log(`🔗 Connected to Chain ID: ${network.chainId}`);
    } catch (e) {
        console.error("❌ RPC Connection Failed. Try switching to a mobile hotspot or check your internet.");
        return;
    }

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const balance = await provider.getBalance(wallet.address);
    
    console.log(`Wallet Address: ${wallet.address}`);
    console.log(`Balance: ${ethers.formatEther(balance)} PAS`);

    if (balance === 0n) {
        console.error("❌ Error: No PAS tokens. Hit the faucet for your address!");
        return;
    }

    const abi = [
        {"inputs":[{"internalType":"address","name":"_aiAgent","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
        {"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},
        {"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"executeEmergencySave","outputs":[],"stateMutability":"nonpayable","type":"function"},
        {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
        {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
    ];

    const bytecode = "0x608060405234801561000f575f5ffd5b506040516107c43803806107c483398181016040528101906100319190610114565b335f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061013f565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100e3826100ba565b9050919050565b6100f3816100d9565b81146100fd575f5ffd5b50565b5f8151905061010e816100ea565b92915050565b5f60208284031215610129576101286100b6565b5b5f61013684828501610100565b91505092915050565b6106788061014c5f395ff3fe608060405260043610610049575f3560e01c806327e235e31461004d5780638da5cb5b14610089578063a6d5b732146100b3578063c3eaa2d3146100dd578063d0e30db014610105575b5f5ffd5b348015610058575f5ffd5b50610073600480360381019061006e9190610458565b61010f565b604051610080919061049b565b60405180910390f35b348015610094575f5ffd5b5061009d610124565b6040516100aa91906104c3565b60405180910390f35b3480156100be575f5ffd5b506100c7610148565b6040516100d491906104c3565b60405180910390f35b3480156100e8575f5ffd5b5061010360048036038101906100fe9190610458565b61016d565b005b61010d610357565b005b6002602052805f5260405f205f915090505481565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f39061055c565b60405180910390fd5b5f60025f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490505f811161027f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610276906105c4565b60405180910390fd5b5f60025f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508173ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610304573d5f5f3e3d5ffd5b508173ffffffffffffffffffffffffffffffffffffffff167f5ed09b1bd2566011db11b2ac8e1ce10e3c411e56da85b43abc7e25eebe7c25a18260405161034b919061049b565b60405180910390a25050565b3460025f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546103a3919061060f565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4346040516103f0919061049b565b60405180910390a2565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610427826103fe565b9050919050565b6104378161041d565b8114610441575f5ffd5b50565b5f813590506104528161042e565b92915050565b5f6020828403121561046d5761046c6103fa565b5b5f61047a84828501610444565b91505092915050565b5f819050919050565b61049581610483565b82525050565b5f6020820190506104ae5f83018461048c565b92915050565b6104bd8161041d565b82525050565b5f6020820190506104d65f8301846104b4565b92915050565b5f82825260208201905092915050565b7f556e617574686f72697a65643a204f6e6c79204149204167656e742063616e205f8201527f6578656375746500000000000000000000000000000000000000000000000000602082015250565b5f6105466027836104dc565b9150610551826104ec565b604082019050919050565b5f6020820190508181035f8301526105738161053a565b9050919050565b7f4e6f2066756e647320746f2073617665000000000000000000000000000000005f82015250565b5f6105ae6010836104dc565b91506105b98261057a565b602082019050919050565b5f6020820190508181035f8301526105db816105a2565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61061982610483565b915061062483610483565b925082820190508082111561063c5761063b6105e2565b5b9291505056fea26469706673582212208c3cf74f2c18a7480e020e12dea95a0daa497b843f5088db34e41f6d6ead3aba64736f6c634300081e0033";

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    
    console.log("🚀 Submitting deployment transaction...");
    const contract = await factory.deploy(wallet.address);
    
    await contract.waitForDeployment();
    console.log("✅ Contract Deployed at:", await contract.getAddress());
}

main().catch(console.error);