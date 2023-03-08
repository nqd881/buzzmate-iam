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
import {DbUser} from "./user.schema";

@Injectable()
export class UserMapper implements IDomainPersistenceMapper<User, DbUser> {
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
    } = entity;

    const {name, address, birthDate, gender} = person || {};

    const {firstName, lastName} = name || {};

    const {country, state, city, streetLine1, streetLine2, postalCode} =
      address || {};

    return {
      _id: id.value,
      username: username,
      password: password.value,
      emailAddress: email.address,
      emailVerified: email.isVerified,
      phoneNumber: phone.number,
      phoneVerified: phone.isVerified,
      firstName,
      lastName,
      birthDate: birthDate.toUTCDate(),
      gender,
      country,
      state,
      city,
      streetLine1,
      streetLine2,
      postalCode,
      tfaEnabled,
      totpSecret,
      status,
    };
  }

  toDomain(dbModel: DbUser): User {
    if (!dbModel) return null;

    const {
      _id,
      username,
      password,
      emailAddress,
      emailVerified,
      phoneNumber,
      phoneVerified,
      status,
      firstName,
      lastName,
      birthDate,
      gender,
      country,
      state,
      city,
      streetLine1,
      streetLine2,
      postalCode,
      tfaEnabled,
      totpSecret,
    } = dbModel || {};

    return User.from(
      {
        username: username,
        password: Password.withHashed(password),
        email: new EmailAddress({
          address: emailAddress,
          isVerified: emailVerified,
        }),
        phone: new PhoneNumber({
          number: phoneNumber,
          isVerified: phoneVerified,
        }),
        person: new Person({
          userId: new UserId(_id),
          name: new Name({firstName, lastName}),
          birthDate: BirthDate.from(birthDate),
          gender: gender as Gender,
          address: new Address({
            country,
            state,
            city,
            streetLine1,
            streetLine2,
            postalCode,
          }),
        }),
        status: status as UserStatus,
        tfaEnabled,
        totpSecret,
      },
      new UserId(_id)
    );
  }
}
