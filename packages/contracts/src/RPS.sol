// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract RPS is Pausable {
    IERC721 public participationToken;
    mapping(uint256 gameNonce => Entry[] entries) public gameEntries;
    mapping(bytes32 participantHash => address owner) public participants;

    address public admin;

    uint256 public gameNonce;

    mapping(uint256 gameNonce => Entry[] participants) public games;

    enum Moves {
        ROCK,
        PAPER,
        SCISSORS
    }

    struct Entry {
        uint256 gameNonce;
        uint256 timestamp;
        address owner;
        uint256 tokenId;
        Moves move;
    }

    /// @notice Events
    event HandRegistered(
        bytes32 indexed participantHash, address indexed owner, uint256 tokenId, uint256 gameNonce, Moves move
    );

    event Game(uint256 indexed gameNonce, Entry[] participants);

    /// @notice Errors
    error ALREADY_A_PARTICIPANT();
    error NOT_A_PARTICIPANT();

    /// @notice Modifiers

    modifier onlyAdmin() {
        _;
    }

    modifier notParticipant(uint256 tokenId) {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId, gameNonce);

        if (participants[participantHash] != address(0)) {
            revert ALREADY_A_PARTICIPANT();
        }
        _;
    }

    modifier isParticipant(uint256 tokenId) {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId, gameNonce);

        if (participants[participantHash] != msg.sender) {
            revert NOT_A_PARTICIPANT();
        }
        _;
    }

    /// @notice Constructor
    constructor(address erc721Address) {
        admin = msg.sender;
        participationToken = IERC721(erc721Address);
        gameNonce = 1;
        _pause();
    }

    function _checkGameNonce() internal {
        gameNonce++;
    }

    function getParticipantHash(address owner, uint256 tokenId, uint256 _gameNonce) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner, tokenId, _gameNonce));
    }

    function register(uint256 tokenId, Moves move) public whenNotPaused {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId, gameNonce);

        if (participants[participantHash] == address(0)) {
            // new user
            participants[participantHash] = msg.sender;
        } else if (participants[participantHash] != msg.sender) {
            // not the owner for that token
            revert NOT_A_PARTICIPANT();
        }

        gameEntries[gameNonce].push(Entry(gameNonce, block.timestamp, msg.sender, tokenId, move));

        emit HandRegistered(participantHash, msg.sender, tokenId, gameNonce, move);
    }

    function entries(uint256 _gameNonce) public view returns (Entry[] memory _entries) {
        return gameEntries[_gameNonce];
    }

    // Pausable
    function togglePause() public onlyAdmin {
        if (!paused()) {
            _pause();
        } else {
            _unpause();
        }
    }

    // allows for players to register
    function openRegistration() public onlyAdmin {
        _unpause();
    }

    function executeGame() public onlyAdmin {}
}
