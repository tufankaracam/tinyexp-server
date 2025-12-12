import { Router } from "express";
import { ActivityLogsController } from "../controllers/activitylogs.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { ActivityLogsCreateRequestSchema, ActivityLogsQueryRequestSchema, ActivityLogsUpdateRequestSchema } from "../types/activitylogs.type";
import { IdParamSchema } from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";
import checkAuth from "../middlewares/auth.middleware";

const route = Router();
const controller = new ActivityLogsController();
route.use(checkAuth);
route.post('/', validateRequest(ActivityLogsCreateRequestSchema, 'body'), asyncHandler(controller.create));
route.get('/', validateRequest(ActivityLogsQueryRequestSchema, 'query'), asyncHandler(controller.findAll));
route.get('/:id', validateRequest(IdParamSchema, 'params'), asyncHandler(controller.findById));
route.put('/:id', validateRequest(IdParamSchema, 'params'), validateRequest(ActivityLogsUpdateRequestSchema, 'body'), asyncHandler(controller.update));
route.delete('/:id', validateRequest(IdParamSchema, 'params'), asyncHandler(controller.delete));

export default route;