import type { IResponse } from "../types/IResponse";
import { Router } from "express";
import type { Request, Response } from "express";
import { parseError } from "../utils/helper";
import * as UserController from "../controllers/userController";

const router: Router = Router();

router.post("/auth/user/signup", async (req: Request, res: Response) => {
	let ApiResponse: IResponse = { code: 200, data: "" };
	try {
		ApiResponse.code = 200;
		ApiResponse.data = await UserController.userSignUp(req.body);
	} catch (error) {
		ApiResponse = parseError(error);
	} finally {
		res.status(ApiResponse.code).send(ApiResponse.data);
	}
});

router.post("/auth/user/signin", async (req: Request, res: Response) => {
	let ApiResponse: IResponse = { code: 200, data: "" };
	try {
		ApiResponse.code = 200;
		ApiResponse.data = await UserController.userSignIn(req.body);
	} catch (error) {
		ApiResponse = parseError(error);
	} finally {
		res.status(ApiResponse.code).send(ApiResponse.data);
	}
});

export default router;
