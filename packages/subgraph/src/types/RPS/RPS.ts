// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { ethereum, JSONValue, TypedMap, Entity, Bytes, Address, BigInt } from '@graphprotocol/graph-ts';

export class Game extends ethereum.Event {
  get params(): Game__Params {
    return new Game__Params(this);
  }
}

export class Game__Params {
  _event: Game;

  constructor(event: Game) {
    this._event = event;
  }

  get gameNonce(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get participants(): Array<GameParticipantsStruct> {
    return this._event.parameters[1].value.toTupleArray<GameParticipantsStruct>();
  }
}

export class GameParticipantsStruct extends ethereum.Tuple {
  get gameNonce(): BigInt {
    return this[0].toBigInt();
  }

  get timestamp(): BigInt {
    return this[1].toBigInt();
  }

  get owner(): Address {
    return this[2].toAddress();
  }

  get tokenId(): BigInt {
    return this[3].toBigInt();
  }

  get move(): i32 {
    return this[4].toI32();
  }
}

export class HandRegistered extends ethereum.Event {
  get params(): HandRegistered__Params {
    return new HandRegistered__Params(this);
  }
}

export class HandRegistered__Params {
  _event: HandRegistered;

  constructor(event: HandRegistered) {
    this._event = event;
  }

  get participantHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get gameNonce(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get move(): i32 {
    return this._event.parameters[4].value.toI32();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RPS__entriesResult_entriesStruct extends ethereum.Tuple {
  get gameNonce(): BigInt {
    return this[0].toBigInt();
  }

  get timestamp(): BigInt {
    return this[1].toBigInt();
  }

  get owner(): Address {
    return this[2].toAddress();
  }

  get tokenId(): BigInt {
    return this[3].toBigInt();
  }

  get move(): i32 {
    return this[4].toI32();
  }
}

export class RPS__gameEntriesResult {
  value0: BigInt;
  value1: BigInt;
  value2: Address;
  value3: BigInt;
  value4: i32;

  constructor(value0: BigInt, value1: BigInt, value2: Address, value3: BigInt, value4: i32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set('value0', ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set('value1', ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set('value2', ethereum.Value.fromAddress(this.value2));
    map.set('value3', ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set('value4', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value4)));
    return map;
  }

  getGameNonce(): BigInt {
    return this.value0;
  }

  getTimestamp(): BigInt {
    return this.value1;
  }

  getOwner(): Address {
    return this.value2;
  }

  getTokenId(): BigInt {
    return this.value3;
  }

  getMove(): i32 {
    return this.value4;
  }
}

export class RPS__gamesResult {
  value0: BigInt;
  value1: BigInt;
  value2: Address;
  value3: BigInt;
  value4: i32;

  constructor(value0: BigInt, value1: BigInt, value2: Address, value3: BigInt, value4: i32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set('value0', ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set('value1', ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set('value2', ethereum.Value.fromAddress(this.value2));
    map.set('value3', ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set('value4', ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value4)));
    return map;
  }

  getGameNonce(): BigInt {
    return this.value0;
  }

  getTimestamp(): BigInt {
    return this.value1;
  }

  getOwner(): Address {
    return this.value2;
  }

  getTokenId(): BigInt {
    return this.value3;
  }

  getMove(): i32 {
    return this.value4;
  }
}

export class RPS extends ethereum.SmartContract {
  static bind(address: Address): RPS {
    return new RPS('RPS', address);
  }

  admin(): Address {
    let result = super.call('admin', 'admin():(address)', []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall('admin', 'admin():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  entries(_gameNonce: BigInt): Array<RPS__entriesResult_entriesStruct> {
    let result = super.call('entries', 'entries(uint256):((uint256,uint256,address,uint256,uint8)[])', [
      ethereum.Value.fromUnsignedBigInt(_gameNonce),
    ]);

    return result[0].toTupleArray<RPS__entriesResult_entriesStruct>();
  }

  try_entries(_gameNonce: BigInt): ethereum.CallResult<Array<RPS__entriesResult_entriesStruct>> {
    let result = super.tryCall('entries', 'entries(uint256):((uint256,uint256,address,uint256,uint8)[])', [
      ethereum.Value.fromUnsignedBigInt(_gameNonce),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toTupleArray<RPS__entriesResult_entriesStruct>());
  }

  gameEntries(gameNonce: BigInt, param1: BigInt): RPS__gameEntriesResult {
    let result = super.call('gameEntries', 'gameEntries(uint256,uint256):(uint256,uint256,address,uint256,uint8)', [
      ethereum.Value.fromUnsignedBigInt(gameNonce),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);

    return new RPS__gameEntriesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toI32(),
    );
  }

  try_gameEntries(gameNonce: BigInt, param1: BigInt): ethereum.CallResult<RPS__gameEntriesResult> {
    let result = super.tryCall('gameEntries', 'gameEntries(uint256,uint256):(uint256,uint256,address,uint256,uint8)', [
      ethereum.Value.fromUnsignedBigInt(gameNonce),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new RPS__gameEntriesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toI32(),
      ),
    );
  }

  gameNonce(): BigInt {
    let result = super.call('gameNonce', 'gameNonce():(uint256)', []);

    return result[0].toBigInt();
  }

  try_gameNonce(): ethereum.CallResult<BigInt> {
    let result = super.tryCall('gameNonce', 'gameNonce():(uint256)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  games(gameNonce: BigInt, param1: BigInt): RPS__gamesResult {
    let result = super.call('games', 'games(uint256,uint256):(uint256,uint256,address,uint256,uint8)', [
      ethereum.Value.fromUnsignedBigInt(gameNonce),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);

    return new RPS__gamesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toI32(),
    );
  }

  try_games(gameNonce: BigInt, param1: BigInt): ethereum.CallResult<RPS__gamesResult> {
    let result = super.tryCall('games', 'games(uint256,uint256):(uint256,uint256,address,uint256,uint8)', [
      ethereum.Value.fromUnsignedBigInt(gameNonce),
      ethereum.Value.fromUnsignedBigInt(param1),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new RPS__gamesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toI32(),
      ),
    );
  }

  getParticipantHash(owner: Address, tokenId: BigInt, _gameNonce: BigInt): Bytes {
    let result = super.call('getParticipantHash', 'getParticipantHash(address,uint256,uint256):(bytes32)', [
      ethereum.Value.fromAddress(owner),
      ethereum.Value.fromUnsignedBigInt(tokenId),
      ethereum.Value.fromUnsignedBigInt(_gameNonce),
    ]);

    return result[0].toBytes();
  }

  try_getParticipantHash(owner: Address, tokenId: BigInt, _gameNonce: BigInt): ethereum.CallResult<Bytes> {
    let result = super.tryCall('getParticipantHash', 'getParticipantHash(address,uint256,uint256):(bytes32)', [
      ethereum.Value.fromAddress(owner),
      ethereum.Value.fromUnsignedBigInt(tokenId),
      ethereum.Value.fromUnsignedBigInt(_gameNonce),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  participants(participantHash: Bytes): Address {
    let result = super.call('participants', 'participants(bytes32):(address)', [
      ethereum.Value.fromFixedBytes(participantHash),
    ]);

    return result[0].toAddress();
  }

  try_participants(participantHash: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall('participants', 'participants(bytes32):(address)', [
      ethereum.Value.fromFixedBytes(participantHash),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  participationToken(): Address {
    let result = super.call('participationToken', 'participationToken():(address)', []);

    return result[0].toAddress();
  }

  try_participationToken(): ethereum.CallResult<Address> {
    let result = super.tryCall('participationToken', 'participationToken():(address)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call('paused', 'paused():(bool)', []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall('paused', 'paused():(bool)', []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get erc721Address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ExecuteGameCall extends ethereum.Call {
  get inputs(): ExecuteGameCall__Inputs {
    return new ExecuteGameCall__Inputs(this);
  }

  get outputs(): ExecuteGameCall__Outputs {
    return new ExecuteGameCall__Outputs(this);
  }
}

export class ExecuteGameCall__Inputs {
  _call: ExecuteGameCall;

  constructor(call: ExecuteGameCall) {
    this._call = call;
  }
}

export class ExecuteGameCall__Outputs {
  _call: ExecuteGameCall;

  constructor(call: ExecuteGameCall) {
    this._call = call;
  }
}

export class OpenRegistrationCall extends ethereum.Call {
  get inputs(): OpenRegistrationCall__Inputs {
    return new OpenRegistrationCall__Inputs(this);
  }

  get outputs(): OpenRegistrationCall__Outputs {
    return new OpenRegistrationCall__Outputs(this);
  }
}

export class OpenRegistrationCall__Inputs {
  _call: OpenRegistrationCall;

  constructor(call: OpenRegistrationCall) {
    this._call = call;
  }
}

export class OpenRegistrationCall__Outputs {
  _call: OpenRegistrationCall;

  constructor(call: OpenRegistrationCall) {
    this._call = call;
  }
}

export class RegisterCall extends ethereum.Call {
  get inputs(): RegisterCall__Inputs {
    return new RegisterCall__Inputs(this);
  }

  get outputs(): RegisterCall__Outputs {
    return new RegisterCall__Outputs(this);
  }
}

export class RegisterCall__Inputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get move(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class RegisterCall__Outputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }
}

export class TogglePauseCall extends ethereum.Call {
  get inputs(): TogglePauseCall__Inputs {
    return new TogglePauseCall__Inputs(this);
  }

  get outputs(): TogglePauseCall__Outputs {
    return new TogglePauseCall__Outputs(this);
  }
}

export class TogglePauseCall__Inputs {
  _call: TogglePauseCall;

  constructor(call: TogglePauseCall) {
    this._call = call;
  }
}

export class TogglePauseCall__Outputs {
  _call: TogglePauseCall;

  constructor(call: TogglePauseCall) {
    this._call = call;
  }
}