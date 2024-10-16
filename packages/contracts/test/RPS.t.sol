// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import "../src/RPS.sol";
import "../src/MockERC721.sol";

contract RPSTest is Test {
    RPS public game;
    MockERC721 public token;

    address public owner = vm.addr(0x1);

    address[] public participants = [vm.addr(0x2), vm.addr(0x3), vm.addr(0x4), vm.addr(0x5), vm.addr(0x6)];

    uint256 public constant TOKEN_ID = 1;

    function setUp() public {
        vm.startBroadcast(owner);
        token = new MockERC721();
        game = new RPS(address(token));

        game.openRegistration();
        vm.stopBroadcast();
    }

    function test_register() public {
        for (uint256 i = 0; i < participants.length; i++) {
            uint256 tokenId = i + 1;
            RPS.Moves move = RPS.Moves(i % 3);
            token.mint(participants[i], tokenId);
            vm.prank(participants[i]);
            game.register(tokenId, move);
        }

        RPS.Entry[] memory entries = game.entries(game.gameNonce());

        assertEq(entries.length, participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            assertEq(uint256(entries[i].move), uint256(RPS.Moves(i % 3)));
            assertEq(entries[i].gameNonce, 1);
            assertEq(entries[i].owner, participants[i]);
            assertEq(entries[i].tokenId, i + 1);
        }
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
