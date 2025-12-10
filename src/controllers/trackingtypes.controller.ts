import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { TrackingTypeService } from "../services/trackingtypes.service";
import {TrackingTypeResponse,TrackingTypeCreateRequest,TrackingTypeQueryRequest,TrackingTypeUpdateRequest,TrackingTypeOutput,TrackingTypeCreateInput, TrackingTypeUpdateInput, TrackingTypeQueryInput} from '../types/trackingtypes.type';
import { ApiResponse } from "../types/controller.type";
import AppError from "../types/error.type";

export class TrackingTypeController {
    private service = new TrackingTypeService();

    create = async (req: Request<{},{},TrackingTypeCreateRequest>, res: Response<ApiResponse<TrackingTypeResponse>>, next: NextFunction): Promise<void> => {
        const input:TrackingTypeCreateInput = {
            name:req.body.name,
            userid:req.user!.id
        }
        const result = await this.service.create(input);
        const output: TrackingTypeResponse = {
            id: result.id,
            name: result.name
        };

        res.status(200).json({
            success: true,
            data: output,
            message: 'Tracking type created',
            timestamp: new Date().toISOString()
        });
    }

    findById = async (req: Request, res: Response<ApiResponse<TrackingTypeResponse>>, next: NextFunction): Promise<void> => {
        const result = await this.service.findById(Number(req.params.id),req.user!.id);

        if (result) {
            const output: TrackingTypeResponse = {
                id: result.id,
                name: result.name
            }
            res.status(200).json({
            success: true,
            data: output,
            message: 'Tracking type found',
            timestamp: new Date().toISOString()
        });
            return;
        }

        res.status(200).json({
            success: true,
            data: undefined,
            message: 'Tracking type not found',
            timestamp: new Date().toISOString()
        });
    }

    findAll = async(req:Request<{},{},{},TrackingTypeQueryRequest>,res:Response<ApiResponse<TrackingTypeResponse[]>>,next:NextFunction): Promise<void>=>{
        const query = req.query as TrackingTypeQueryRequest;
        const input:TrackingTypeQueryInput = {
            name:req.query.name,
            userid:req.user!.id
        }
        console.log(input);
        const result = await this.service.findAll(input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Tracking type search completed',
            timestamp: new Date().toISOString()
        });
    }

    update = async(req:Request<{id?:number},{},TrackingTypeUpdateRequest>,res:Response<ApiResponse<TrackingTypeResponse>>,next:NextFunction): Promise<void>=>{
        const input:TrackingTypeUpdateInput = {
            name:req.body.name,
            userid:req.user!.id
        }
        const result = await this.service.update(Number(req.params.id),input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Tracking type updated',
            timestamp: new Date().toISOString()
        });
    }

    delete = async(req:Request,res:Response<ApiResponse<boolean>>,next:NextFunction): Promise<void>=>{
        const subResult = await this.service.checkByActivity(Number(req.params.id),req.user!.id);
        if(subResult.length > 0){
            throw new AppError(400,"Tracking Type in use!");
        }

        const result = await this.service.delete(Number(req.params.id),req.user!.id);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Tracking type removed',
            timestamp: new Date().toISOString()
        });
    }
}