import { Account } from '../../types/schema';
import { Address } from '@graphprotocol/graph-ts';

export default function initializeAccount(address: Address): Account {
  let account = Account.load(address);
  if (account == null) {
    account = new Account(address);
    account.save();
  }
  return account as Account;
}
