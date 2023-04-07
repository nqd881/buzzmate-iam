import {EntityId, EntityIdType} from "@libs/ddd";
import {AggregateRoot} from "@libs/ddd/aggregate-root";
import {isNil} from "lodash";
import {EmailAddress} from "./email-address";
import {EmailAddressVerifiedDomainEvent} from "./events/email-address-verified";
import {PasswordChangedDomainEvent} from "./events/password-changed";
import {PersonalInfoInitializedDomainEvent} from "./events/personal-info-initialized";
import {PhoneNumberVerifiedDomainEvent} from "./events/phone-number-verified";
import {TfaTurnedOffDomainEvent} from "./events/tfa-turned-off";
import {TfaTurnedOnDomainEvent} from "./events/tfa-turned-on";
import {UserActivatedDomainEvent} from "./events/user-activated";
import {UserCreatedDomainEvent} from "./events/user-created";
import {UserDisabledDomainEvent} from "./events/user-disabled";
import {Password} from "./password";
import {Address} from "./person/address";
import {BirthDate} from "./person/birthdate";
import {Gender} from "./person/gender";
import {Name} from "./person/name";
import {Person} from "./person/person";
import {PhoneNumber} from "./phone-number";
import {UserStatus} from "./status";

export interface IUserProps {
  username: string;
  password: Password;
  email: EmailAddress;
  phone: PhoneNumber;
  person: Person;
  status: UserStatus;
  tfaEnabled: boolean;
  totpSecret?: string;
}

export class UserId extends EntityId {
  constructor(value?: string) {
    super(value);
  }
}

export class User extends AggregateRoot<UserId, IUserProps> {
  protected get IdConstructor(): EntityIdType<UserId> {
    return UserId;
  }

  protected _email: EmailAddress;
  protected _phone: PhoneNumber;
  protected _username: string;
  protected _password: Password;
  protected _person: Person;
  protected _status: UserStatus;
  protected _tfaEnabled: boolean;
  protected _totpSecret: string;

  constructor(props: IUserProps, version: number, id?: UserId) {
    super(props, version, id);
  }

  static create(props: IUserProps): User {
    const newUser = new User(props, 0);

    newUser.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: newUser.id,
        userId: newUser.id,
        name: newUser.person?.name,
        emailAddress: newUser.email,
      })
    );

    return newUser;
  }

  protected init() {
    this.setUsername(this.props.username);
    this.setPassword(this.props.password);
    this.setEmail(this.props.email);
    this.setPhone(this.props.phone);
    this.setPerson(this.props.person);
    this.setStatus(this.props.status);
    this.setTfaEnabled(this.props.tfaEnabled);
    this.setTotpSecret(this.props.totpSecret);
  }

  protected validateProps() {}

  validate() {}

  protected setEmail(anEmail: EmailAddress) {
    if (isNil(anEmail)) throw new Error("The email may not be set to null");

    this._email = anEmail;
  }

  protected setPhone(aPhone: PhoneNumber) {
    // if (isNil(aPhone))
    //   throw new Error("The phone number may not be set to null");

    this._phone = aPhone;
  }

  protected setUsername(anUsername: string) {
    if (isNil(anUsername))
      throw new Error("The username may not be set to null");

    this._username = anUsername;
  }

  protected setPassword(aPassword: Password) {
    if (isNil(aPassword))
      throw new Error("The password may not be set to null");

    if (!aPassword.isHashed) throw new Error("The password must be hashed");

    this._password = aPassword;
  }

  protected setPerson(aPerson: Person) {
    this._person = aPerson;
  }

  protected setStatus(aStatus: UserStatus) {
    if (isNil(aStatus)) throw new Error("The status may not be set to null");

    this._status = aStatus;
  }

  protected setTfaEnabled(aValue: boolean) {
    if (isNil(aValue)) throw new Error("The value may not be null");

    this._tfaEnabled = aValue;
  }

  protected setTotpSecret(aSecret: string) {
    this._totpSecret = aSecret;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get person() {
    return this._person;
  }

  get status() {
    return this._status;
  }

  get tfaEnabled() {
    return this._tfaEnabled;
  }

  get totpSecret() {
    return this._totpSecret;
  }

  initPerson(
    aName: Name,
    aBirthDate: BirthDate,
    aGender: Gender,
    anAddress: Address
  ) {
    if (this.person) return;

    const newPerson = new Person({
      userId: this.id,
      name: aName,
      birthDate: aBirthDate,
      gender: aGender,
      address: anAddress,
    });

    this.setPerson(newPerson);

    this.addEvent(
      new PersonalInfoInitializedDomainEvent({
        aggregateId: this.id,
        userId: this.id,
      })
    );
  }

  changeEmail(aEmail: EmailAddress) {
    if (this.email.equals(aEmail)) return;

    if (this.email.isVerified)
      throw new Error("Cannot change an email address was verified");

    this.setEmail(aEmail);
  }

  changePhone(aPhone: PhoneNumber) {
    if (this.phone.equals(aPhone)) return;

    if (this.phone.isVerified)
      throw new Error("Cannot change an phone number was verified");

    this.setPhone(aPhone);
  }

  changePassword(aPassword: Password) {
    if (this._password.equals(aPassword)) return;

    this.setPassword(aPassword);

    this.addEvent(
      new PasswordChangedDomainEvent({
        aggregateId: this._id,
        userId: this.id,
      })
    );
  }

  changeTotpSecret(aTotpSecret: string) {
    this.setTotpSecret(aTotpSecret);
  }

  verifyEmail() {
    if (this.email.isVerified) return;

    this.setEmail(this.email.verify());

    this.addEvent(
      new EmailAddressVerifiedDomainEvent({
        aggregateId: this.id,
        userId: this.id,
        emailAddress: this.email,
      })
    );

    this.activate();
  }

  verifyPhone() {
    if (this.phone.isVerified) return;

    this.setPhone(this.phone.verify());

    this.addEvent(
      new PhoneNumberVerifiedDomainEvent({
        aggregateId: this.id,
        userId: this.id,
        phoneNumber: this.phone,
      })
    );

    this.activate();
  }

  activate() {
    if (this.isActive()) return;

    if (!this.email.isVerified && !this.phone.isVerified)
      throw new Error("This user must be verify email or phone before");

    this.setStatus(UserStatus.ACTIVE);

    this.addEvent(
      new UserActivatedDomainEvent({
        aggregateId: this.id,
        userId: this.id,
        emailAddress: this.email,
        name: this.person.name,
      })
    );
  }

  disable() {
    if (this.status === UserStatus.DISABLED) return;

    this.setStatus(UserStatus.DISABLED);

    this.addEvent(
      new UserDisabledDomainEvent({
        aggregateId: this.id,
        userId: this.id,
      })
    );
  }

  isActive() {
    return this.status === UserStatus.ACTIVE;
  }

  turnOnTFA() {
    if (this.tfaEnabled) return;

    this.setTfaEnabled(true);

    this.addEvent(
      new TfaTurnedOnDomainEvent({
        aggregateId: this.id,
        userId: this.id,
      })
    );
  }

  turnOffTFA() {
    if (!this.tfaEnabled) return;

    this.setTfaEnabled(false);

    this.addEvent(
      new TfaTurnedOffDomainEvent({
        aggregateId: this.id,
        userId: this.id,
      })
    );
  }
}
