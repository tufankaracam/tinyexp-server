import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { CategoryService } from "../services/categories.service";
import { CategoryResponse, CategoryCreateRequest, CategoryQueryRequest, CategoryUpdateRequest, CategoryOutput, CategoryCreateInput, CategoryUpdateInput, CategoryQueryInput } from '../types/categories.type';
import { ApiResponse } from "../types/controller.type";
import { IdParamRequest } from "../types/commons.type";
import { SubCategoryService } from "../services/subcategories.service";

export class CategoryController {
    private service = new CategoryService();
    private subService = new SubCategoryService();

    create = async (req: Request<{},{},CategoryCreateRequest>, res: Response<ApiResponse<CategoryResponse>>, next: NextFunction): Promise<void> => {
        const input:CategoryCreateInput = {
            name:req.body.name,
            userid:req.user!.id
        }

        const result = await this.service.create(input);
        const output: CategoryResponse = {
            id: result.id,
            name: result.name
        };

        res.status(200).json({
            success: true,
            data: output,
            message: 'Category created successfully',
            timestamp: new Date().toISOString()
        });
    }

    findById = async (req: Request, res: Response<ApiResponse<CategoryResponse>>, next: NextFunction): Promise<void> => {
        const result = await this.service.findById(Number(req.params.id),req.user!.id);
        const subResult = await this.subService.findAll({categoryid:Number(req.params.id),userid:req.user!.id});
        if (result) {
            const output: CategoryResponse = {
                id: result.id,
                name: result.name,
                data:subResult
            }

            res.status(200).json({
            success: true,
            data: output,
            message: 'Category found',
            timestamp: new Date().toISOString()
        });
            return;
        }
        res.status(200).json({
            success: true,
            data: undefined,
            message: 'Category not found',
            timestamp: new Date().toISOString()
        });
    }

    findAll = async (req: Request<{},{},{},CategoryQueryRequest>, res: Response<ApiResponse<CategoryResponse[]>>, next: NextFunction): Promise<void> => {
        const input:CategoryQueryInput = {
            name:req.query.name,
            userid:req.user!.id
        }
        const result = await this.service.findAll(input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Category search completed',
            timestamp: new Date().toISOString()
        });
    }
    getCharacterData = async (req: Request<{},{},{},CategoryQueryRequest>, res: Response<ApiResponse<CategoryResponse[]>>, next: NextFunction): Promise<void> => {
        const input:CategoryQueryInput = {
            name:req.query.name,
            userid:req.user!.id
        }
        const result = await this.service.getCharacterData(input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Category search completed',
            timestamp: new Date().toISOString()
        });
    }

    update = async (req: Request<IdParamRequest | any,{},CategoryUpdateRequest>, res: Response<ApiResponse<CategoryResponse>>, next: NextFunction): Promise<void> => {
        const input:CategoryUpdateInput = {
            name:req.body.name,
            userid:req.user!.id
        }
        const result = await this.service.update(Number(req.params!.id), input);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Category updated',
            timestamp: new Date().toISOString()
        });
    }

    delete = async (req: Request, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const result = await this.service.delete(Number(req.params.id),req.user!.id);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Category removed',
            timestamp: new Date().toISOString()
        });
    }
}