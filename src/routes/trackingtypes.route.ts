import { Router } from "express";
import { TrackingTypeController } from "../controllers/trackingtypes.controller";
import { validateRequest } from "../middlewares/validaterequest.middleware";
import { TrackingTypeCreateRequestSchema, TrackingTypeQueryRequestSchema, TrackingTypeUpdateRequestSchema } from "../types/trackingtypes.type";
import { IdParamSchema } from '../types/commons.type';
import asyncHandler from "../middlewares/asynchandler.middleware";
import checkAuth from "../middlewares/auth.middleware";

const route = Router();
const controller = new TrackingTypeController();
route.use(checkAuth);
route.post('/', validateRequest(TrackingTypeCreateRequestSchema, 'body'), asyncHandler(controller.create));
route.get('/', validateRequest(TrackingTypeQueryRequestSchema, 'query'), asyncHandler(controller.findAll));
route.get('/:id', validateRequest(IdParamSchema, 'params'), asyncHandler(controller.findById));
route.put('/:id', validateRequest(TrackingTypeUpdateRequestSchema, 'body'), asyncHandler(controller.update));
route.delete('/:id', validateRequest(IdParamSchema, 'params'), asyncHandler(controller.delete));

export default route;