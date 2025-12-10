import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { ActivityService } from "../services/activities.service";
import { ActivityOutput, ActivityCreateInput, ActivityUpdateInput, ActivityResponse, ActivityCreateRequest, ActivityQueryRequest, ActivityUpdateRequest, ActivityQueryInput } from '../types/activities.type';
import { ApiResponse } from "../types/controller.type";
import { ActivityLogsService } from "../services/activitylogs.service";

export class ActivityController {
    private service = new ActivityService();
    private subService = new ActivityLogsService();

    create = async (req: Request<{}, {}, ActivityCreateRequest>, res: Response<ApiResponse<ActivityResponse>>, next: NextFunction): Promise<void> => {
        const input: ActivityCreateInput = {
            name: req.body.name,
            subcategoryid: req.body.subcategoryid,
            trackingtypeid: req.body.trackingtypeid,
            userid: req.user!.id,
            minvalue:req.body.minvalue
        }
        const result = await this.service.create(input);
        const output: ActivityResponse = {
            id: result.id,
            name: result.name,
            subcategoryid: result.subcategoryid,
            trackingtypeid: result.trackingtypeid,
            minvalue:result.minvalue
        };
        res.status(200).json({
            success: true,
            message: "Activity created succesfully",
            data: output,
            timestamp: new Date().toISOString()
        });
    }

    findById = async (req: Request, res: Response<ApiResponse<ActivityResponse>>, next: NextFunction): Promise<void> => {
        const result = await this.service.findById(Number(req.params.id), req.user!.id);
        const subResult = await this.subService.findAll({activityid:Number(req.params.id),userid:req.user!.id});
        if (result) {
            const output: ActivityResponse = {
                id: result.id,
                name: result.name,
                subcategoryid: result.subcategoryid,
                trackingtypeid: result.trackingtypeid,
                minvalue:result.minvalue,
                trackingtypename:result.trackingtypename,
                data:subResult
            }
            res.status(200).json({
                success: true,
                message: null,
                data: output,
                timestamp: new Date().toISOString()
            });
            return;
        }
        res.status(404).json({
            success: true,
            message: "Activity not found",
            data: undefined,
            timestamp: new Date().toISOString()
        });
    }

    findAll = async (req: Request<{}, {}, {}, ActivityQueryRequest>, res: Response<ApiResponse<ActivityResponse[]>>, next: NextFunction): Promise<void> => {
        const input: ActivityQueryInput = {
            name: req.query.name,
            subcategoryid: req.query.subcategoryid,
            trackingtypeid: req.query.trackingtypeid,
            userid: req.user!.id
        }
        const result = await this.service.findAll(input);
        res.status(200).json({
            success: true,
            message: "Activity not found",
            data: result,
            timestamp: new Date().toISOString()
        });
    }

    update = async (req: Request<{ id?: number }, {}, ActivityUpdateRequest>, res: Response<ApiResponse<ActivityResponse>>, next: NextFunction): Promise<void> => {
        console.log(req.body)
        const input: ActivityUpdateInput = {
            name: req.body.name,
            userid: req.user!.id,
            minvalue:req.body.minvalue,
            subcategoryid:req.body.subcategoryid!,
            trackingtypeid:req.body.trackingtypeid!
        }
        const result = await this.service.update(Number(req.params.id), input);

        const output:ActivityResponse = {
            id:result.id,
            name:result.name,
            subcategoryid:result.subcategoryid,
            trackingtypeid:result.trackingtypeid,
            minvalue:result.minvalue
        }

        res.status(200).json({
            success: true,
            message: "Activity updated!",
            data: result,
            timestamp: new Date().toISOString()
        });
    }

    delete = async (req: Request, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const result = await this.service.delete(Number(req.params.id), req.user!.id);
        res.status(200).json({
            success: true,
            message: "Activity removed!",
            data: result,
            timestamp: new Date().toISOString()
        });
    }
}