import { prop, getModelForClass } from "@typegoose/typegoose"

export class UserClass {
  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public confirmation!: string;

  @prop({ required: true })
  public clusters?: [string];
}

const User = getModelForClass(UserClass);

export default User;