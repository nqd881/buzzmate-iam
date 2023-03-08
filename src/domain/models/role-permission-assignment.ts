// import {PermissionId} from "./permission";
// import {RoleId} from "./role";

// export class RolePermissionAssignment {
//   protected _roleId: RoleId;
//   protected _permissionId: PermissionId;

//   constructor(aRoleId: RoleId, aPermissionId: PermissionId) {
//     this.setRoleId(aRoleId);
//     this.setPermissionId(aPermissionId);
//   }

//   protected setRoleId(aRoleId: RoleId) {
//     if (!aRoleId) throw new Error("RoleId must be provided");

//     this._roleId = aRoleId;
//   }

//   protected setPermissionId(aPermissionId: PermissionId) {
//     if (!aPermissionId) throw new Error("PermissionId must be provided");

//     this._permissionId = aPermissionId;
//   }

//   get roleId() {
//     return this._roleId;
//   }

//   get permissionId() {
//     return this._permissionId;
//   }
// }
