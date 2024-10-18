// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import "../src/RPS.sol";

contract CloseScript is Script {
    RPS public game = RPS(0xe276dC810A8a79a441E1744bd4c5aDB9f494CB9B);

    uint256 public seed = 123456790;

    function run() public {
        console.log("Game address: ", address(game));

        vm.startBroadcast();
        game.executeGame(seed);
        vm.stopBroadcast();
    }
}
