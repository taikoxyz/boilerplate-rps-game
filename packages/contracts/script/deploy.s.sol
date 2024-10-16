// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import "../src/RPS.sol";
import "../src/MockERC721.sol";

contract DeployScript is Script {
    RPS public game;
    MockERC721 public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        token = new MockERC721();
        game = new RPS(address(token));

        console.log("ERC721 token address: ", address(token));
        console.log("Game address: ", address(game));

        vm.stopBroadcast();
    }
}
