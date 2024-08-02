import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new Schema(
	{
		name: String,
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IUser>("User", userSchema, "users");
