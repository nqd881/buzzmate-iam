import {BirthDate, UserId} from "@domain/models";
import {IUserRepo} from "@domain/repository/user-repo.interface";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {UpdatePersonalInfoCommand} from "./update-personal-info.command";

@CommandHandler(UpdatePersonalInfoCommand)
export class UpdatePersonalInfoService implements ICommandHandler {
  constructor(@Inject(Repositories.User) private userRepo: IUserRepo) {}

  async execute(aCommand: UpdatePersonalInfoCommand) {
    const {
      userId,
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
    } = aCommand;

    const user = await this.userRepo.findOneById(new UserId(userId));

    if (!user) throw new Error("User not found");

    if (!user.isActive()) throw new Error("User is inactive");

    user.person.changeName(user.person.name.cloneWith({firstName, lastName}));
    user.person.changeGender(gender ?? user.person.gender);
    user.person.changeBirthDate(
      birthDate ? BirthDate.from(birthDate) : user.person.birthDate
    );
    user.person.changeAddress(
      user.person.address.cloneWith({
        country,
        state,
        city,
        streetLine1,
        streetLine2,
        postalCode,
      })
    );

    await this.userRepo.save(user);

    return user;
  }
}
