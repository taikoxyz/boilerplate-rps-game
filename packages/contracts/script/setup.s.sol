// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import "../src/RPS.sol";
import "../src/MockERC721.sol";

contract SetUpScript is Script {
    RPS public game = RPS(0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0);
    MockERC721 public token = MockERC721(0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e);

    address public owner = vm.addr(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);

    address[] public participants = [
        vm.addr(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d), // (1)
        vm.addr(0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a), // (2)
        vm.addr(0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6), // (3)
        vm.addr(0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a), // (4)
        vm.addr(0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba), // (5)
        vm.addr(0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e), // (6)
        vm.addr(0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356), // (7)
        vm.addr(0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97), // (8)
        vm.addr(0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6) // (9)
    ];

    function mintTokens() public {
        for (uint256 i = 0; i < participants.length; i++) {
            uint256 tokenId = vm.getBlockNumber() + participants.length + i;
            vm.prank(participants[i]);
            token.mint(participants[i], tokenId);
            console.log("Minted token ", tokenId, " for address: ", participants[i]);
            game.register(tokenId, RPS.Moves(i % 3));
        }
    }

    function setUp() public {}

    function run() public {
        vm.startBroadcast(owner);

        console.log("ERC721 token address: ", address(token));
        console.log("Game address: ", address(game));

        game.openRegistration();
        // create a bunch of entries
        vm.stopBroadcast();

        mintTokens();
    }
}
