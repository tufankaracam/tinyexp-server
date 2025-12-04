import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { SubCategoryService } from "../services/subcategories.service";
import { SubCategoryOutput, SubCategoryCreateInput, SubCategoryUpdateInput, SubCategoryResponse, SubCategoryCreateRequest, SubCategoryQueryRequest, SubCategoryUpdateRequest, SubCategoryQueryInput } from '../types/subcategories.type';
import { ApiResponse } from "../types/controller.type";
import { ActivityService } from "../services/activities.service";

export class SubCategoryController {
    private service = new SubCategoryService();
    private subService = new ActivityService();

    create = async (req: Request<{}, {}, SubCategoryCreateRequest>, res: Response<ApiResponse<SubCategoryResponse>>, next: NextFunction): Promise<void> => {

        const input: SubCategoryCreateInput = {
            name: req.body.name,
            categoryid: req.body.categoryid,
            userid: req.user!.id
        }


        const result = await this.service.create(input);

        const output: SubCategoryResponse = {
            id: result.id,
            name: result.name,
            categoryid: result.categoryid
        };

        res.status(200).json({
            success: true,
            data: output,
            message: 'Subcategory created',
            timestamp: new Date().toISOString()
        });

    }

    findById = async (req: Request, res: Response<ApiResponse<SubCategoryResponse>>, next: NextFunction): Promise<void> => {
        const result = await this.service.findById(Number(req.params.id), req.user!.id);
        const subResult = await this.subService.findAll({ subcategoryid: Number(req.params.id), userid: req.user!.id });
        if (result) {
            const output: SubCategoryResponse = {
                id: result.id,
                name: result.name,
                categoryid: result.categoryid,
                data: subResult
            }
            res.status(200).json({
                success: true,
                data: output,
                message: 'Subcategory found',
                timestamp: new Date().toISOString()
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: undefined,
            message: 'Subcategory not found',
            timestamp: new Date().toISOString()
        });
    }

    findAll = async (req: Request<{}, {}, {}, SubCategoryQueryRequest>, res: Response<ApiResponse<SubCategoryResponse[]>>, next: NextFunction): Promise<void> => {
        const input: SubCategoryQueryInput = {
            name: req.query?.name,
            categoryid: req.query?.categoryid,
            userid: req.user!.id
        }
        const result = await this.service.findAll(input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Subcategory found',
            timestamp: new Date().toISOString()
        });
    }

    update = async (req: Request<{ id?: number }, {}, SubCategoryUpdateRequest>, res: Response<ApiResponse<SubCategoryResponse>>, next: NextFunction): Promise<void> => {
        const input: SubCategoryUpdateInput = {
            name: req.body.name,
            userid: req.user!.id,
            categoryid: req.body.categoryid!
        }
        const result = await this.service.update(Number(req.params.id), input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Subcategory found',
            timestamp: new Date().toISOString()
        });
    }

    delete = async (req: Request, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const result = await this.service.delete(Number(req.params.id), req.user!.id);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Subcategory found',
            timestamp: new Date().toISOString()
        });
    }
}