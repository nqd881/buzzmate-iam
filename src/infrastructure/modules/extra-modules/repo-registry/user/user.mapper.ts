import {
  Address,
  BirthDate,
  EmailAddress,
  Gender,
  Name,
  Person,
  PhoneNumber,
  User,
  UserId,
  UserStatus,
} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IDomainPersistenceMapper} from "@libs/ddd/domain-persistence-mapper";
import {Injectable} from "@nestjs/common";
import {
  DbAddress,
  DbEmailAddress,
  DbPerson,
  DbPhoneNumber,
  DbUser,
} from "./user.schema";

@Injectable()
export class UserMapper implements IDomainPersistenceMapper<User, DbUser> {
  private emailToPersistence(email: EmailAddress): DbEmailAddress {
    if (!email) return null;

    const {address, isVerified} = email;

    return {
      address,
      isVerified,
    };
  }

  private emailToDomain(email: DbEmailAddress): EmailAddress {
    if (!email) return null;

    const {address, isVerified} = email;

    return new EmailAddress({address, isVerified});
  }
  private phoneToPersistence(phone: PhoneNumber): DbPhoneNumber {
    if (!phone) return null;

    const {number, isVerified} = phone;

    return {
      number,
      isVerified,
    };
  }

  private phoneToDomain(phone: DbPhoneNumber): PhoneNumber {
    if (!phone) return null;

    const {number, isVerified} = phone;

    return new PhoneNumber({number, isVerified});
  }

  private addressToPersistence(address: Address): DbAddress {
    if (!address) return null;

    const {country, state, city, streetLine1, streetLine2, postalCode} =
      address;

    return {country, state, city, streetLine1, streetLine2, postalCode};
  }

  private addressToDomain(address: DbAddress): Address {
    if (!address) return null;

    const {country, state, city, streetLine1, streetLine2, postalCode} =
      address;

    return new Address({
      country,
      state,
      city,
      streetLine1,
      streetLine2,
      postalCode,
    });
  }

  private personToPersistence(person: Person): DbPerson {
    if (!person) return null;

    const {name, birthDate, gender, address} = person;

    return {
      firstName: name.firstName,
      lastName: name.lastName,
      birthDate: birthDate.toUTCDate(),
      gender,
      address: this.addressToPersistence(address),
    };
  }

  private personToDomain(userId: string, person: DbPerson): Person {
    if (!person) return null;

    const {firstName, lastName, birthDate, gender, address} = person;

    return new Person({
      userId: new UserId(userId),
      name: new Name({firstName, lastName}),
      birthDate: BirthDate.from(birthDate),
      gender: gender as Gender,
      address: this.addressToDomain(address),
    });
  }

  toPersistence(entity: User): DbUser {
    if (!entity) return null;

    const {
      id,
      username,
      password,
      email,
      phone,
      person,
      tfaEnabled,
      totpSecret,
      status,
      version,
    } = entity;

    return {
      _id: id.value,
      __version: version,
      username: username,
      password: password.value,
      email: this.emailToPersistence(email),
      phone: this.phoneToPersistence(phone),
      // emailAddress: email ? email.address : null,
      // emailVerified: email ? email.isVerified : null,
      // phoneNumber: phone ? phone.number : null,
      // phoneVerified: phone ? phone.isVerified : null,
      person: this.personToPersistence(person),
      tfaEnabled,
      totpSecret,
      status,
    };
  }

  toDomain(dbModel: DbUser): User {
    if (!dbModel) return null;

    const {
      _id,
      __version,
      username,
      password,
      email,
      phone,
      status,
      person,
      tfaEnabled,
      totpSecret,
    } = dbModel || {};

    return new User(
      {
        username: username,
        password: Password.withHashed(password),
        email: this.emailToDomain(email),
        phone: this.phoneToDomain(phone),
        person: this.personToDomain(_id, person),
        status: status as UserStatus,
        tfaEnabled,
        totpSecret,
      },
      __version,
      new UserId(_id)
    );
  }
}
