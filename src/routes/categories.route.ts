import { Router } from "express";
import { CategoryController } from "../controllers/categories.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { CategoryCreateRequestSchema,CategoryQueryRequestSchema,CategoryUpdateRequestSchema } from "../types/categories.type";
import {IdParamSchema} from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";
import checkAuth from "../middlewares/auth.middleware";

const route = Router();
const controller = new CategoryController();
route.use(checkAuth);
route.post('/',validateRequest(CategoryCreateRequestSchema,'body'),asyncHandler(controller.create));
route.get('/',validateRequest(CategoryQueryRequestSchema,'query'),asyncHandler(controller.findAll));
route.get('/character',validateRequest(CategoryQueryRequestSchema,'query'),asyncHandler(controller.getCharacterData));
route.get('/:id',validateRequest(IdParamSchema,'params'),asyncHandler(controller.findById));
route.put('/:id',validateRequest(CategoryUpdateRequestSchema,'body'),asyncHandler(controller.update));
route.delete('/:id',validateRequest(IdParamSchema,'params'),asyncHandler(controller.delete));

export default route;