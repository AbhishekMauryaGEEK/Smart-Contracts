//Get funds from users
//withdraw  funds
//set a minimum  funding  value in USD

pragma solidity ^0.8.8;
contract FundMe{
    uint256 public minusdvalue = 50;
    function fund() public payable {
        //Want to be able  to set  a min fund  amount in usd
        //1. how do we send eth to this contract?
        require( msg.value>1e18,"didn't send  enough"); //1e18 ==1*10**18 or1*(10^18)
        require( msg.value>=minusdvalue,"didn't send  enough"); 
        // require(msg.value<1e18,"low amount of money");
    }
    function getPrice() public{
        //ABI
        //address : 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
    }
    function getConversionRate() public {}
    //function withdraw(){}
}