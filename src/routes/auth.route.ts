import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { UserRegisterRequestSchema,UserLoginRequestSchema } from "../types/users.type";
import {IdParamSchema} from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";

const route = Router();
const controller = new AuthController();

route.post('/register',validateRequest(UserRegisterRequestSchema,'body'),asyncHandler(controller.register));
route.post('/login',validateRequest(UserLoginRequestSchema,'body'),asyncHandler(controller.login));

export default route;