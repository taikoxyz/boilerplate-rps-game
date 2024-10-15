// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import "../src/RPS.sol";
import "../src/MockERC721.sol";

contract RPSTest is Test {
    RPS public game;
    MockERC721 public token;

    address public owner = vm.addr(0x1);
    address public player1 = vm.addr(0x2);

    uint256 constant public TOKEN_ID = 1;

    function setUp() public {
        vm.startBroadcast(owner);
        token = new MockERC721();
        game = new RPS(address(token));
        vm.stopBroadcast();
    }

    function test_register() public {
        token.mint(player1, TOKEN_ID);
        uint256 registerBlockTimestamp = vm.getBlockTimestamp();

        vm.prank(player1);
        game.register(1, RPS.Moves.ROCK);

        RPS.Entry[] memory entries = game.entries(player1, TOKEN_ID);

        assertEq(entries.length, 1);

        RPS.Entry memory entry = entries[0];

        assertEq(entry.timestamp, registerBlockTimestamp);
        assertEq(uint256(entry.move), uint256(RPS.Moves.ROCK));
    }
    /*
    function test_Increment() public {
        game.increment();
        assertEq(game.number(), 1);
    }

    function testFuzz_SetNumber(uint256 x) public {
        game.setNumber(x);
        assertEq(game.number(), x);
    }*/
}
