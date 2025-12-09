import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { ActivityLogsService } from "../services/activitylogs.service";
import { ActivityLogsOutput, ActivityLogsCreateInput, ActivityLogsUpdateInput, ActivityLogsResponse, ActivityLogsCreateRequest, ActivityLogsQueryRequest, ActivityLogsUpdateRequest, ActivityLogsQueryInput } from '../types/activitylogs.type';
import { ApiResponse } from "../types/controller.type";

export class ActivityLogsController {
    private service = new ActivityLogsService();
    
    create = async (req: Request<{},{},ActivityLogsCreateRequest>, res: Response<ApiResponse<ActivityLogsResponse>>, next: NextFunction): Promise<void> => {
        console.log(req.body)
        console.log(req.params)
        const input:ActivityLogsCreateInput = {
            activityid:req.body.activityid,
            activityvalue:req.body.activityvalue,
            activitydatetime:req.body.activitydatetime,
            userid:req.user!.id,
            activitynote:req.body.activitynote || ""
        } 
        const result = await this.service.create(input);
        const output: ActivityLogsResponse = {
            id: result.id,
            activityid: result.activityid,
            activityvalue: result.activityvalue,
            activitydatetime: result.activitydatetime
        };

        res.status(200).json({
            success: true,
            message: "Activity log created succesfully",
            data: output,
            timestamp: new Date().toISOString()
        });
    }

    findById = async (req: Request<{id?:number}>, res: Response<ApiResponse<ActivityLogsResponse>>, next: NextFunction): Promise<void> => {
        const result = await this.service.findById(Number(req.params.id),req.user!.id);


        if (result) {
            const output: ActivityLogsResponse = {
                id: result.id,
                activityid: result.activityid,
                activityvalue: result.activityvalue,
                activitydatetime: result.activitydatetime
            }
            res.status(200).json({
            success: true,
            message: "Activity log found!",
            data: output,
            timestamp: new Date().toISOString()
        });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Activity log not found!",
            data: undefined,
            timestamp: new Date().toISOString()
        });
    }

    findAll = async (req: Request<{},{},{},ActivityLogsQueryRequest>, res: Response<ApiResponse<ActivityLogsResponse[]>>, next: NextFunction): Promise<void> => {
        const input:ActivityLogsQueryInput = {
            activityid:req.query.activityid,
            userid:req.user!.id
        }

        const result = await this.service.findAll(input);
        res.status(200).json({
            success: true,
            message: "Activity Logs search completed",
            data: result,
            timestamp: new Date().toISOString()
        });
    }

    update = async (req: Request<{id?:number},{},ActivityLogsUpdateRequest>, res: Response<ApiResponse<ActivityLogsResponse>>, next: NextFunction): Promise<void> => {
        console.log(req.body)
        console.log(req.params)
        const input:ActivityLogsUpdateInput = {
            activityid:req.body.activityid,
            activityvalue:req.body.activityvalue,
            activitydatetime:req.body.activitydatetime,
            activitynote:req.body.activitynote,
            userid:req.user!.id,
        }
        const result = await this.service.update(Number(req.params.id), input);
        res.status(200).json({
            success: true,
            message: "Activity log updated succesfully",
            data: result,
            timestamp: new Date().toISOString()
        });
    }

    delete = async (req: Request<{id?:number}>, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const result = await this.service.delete(Number(req.params.id),req.user!.id);
        res.status(200).json({
            success: true,
            message: "Activity log deleted succesfully",
            data: result,
            timestamp: new Date().toISOString()
        });
    }
}