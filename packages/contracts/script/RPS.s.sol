// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/RPS.sol";
import "../src/MockERC721.sol";

contract RPSScript is Script {
    RPS public game;
    MockERC721 public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        token = new MockERC721();
        game = new RPS(address(token));

        vm.stopBroadcast();
    }
}
