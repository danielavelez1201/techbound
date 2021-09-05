import { prop, getModelForClass, mongoose } from "@typegoose/typegoose"
export interface IUser {
  _id?: mongoose.Types.ObjectId;
  firstname: string,
  lastname: string,
  confirmation: string,
  password: string,
  clusters?: string[],
};

export class User implements IUser {
  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({ required: true })
  public email!: string;

  // TODO: This is a pretty dangerous security practice. The better alternative
  // would be to store the hashed + salted passwords.
  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public confirmation!: string;

  @prop({ required: true })
  public clusters?: string[]
}

const UserModel = getModelForClass(User);

export default UserModel;
