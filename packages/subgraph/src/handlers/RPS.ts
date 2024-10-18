import { Game, HandRegistered } from '../types/RPS/RPS';
import { Account, ParticipationToken, RpsGame } from '../types/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleHandRegistered(event: HandRegistered): void {
  const contract = event.address;
  const participationHash = event.params.participantHash;
  const owner = event.params.owner;
  const tokenId = event.params.tokenId.toHexString();
  const move = event.params.move;
  const timestasmp = event.block.timestamp;

  let game = RpsGame.load(contract);
  if (game == null) {
    game = new RpsGame(contract);
    game.seed = BigInt.fromI32(0);
    game.save();
  }

  let account = Account.load(owner);
  if (account == null) {
    account = new Account(owner);
    account.save();
  }

  let token = ParticipationToken.load(tokenId);
  if (token == null) {
    token = new ParticipationToken(tokenId);
  }

  token.participationHash = participationHash;
  token.player = account.id;
  token.move = BigInt.fromI32(move);
  token.timestamp = timestasmp;
  token.game = game.id;
  token.score = BigInt.fromI32(0);
  token.save();
}

enum Move {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

function duel(player1: Move, player2: Move): number {
  // 0: Draw, 1: Player1 wins, 2: Player2 wins
  if (player1 === player2) {
    return 0; // Draw
  } else if (
    (player1 === Move.Rock && player2 === Move.Scissors) ||
    (player1 === Move.Paper && player2 === Move.Rock) ||
    (player1 === Move.Scissors && player2 === Move.Paper)
  ) {
    return 1; // Player1 wins
  } else {
    return 2; // Player2 wins
  }
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function handleGame(event: Game): void {
  const contract = event.address;
  const gameSeed = parseInt(event.params.gameSeed.toString());

  const game = RpsGame.load(contract);

  if (!game) {
    throw new Error('Game not found');
  }

  let participants = game.participants.load();

  // Run the game for 5 rounds of battle royale duels
  const rounds = 5;
  for (let k = 0; k < rounds; k++) {
    const players: ParticipationToken[] = [];

    // Fill the players array directly while iterating over participants
    for (let i = 0; i < participants.length; i++) {
      players[i] = participants[i];
    }

    //Sort the 'players' array based on the seed
    for (let i = 0; i < players.length - 1; i++) {
      for (let j = 0; j < players.length - 1 - i; j++) {
        const randomValue1 = seededRandom(k + gameSeed + j);
        const randomValue2 = seededRandom(k + gameSeed + (j + 1));

        if (randomValue1 > randomValue2) {
          const temp = players[j];
          players[j] = players[j + 1];
          players[j + 1] = temp;
        }
      }
    }

    // Process all participants in pairs and assign scores
    for (let i = 0; i < players.length; i++) {
      const player1 = players[i];
      const move1 = parseInt(player1.move.toString()) as Move;

      for (let j = i + 1; j < players.length; j++) {
        const player2 = players[j];
        const move2 = parseInt(player2.move.toString()) as Move;

        // Conduct the duel and assign scores
        const result = duel(move1, move2);

        if (result === 1) {
          // Player 1 wins
          player1.score = player1.score.plus(BigInt.fromI32(5));
        } else if (result === 2) {
          // Player 2 wins
          player2.score = player2.score.plus(BigInt.fromI32(5));
        }

        if (player1.score == player2.score) {
          // untie based on player id
          if (player1.id > player2.id) {
            player1.score = player1.score.plus(BigInt.fromI32(3));
          } else {
            player2.score = player2.score.plus(BigInt.fromI32(3));
          }
        }

        player1.save();
        player2.save();
      }
    }
  }

  game.seed = event.params.gameSeed;
  game.save();
}
