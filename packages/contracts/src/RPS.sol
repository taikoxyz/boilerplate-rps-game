// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract RPS {
    IERC721 public participationToken;

    bool public isRegistrationOpen;
    uint256 public gameSeed;

    address public admin;

    mapping(bytes32 participantHash => Entry entry) public entries;

    enum Moves {
        ROCK,
        PAPER,
        SCISSORS
    }

    struct Entry {
        address owner;
        uint256 tokenId;
        Moves move;
        uint256 timestamp;
    }

    event HandRegistered(
        bytes32 indexed participantHash, address indexed owner, uint256 tokenId, Moves move, uint256 timestamp
    );

    event Game(uint256 gameSeed);

    error ALREADY_A_PARTICIPANT();
    error NOT_A_PARTICIPANT();
    error NOT_ADMIN();
    error GAME_CLOSED();

    modifier onlyAdmin() {
        if (msg.sender != admin) {
            revert NOT_ADMIN();
        }
        _;
    }

    modifier canRegister() {
        if (!isRegistrationOpen) {
            revert GAME_CLOSED();
        }
        _;
    }

    modifier notParticipant(uint256 tokenId) {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId);

        if (entries[participantHash].owner != address(0)) {
            revert ALREADY_A_PARTICIPANT();
        }
        _;
    }

    modifier isParticipant(uint256 tokenId) {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId);

        if (entries[participantHash].owner != msg.sender) {
            revert NOT_A_PARTICIPANT();
        }
        _;
    }

    constructor(address erc721Address) {
        admin = msg.sender;
        participationToken = IERC721(erc721Address);
        isRegistrationOpen = true;
    }

    function _register(address _player, uint256 _tokenId, Moves _move) internal returns (bytes32 participantHash) {
        participantHash = getParticipantHash(_player, _tokenId);

        if (entries[participantHash].owner == address(0)) {
            entries[participantHash].owner = _player;
        } else if (entries[participantHash].owner != _player) {
            revert NOT_A_PARTICIPANT();
        }

        entries[participantHash] = (Entry(_player, _tokenId, _move, block.timestamp));
        emit HandRegistered(participantHash, _player, _tokenId, _move, block.timestamp);
        return participantHash;
    }

    function registerPlayer(address _player, uint256 _tokenId, Moves _move)
        public
        onlyAdmin
        returns (bytes32 participantHash)
    {
        return _register(_player, _tokenId, _move);
    }

    function register(uint256 tokenId, Moves move) public canRegister returns (bytes32 participantHash) {
        return _register(msg.sender, tokenId, move);
    }

    function executeGame(uint256 _gameSeed) public onlyAdmin {
        isRegistrationOpen = false;
        gameSeed = _gameSeed;
        emit Game(_gameSeed);
    }

    function getParticipantHash(address owner, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner, tokenId));
    }

    function getEntry(bytes32 participantHash) public view returns (Entry memory) {
        return entries[participantHash];
    }
}
