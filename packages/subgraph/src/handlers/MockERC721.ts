import { Transfer } from '../types/MockERC721/MockERC721';
import initializeAccount from './utils/initializeAccount';
import initializeToken from './utils/initializeToken';

export function handleERC721Transfer(event: Transfer): void {
  const from = event.params.from;
  const to = event.params.to;
  const tokenId = event.params.tokenId.toHexString();

  //const fromAccount = initializeAccount(from);
  const toAccount = initializeAccount(to);

  const token = initializeToken(tokenId);
  token.owner = toAccount.id;
  token.save();
}
