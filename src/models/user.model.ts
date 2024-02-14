import { Document, Schema, model } from "mongoose";

import { IUser } from "types/model.types";

export interface IUserDocument extends Document, IUser {}

const userSchema = new Schema<IUserDocument>(
	{
		fullName: {
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
	},
	{
		timestamps: true,
	}
);

const UserModel = model<IUserDocument>("users", userSchema);

export default UserModel;
