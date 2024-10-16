import { HandRegistered } from '../types/RPS/RPS';
import initializeAccount from './utils/initializeAccount';

export function handleHandRegistered(event: HandRegistered): void {
  const participationHash = event.params.participantHash;
  const owner = event.params.owner;
  const tokenId = event.params.tokenId;
  const move = event.params.move;

  const account = initializeAccount(owner);
}
