// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "./SimpleStorage.sol";

contract StorageFactory {
    // Array to keep track of deployed SimpleStorage contracts
    SimpleStorage[] public simpleStorageArray;

    // Deploy a new SimpleStorage contract and store its reference
    function createSimpleStorageContract() public {
        SimpleStorage newSimpleStorage = new SimpleStorage();
        simpleStorageArray.push(newSimpleStorage);
    }

    // Store a number in a specific SimpleStorage contract
    function storeValue(
        uint256 _simpleStorageIndex,
        uint256 _simpleStorageNumber
    ) public {
        require(
            _simpleStorageIndex < simpleStorageArray.length,
            "Index out of bounds"
        );

        SimpleStorage mySimpleStorage = simpleStorageArray[_simpleStorageIndex];
        mySimpleStorage.store(_simpleStorageNumber);
    }

    // Retrieve a number from a specific SimpleStorage contract
    function getValue(
        uint256 _simpleStorageIndex
    ) public view returns (uint256) {
        require(
            _simpleStorageIndex < simpleStorageArray.length,
            "Index out of bounds"
        );

        return simpleStorageArray[_simpleStorageIndex].retrive();
    }

    // Helper function to get total deployed contracts
    function getContractsCount() public view returns (uint256) {
        return simpleStorageArray.length;
    }

    // Get address of a deployed SimpleStorage contract
    function getContractAddress(
        uint256 _index
    ) public view returns (address) {
        require(_index < simpleStorageArray.length, "Index out of bounds");
        return address(simpleStorageArray[_index]);
    }
}