import { Router } from "express";
import { SubCategoryController } from "../controllers/subcategories.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { SubCategoryCreateRequestSchema,SubCategoryQueryRequestSchema,SubCategoryUpdateRequestSchema } from "../types/subcategories.type";
import {IdParamSchema} from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";
import checkAuth from "../middlewares/auth.middleware";

const route = Router();
const controller = new SubCategoryController();
route.use(checkAuth);
route.post('/',validateRequest(SubCategoryCreateRequestSchema,'body'),asyncHandler(controller.create));
route.get('/',validateRequest(SubCategoryQueryRequestSchema,'query'),asyncHandler(controller.findAll));
route.get('/:id/activities',validateRequest(IdParamSchema,'params'),asyncHandler(controller.findById));
route.put('/:id',validateRequest(SubCategoryUpdateRequestSchema,'body'),asyncHandler(controller.update));
route.delete('/:id',validateRequest(IdParamSchema,'params'),asyncHandler(controller.delete));

export default route;