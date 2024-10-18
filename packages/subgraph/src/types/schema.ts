// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Account must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Account", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): Account | null {
    return changetype<Account | null>(
      store.get_in_block("Account", id.toHexString()),
    );
  }

  static load(id: Bytes): Account | null {
    return changetype<Account | null>(store.get("Account", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get tokens(): ParticipationTokenLoader {
    return new ParticipationTokenLoader(
      "Account",
      this.get("id")!.toBytes().toHexString(),
      "tokens",
    );
  }
}

export class ParticipationToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ParticipationToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ParticipationToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("ParticipationToken", id.toString(), this);
    }
  }

  static loadInBlock(id: string): ParticipationToken | null {
    return changetype<ParticipationToken | null>(
      store.get_in_block("ParticipationToken", id),
    );
  }

  static load(id: string): ParticipationToken | null {
    return changetype<ParticipationToken | null>(
      store.get("ParticipationToken", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get participationHash(): Bytes {
    let value = this.get("participationHash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set participationHash(value: Bytes) {
    this.set("participationHash", Value.fromBytes(value));
  }

  get player(): Bytes {
    let value = this.get("player");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set player(value: Bytes) {
    this.set("player", Value.fromBytes(value));
  }

  get move(): BigInt {
    let value = this.get("move");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set move(value: BigInt) {
    this.set("move", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get game(): Bytes {
    let value = this.get("game");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set game(value: Bytes) {
    this.set("game", Value.fromBytes(value));
  }

  get score(): BigInt {
    let value = this.get("score");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set score(value: BigInt) {
    this.set("score", Value.fromBigInt(value));
  }
}

export class RpsGame extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save RpsGame entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type RpsGame must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("RpsGame", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): RpsGame | null {
    return changetype<RpsGame | null>(
      store.get_in_block("RpsGame", id.toHexString()),
    );
  }

  static load(id: Bytes): RpsGame | null {
    return changetype<RpsGame | null>(store.get("RpsGame", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get participants(): ParticipationTokenLoader {
    return new ParticipationTokenLoader(
      "RpsGame",
      this.get("id")!.toBytes().toHexString(),
      "participants",
    );
  }

  get seed(): BigInt {
    let value = this.get("seed");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set seed(value: BigInt) {
    this.set("seed", Value.fromBigInt(value));
  }
}

export class ParticipationTokenLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): ParticipationToken[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<ParticipationToken[]>(value);
  }
}
