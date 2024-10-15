// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract RPS {
    IERC721 public participationToken;
    mapping(bytes32 participantHash => Entry[] entries) public participantMoves;
    mapping(bytes32 participantHash => address owner) public participants;

    address public admin;

    enum Moves {
        ROCK,
        PAPER,
        SCISSORS
    }

    struct Entry {
        uint256 timestamp;
        Moves move;
    }

    /// @notice Events
    event HandRegistered(bytes32 indexed participantHash, address indexed owner, uint256 tokenId, Moves move);

    /// @notice Errors
    error ALREADY_A_PARTICIPANT();
    error NOT_A_PARTICIPANT();

    /// @notice Modifiers

    modifier onlyAdmin() {
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
    }

    function getParticipantHash(address owner, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(owner, tokenId));
    }

    function register(uint256 tokenId, Moves move) public {
        bytes32 participantHash = getParticipantHash(msg.sender, tokenId);

        if (participants[participantHash] == address(0)) {
            // new user
            participants[participantHash] = msg.sender;
        } else if (participants[participantHash] != msg.sender) {
            // not the owner
            revert NOT_A_PARTICIPANT();
        }

        participantMoves[participantHash].push(Entry(block.timestamp, move));

        emit HandRegistered(participantHash, msg.sender, tokenId, move);
    }

    function entries(address player, uint256 tokenId) public view returns (Entry[] memory _entries) {
        return participantMoves[getParticipantHash(player, tokenId)];
    }
}
