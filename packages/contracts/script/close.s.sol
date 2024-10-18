// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import "../src/RPS.sol";

contract CloseScript is Script {
    RPS public game = RPS(0x81F51A95E18819b87059993A74102Cd8F046d296);

    uint256 public seed = 123456790;

    function run() public {
        console.log("Game address: ", address(game));

        vm.startBroadcast();
        game.executeGame(seed);
        vm.stopBroadcast();
    }
}
