import USER from "../models/User";
import { IUser } from "../types/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (payload: IUser) => {
	const { name, email, password } = payload;
	console.log("payload", payload)
	if (!name || !email || !password) {
		throw new Error("Please enter valid field!");
	}

	const verifyEmail = await USER.findOne({ email: email });

	if (verifyEmail) {
		throw new Error("Email already used");
	}

	const hash_password = await bcrypt.hash(password, 10); //bcrypt password

	const userPayload = {
		name,
		email,
		password: hash_password,
	};

	let newUserData: IUser = await USER.create(userPayload);
	newUserData = await newUserData.save();

	const token = jwt.sign({ id: newUserData._id }, process.env.JWT_SECRET_KEY);

	const returnValue = {
		data: newUserData,
		token: token,
	};
	return returnValue;
};

export const userSignIn = async (payload: IUser) => {
	try {
		const { email, password } = payload;
		if (!email || !password) {
			throw new Error("Please enter valid fields");
		}

		const userData: any = await USER.findOne({
			email: email,
		});

		if (!userData) {
			throw new Error("Please enter valid email");
		}

		const verifyPassword = await bcrypt.compare(password, userData.password); //bcrypt password

		if (!verifyPassword) {
			throw new Error("Incorrect password");
		}

		const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY);

		const returnValue = {
			data: userData,
			token: token,
		};
		return returnValue;
	} catch (error) {
		throw error;
	}
};
