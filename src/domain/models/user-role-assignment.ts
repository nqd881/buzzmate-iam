// import {RoleId} from "./role";
// import {UserId} from "./user/user";

// export class UserRoleAssignment {
//   protected _userId: UserId;
//   protected _roleId: RoleId;

//   constructor(anUserId: UserId, aRoleId: RoleId) {
//     this.setUserId(anUserId);
//     this.setRoleId(aRoleId);
//   }

//   protected setUserId(anUserId: UserId) {
//     if (!anUserId) throw new Error("UserId cannot be empty");

//     this._userId = anUserId;
//   }

//   protected setRoleId(aRoleId: RoleId) {
//     if (!aRoleId) throw new Error("RoleId cannot be empty");

//     this._roleId = aRoleId;
//   }

//   get userId() {
//     return this._userId;
//   }

//   get roleId() {
//     return this._roleId;
//   }
// }
