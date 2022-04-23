// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Question extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("questioner", Value.fromString(""));
    this.set("uri", Value.fromString(""));
    this.set("createdTxHash", Value.fromString(""));
    this.set("status", Value.fromString(""));
    this.set("numAnswers", Value.fromString(""));
    this.set("currentStaked", Value.fromString(""));
    this.set("totalReward", Value.fromString(""));
    this.set("receivedReward", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Question entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Question must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Question", id.toString(), this);
    }
  }

  static load(id: string): Question | null {
    return changetype<Question | null>(store.get("Question", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questioner(): string {
    let value = this.get("questioner");
    return value!.toString();
  }

  set questioner(value: string) {
    this.set("questioner", Value.fromString(value));
  }

  get uri(): string {
    let value = this.get("uri");
    return value!.toString();
  }

  set uri(value: string) {
    this.set("uri", Value.fromString(value));
  }

  get createdTxHash(): string {
    let value = this.get("createdTxHash");
    return value!.toString();
  }

  set createdTxHash(value: string) {
    this.set("createdTxHash", Value.fromString(value));
  }

  get closedTxHash(): string | null {
    let value = this.get("closedTxHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set closedTxHash(value: string | null) {
    if (!value) {
      this.unset("closedTxHash");
    } else {
      this.set("closedTxHash", Value.fromString(<string>value));
    }
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get numAnswers(): string {
    let value = this.get("numAnswers");
    return value!.toString();
  }

  set numAnswers(value: string) {
    this.set("numAnswers", Value.fromString(value));
  }

  get currentStaked(): string {
    let value = this.get("currentStaked");
    return value!.toString();
  }

  set currentStaked(value: string) {
    this.set("currentStaked", Value.fromString(value));
  }

  get totalReward(): string {
    let value = this.get("totalReward");
    return value!.toString();
  }

  set totalReward(value: string) {
    this.set("totalReward", Value.fromString(value));
  }

  get receivedReward(): string {
    let value = this.get("receivedReward");
    return value!.toString();
  }

  set receivedReward(value: string) {
    this.set("receivedReward", Value.fromString(value));
  }
}

export class Answer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("question", Value.fromString(""));
    this.set("answerer", Value.fromString(""));
    this.set("uri", Value.fromString(""));
    this.set("createdTxHash", Value.fromString(""));
    this.set("receivedReward", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Answer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Answer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Answer", id.toString(), this);
    }
  }

  static load(id: string): Answer | null {
    return changetype<Answer | null>(store.get("Answer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get question(): string {
    let value = this.get("question");
    return value!.toString();
  }

  set question(value: string) {
    this.set("question", Value.fromString(value));
  }

  get answerer(): string {
    let value = this.get("answerer");
    return value!.toString();
  }

  set answerer(value: string) {
    this.set("answerer", Value.fromString(value));
  }

  get uri(): string {
    let value = this.get("uri");
    return value!.toString();
  }

  set uri(value: string) {
    this.set("uri", Value.fromString(value));
  }

  get createdTxHash(): string {
    let value = this.get("createdTxHash");
    return value!.toString();
  }

  set createdTxHash(value: string) {
    this.set("createdTxHash", Value.fromString(value));
  }

  get receivedReward(): string {
    let value = this.get("receivedReward");
    return value!.toString();
  }

  set receivedReward(value: string) {
    this.set("receivedReward", Value.fromString(value));
  }
}
