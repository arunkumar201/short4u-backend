import UserModel from "models/user.model";
import mongoose from "mongoose";

export interface IUser {
	name: string;
	password: string;
	email: string;
	last_login: string;
}

export interface IShortUrl {
	original_url: string;
	expiration_date: Date;
	user_id: mongoose.Types.ObjectId | typeof UserModel;
	is_public: boolean;
	short_url: string;
	created_at: Date;
	customize_short_url: string;
	updated_at: Date;
}
