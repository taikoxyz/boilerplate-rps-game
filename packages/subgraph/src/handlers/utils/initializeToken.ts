import { Bytes, BigInt, Address } from '@graphprotocol/graph-ts';
import { ParticipationToken } from '../../types/schema';
import { ZERO_ADDRESS } from './common';

export default function initializeToken(id: string): ParticipationToken {
  let token = ParticipationToken.load(id);
  if (token == null) {
    token = new ParticipationToken(id);
    token.owner = Bytes.fromHexString(ZERO_ADDRESS) as Bytes;
    token.save();
  }
  return token as ParticipationToken;
}
