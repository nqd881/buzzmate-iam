import {Entity, EntityId, EntityIdType} from "@libs/ddd";
import {UserId} from "../user";
import {Address} from "./address";
import {BirthDate} from "./birthdate";
import {Gender} from "./gender";
import {Name} from "./name";

export interface IPersonProps {
  userId: UserId;
  name: Name;
  gender: Gender;
  birthDate: BirthDate;
  address?: Address;
}

export class PersonId extends EntityId {}

export class Person extends Entity<PersonId, IPersonProps> {
  protected get IdConstructor(): EntityIdType<PersonId> {
    return PersonId;
  }

  protected _userId: UserId;
  protected _name: Name;
  protected _gender: Gender;
  protected _birthDate: BirthDate;
  protected _address: Address;

  constructor(props: IPersonProps, id?: PersonId) {
    super(props, id);
  }

  protected init() {
    this.setUserId(this.props.userId);
    this.setName(this.props.name);
    this.setBirthDate(this.props.birthDate);
    this.setAddress(this.props.address);
    this.setGender(this.props.gender);
  }

  protected validateProps() {}

  validate() {}

  protected setUserId(userId: UserId) {
    if (!userId) throw new Error("UserId cannot be null");

    this._userId = userId;
  }

  protected setName(name: Name) {
    if (!name) throw new Error("Name cannot be null");

    this._name = name;
  }

  protected setAddress(address: Address) {
    this._address = address;
  }

  protected setBirthDate(birthDate: BirthDate) {
    if (!birthDate) throw new Error("BirthDate cannot be null");

    this._birthDate = birthDate;
  }

  protected setGender(gender: Gender) {
    if (!gender) throw new Error("Gender cannot be null");

    this._gender = gender;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get birthDate() {
    return this._birthDate;
  }

  get gender() {
    return this._gender;
  }

  changeName(aName: Name) {
    if (this.name.equals(aName)) return;

    this.setName(aName);
  }

  changeGender(aGender: Gender) {
    if (!aGender || this.gender === aGender) return;

    this.setGender(aGender);
  }

  changeAddress(anAddress: Address) {
    if (this.address.equals(anAddress)) return;

    this.setAddress(anAddress);
  }

  changeBirthDate(aBirthDate: BirthDate) {
    if (this.birthDate.equals(aBirthDate)) return;

    this.setBirthDate(aBirthDate);
  }
}
