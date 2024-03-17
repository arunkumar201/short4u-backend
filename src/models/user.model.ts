import { Document, Schema, model } from "mongoose";

import { IUser } from "types/model.types";

export interface IUserDocument extends Document, IUser {}


const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      require: true,
      minlength: 6,
    },
		last_login: {
			type: String,
			require: true,
		}
	},
	{
		timestamps: true,
	}
);

const User = model<IUserDocument>("users", userSchema);

export default User;
