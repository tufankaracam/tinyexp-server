import { Router } from "express";
import { ActivityController } from "../controllers/activities.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { ActivityCreateRequestSchema,ActivityQueryRequestSchema,ActivityUpdateRequestSchema } from "../types/activities.type";
import {IdParamSchema} from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";
import checkAuth from "../middlewares/auth.middleware";

const route = Router();
const controller = new ActivityController();
route.use(checkAuth);
route.post('/',validateRequest(ActivityCreateRequestSchema,'body'),asyncHandler(controller.create));
route.get('/',validateRequest(ActivityQueryRequestSchema,'query'),asyncHandler(controller.findAll));
route.get('/:id/activitylogs',validateRequest(IdParamSchema,'params'),asyncHandler(controller.findById));
route.put('/:id',validateRequest(ActivityUpdateRequestSchema,'body'),asyncHandler(controller.update));
route.delete('/:id',validateRequest(IdParamSchema,'params'),asyncHandler(controller.delete));

export default route;