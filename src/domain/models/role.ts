// import {Entity, EntityId} from "@libs/ddd";

// export interface IRoleProps {
//   name: string;
//   description: string;
//   parentRoleId: RoleId;
// }

// export class RoleId extends EntityId {}

// export class Role extends Entity<IRoleProps> {
//   protected _name: string;
//   protected _description: string;
//   protected _parentRoleId: RoleId;

//   constructor(props: IRoleProps, id: RoleId) {
//     super(props, id);
//   }

//   protected init() {
//     this.setName(this.props.name);
//     this.setDescription(this.props.description);
//     this.setParentRoleId(this.props.parentRoleId);
//   }

//   protected validateProps() {}

//   validate() {}

//   protected setName(aName: string) {
//     if (!aName) throw new Error("");

//     this._name = aName;
//   }

//   protected setDescription(aDescription: string) {
//     this._description = aDescription;
//   }

//   protected setParentRoleId(aRoleId: RoleId) {
//     this._parentRoleId = aRoleId;
//   }

//   get name() {
//     return this._name;
//   }

//   get description() {
//     return this._description;
//   }

//   get parentRoleId() {
//     return this._parentRoleId;
//   }
// }
