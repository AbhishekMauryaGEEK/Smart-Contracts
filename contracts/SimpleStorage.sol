// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;
// import "/contracts/RiskVault.sol";
contract SimpleStorage {
    uint256   favoriteNumber;
    uint256 public  brotherfavnumber;
    uint256 public  sisterfavnumber;

    struct  People{
        uint256 favoriteNumber;
        string name;
    }

    People public person = People ({favoriteNumber:1,name:"patrick"});
    People public person2 = People ({favoriteNumber:2,name:"spongbob"});
    People public person3 = People ({favoriteNumber:3,name:"crab"});

    mapping (string => uint256) public NameToFavoriteNumber;

    //boolean,uint,int,address,bytes
    // bool hasFavouriteNumber = false;
    // uint256 favoriteNumber = 123;
    // string favoriteNumber1 = "Five";
    // int256 favoriteNumber2 = 56;
    // address myaddress = 0x0014d3560721fc65008d6a761c259037D5fEcA73 ;
    // bytes32 favoriteBytes = "cat";
    // This gets initialized  to zero!
    // uint256[] public favoriteNumberList;

    People[] public people;

    function addperson(string memory _name ,uint256 _favoriteNumber) public {
        People memory  newPerson =People({favoriteNumber:_favoriteNumber,name:_name});
        people.push(newPerson);
        NameToFavoriteNumber[_name]=_favoriteNumber;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        // favoriteNumber = favoriteNumber +1;
        // uint256 testVar =5;
        retrive();
        retriveit();
        add();
    }

    // function something() public{
    //     testVar=6;
    // }

    //0xd9145CCE52D386f254917e481eB44e9943F39138

    function retrive() public view returns(uint256){
        return favoriteNumber;
    }

    // view ,pure
    function retriveit() public  view returns(uint256){
        return favoriteNumber + 1;
    }

    function add() public pure returns (uint256){
        return(3+3);
    }
}