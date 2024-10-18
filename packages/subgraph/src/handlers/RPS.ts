import { HandRegistered } from '../types/RPS/RPS';
import { Account, ParticipationToken } from '../types/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleHandRegistered(event: HandRegistered): void {
  const participationHash = event.params.participantHash;
  const owner = event.params.owner;
  const tokenId = event.params.tokenId.toHexString();
  const move = event.params.move;
  const timestasmp = event.block.timestamp;

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
  token.move = BigInt.fromI32(move)
  token.timestamp = timestasmp
  token.save();
}
