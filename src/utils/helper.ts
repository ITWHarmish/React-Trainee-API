import { IResponse } from "../types/IResponse";
import jwt from "jsonwebtoken";

export function parseError(error: any): IResponse {
	const result: IResponse = {
		code: 500,
		data: null,
	};

	if (error.failure && error.failure.details) {
		result.data = error.failure.details;
	} else if (error.response) {
		/*
		 * The request was made and the server responded with a
		 * status code that falls out of the range of 2xx
		 */
		result.code = error.response.status;
		result.data = error.response.data;
	} else if (error.request) {
		/*
		 * The request was made but no response was received, `error.request`
		 * is an instance of XMLHttpRequest in the browser and an instance
		 * of http.ClientRequest in Node.js
		 */
		result.data = error.request;
	} else if (error.message) {
		// Something happened in setting up the request and triggered an Error
		result.data = error.message;
	} else {
		result.data = error.toString();
	}

	return result;
}

export const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;
	console.log("token", token);
	if (!token) {
		return res.status(401).send({ error: "Access Denied" });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
		next();
	} catch (err) {
		res.status(400).send({ error: "Invalid Token" });
	}
};
