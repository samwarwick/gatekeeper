// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IDevconNFT {
    function mint(address holder, string memory tokenURI) external;
}

contract DevconNFT is IDevconNFT, ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor() ERC721("DevconVIP", "DVIP") {
        // init
    }

    function mint(address holder, string memory tokenURI) external {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(holder, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
