import * as z from 'zod';
import { SubCategoryDbo } from './subcategories.type';

export const CategoryCreateRequestSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters').meta({
      description: 'Category name',
      example: 'Health & Fitness'
    })
});

export const CategoryQueryRequestSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .optional().meta({
      description: 'Filter by category name',
      example: 'Health'
    })
});

export const CategoryUpdateRequestSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters').meta({
      description: 'Updated category name',
      example: 'Sports & Fitness'
    })
});

export interface CategoryResponse {
    id: number,
    name: string,
    data?:SubCategoryDbo[]
}

export type CategoryCreateRequest = z.infer<typeof CategoryCreateRequestSchema>;
export type CategoryQueryRequest = z.infer<typeof CategoryQueryRequestSchema>;
export type CategoryUpdateRequest = z.infer<typeof CategoryUpdateRequestSchema>;

export interface CategoryOutput {
    id: number,
    name: string,
    activityvalue?: number,
    activityexp?: number,
    activitylogcount?:number
    activitycount?:number
    subcategorycount?:number,
    categorycount?:number,
}

export interface CategoryCreateInput {
    name: string,
    userid:number
}

export interface CategoryQueryInput {
    name?: string,
    userid:number
}

export interface CategoryUpdateInput {
    name: string,
    userid:number
}

export interface CategoryCreateDto {
    name: string,
    userid:number
}

export interface CategoryQueryDto{
    name?:string,
    userid:number
}

export interface CategoryUpdateDto {
    id: number,
    name: string,
    userid:number
}

export interface CategoryDbo {
    id: number,
    name: string,
    activityvalue?: number,
    activityexp?: number,
    activitylogcount?:number
    activitycount?:number
    subcategorycount?:number,
    categorycount?:number,
}