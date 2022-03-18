// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SleepyKoala is ERC721 {
    constructor() ERC721("SleepyKoala", "KOL") {}
}
