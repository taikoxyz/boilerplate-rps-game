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

    uint256 public seed = 123456790;

    function setUp() public {
        vm.startBroadcast(owner);
        token = new MockERC721();
        game = new RPS(address(token));
        vm.stopBroadcast();
    }

    function test_register_single() public {
        uint256 tokenId = 1;
        RPS.Moves move = RPS.Moves.ROCK;
        token.mint(participants[0], tokenId);
        vm.prank(participants[0]);
        bytes32 participantHash = game.register(tokenId, move);

        RPS.Entry memory entry = game.getEntry(participantHash);

        assertEq(uint256(entry.move), uint256(move));
        assertEq(entry.owner, participants[0]);
        assertEq(entry.tokenId, tokenId);
    }

    function test_register_all() public {
        RPS.Entry[] memory entries = new RPS.Entry[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            uint256 tokenId = i + 1;
            RPS.Moves move = RPS.Moves(i % 3);
            token.mint(participants[i], tokenId);
            vm.prank(participants[i]);
            bytes32 participantHash = game.register(tokenId, move);
            entries[i] = game.getEntry(participantHash);
        }

        assertEq(entries.length, participants.length);

        for (uint256 i = 0; i < participants.length; i++) {
            assertEq(uint256(entries[i].move), uint256(RPS.Moves(i % 3)));
            assertEq(entries[i].owner, participants[i]);
            assertEq(entries[i].tokenId, i + 1);
        }
    }

    function test_register_revertGameClosed() public {
        vm.prank(owner);
        game.executeGame(seed);

        uint256 tokenId = 1;
        RPS.Moves move = RPS.Moves.ROCK;
        token.mint(participants[0], tokenId);
        vm.prank(participants[0]);
        vm.expectRevert();
        game.register(tokenId, move);
    }
}
