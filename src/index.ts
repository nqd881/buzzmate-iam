import {
  EmailAddress,
  PersonId,
  PhoneNumber,
  User,
  UserId,
  UserStatus,
} from "@domain/models";
import {Password} from "@domain/models/user/password";
import _ from "lodash";
import {v4} from "uuid";

// const userA = User.from(
//   {
//     username: "quocdaitinls",
//     password: new Password({value: "123123qwe", isHashed: true}),
//     email: new EmailAddress({
//       address: "quocdaitinls@gmail.com",
//       isVerified: false,
//     }),
//     phone: new PhoneNumber({
//       number: "1293862913",
//       isVerified: false,
//     }),
//     person: null,
//     tfaEnabled: false,
//     totpSecret: null,
//     status: UserStatus.DISABLED,
//   },
//   new UserId()
// );

// const x = new PersonId(userA.id.value);

// console.log(x.equals(userA.id));

// console.log(x);
// console.log(userA.id);

//
//
//

// const a = {
//   name: "Quoc Dai",
//   age: 12,
//   school: "NEU",
// };

// const merge = (data: Object) => _.merge(a, Object.assign({}, data));

// console.log(merge({name: null}));
