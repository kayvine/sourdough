import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

export const base = {
  createdOn: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  modifiedOn: Number,
  modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
};

export class BaseSchema extends Schema {
  constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    // base fields used by all models
    const baseDef = {
      // _owner:       { type: String, index: true, ref: 'users' },
      // _creator:     { type: String, ref: 'users' },
      // _modifier:    { type: String, ref: 'users' },
      createdOn: { type: Date, default: Date.now },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
      modifiedOn: { type: Date, default: Date.now, set: Date.now },
      modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    };
    super(Object.assign({}, baseDef, definition), options);
    // super({ ...definition, baseDef }, options);
  }
}

// function extendSchema (Schema: Schema, definition: SchemaDefinition, options: SchemaOptions) {
//   return new Schema(
//     Object.assign({}, Schema.obj, definition),
//     options
//   );
// }
