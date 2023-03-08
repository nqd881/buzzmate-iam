// import {Entity, EntityId} from "@libs/ddd";
// import {isNil} from "lodash";

// export interface IPermissionProps {
//   name: string;
//   description: string;
//   object: string;
//   operator: string;
// }

// export class PermissionId extends EntityId {}

// export class Permission extends Entity<IPermissionProps> {
//   protected _name: string;
//   protected _description: string;
//   protected _object: string;
//   protected _operator: string;

//   constructor(props: IPermissionProps, id: PermissionId) {
//     super(props, id);
//   }

//   protected init() {
//     this.setName(this.props.name);
//     this.setDescription(this.props.description);
//     this.setObject(this.props.object);
//     this.setOperator(this.props.operator);
//   }

//   protected validateProps() {}

//   validate() {}

//   protected setName(aName: string) {
//     if (isNil(aName)) throw new Error("Permission name cannot be null");

//     this._name = aName;
//   }

//   protected setDescription(aDescription: string) {
//     this._description = aDescription;
//   }

//   protected setObject(anObject: string) {
//     if (isNil(anObject)) throw new Error("Permission object cannot be null");

//     this._object = anObject;
//   }

//   protected setOperator(anOperator: string) {
//     if (isNil(anOperator))
//       throw new Error("Permission operator cannot be null");

//     this._operator = anOperator;
//   }

//   get name() {
//     return this._name;
//   }

//   get description() {
//     return this._description;
//   }

//   get object() {
//     return this._object;
//   }

//   get operator() {
//     return this._operator;
//   }
// }
