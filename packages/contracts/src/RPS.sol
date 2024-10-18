// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract RPS {
    IERC721 public participationToken;
    mapping(bytes32 participantHash => address owner) public participants;

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

    /// @notice Events
    event HandRegistered(
        bytes32 indexed participantHash, address indexed owner, uint256 tokenId, Moves move, uint256 timestamp
    );

    event Game(uint256 gameSeed);

    /// @notice Errors
    error ALREADY_A_PARTICIPANT();
    error NOT_A_PARTICIPANT();
    error NOT_ADMIN();
    error GAME_CLOSED();
    /// @notice Modifiers

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

        if (participants[participantHash] != address(0)) {
            revert ALREADY_A_PARTICIPANT();
        }
        _;
    }

    modifier isParticipant(uint256 tokenId) {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId);

        if (participants[participantHash] != msg.sender) {
            revert NOT_A_PARTICIPANT();
        }
        _;
    }

    /// @notice Constructor
    constructor(address erc721Address) {
        admin = msg.sender;
        participationToken = IERC721(erc721Address);
        isRegistrationOpen = true;
    }

    function getParticipantHash(address owner, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner, tokenId));
    }


    function _register(address _player, uint256 _tokenId, Moves _move) internal returns (bytes32 participantHash) {
        participantHash = getParticipantHash(_player, _tokenId);

        if (participants[participantHash] == address(0)) {
            // new user
            participants[participantHash] = _player;
        } else if (participants[participantHash] != _player) {
            // not the owner for that token
            revert NOT_A_PARTICIPANT();
        }

        entries[participantHash] = (Entry(_player, _tokenId, _move, block.timestamp));
        emit HandRegistered(participantHash, _player, _tokenId, _move, block.timestamp);
        return participantHash;
    }



    function registerPlayer(address _player, uint256 _tokenId, Moves _move) public onlyAdmin returns (bytes32 participantHash) {
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

    function getEntry(bytes32 participantHash) public view returns (Entry memory) {
        return entries[participantHash];
    }
}
