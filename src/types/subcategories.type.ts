import * as z from 'zod';
import { ActivityOutput } from './activities.type';

export const SubCategoryCreateRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters').meta({
      description: 'Subcategory name',
      example: 'Running'
    }).refine((val) => {
    const dangerousChars = /[<>'";`&,$\\|{}[\]]/;
    return !dangerousChars.test(val);
  }, {
    message: "You can not use this special characters: < > ' \" ; ` & $ | \\ { } [ ]"
  }),
  categoryid: z.number().int('categoryid must be a number').meta({
    description: 'Parent category ID',
    example: 1
  })
});

export const SubCategoryQueryRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters')
    .refine((val) => {
    const dangerousChars = /[<>'";`&,$\\|{}[\]]/;
    return !dangerousChars.test(val);
  }, {
    message: "You can not use this special characters: < > ' \" ; ` & $ | \\ { } [ ]"
  })
    .optional().meta({
      description: 'Filter by subcategory name',
      example: 'Running'
    }),
  categoryid: z.number().int('categoryid must be a number').optional().meta({
    description: 'Filter by parent category ID',
    example: 1
  })
});

export const SubCategoryUpdateRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters').meta({
      description: 'Updated subcategory name',
      example: 'Jogging'
    }).refine((val) => {
    const dangerousChars = /[<>'";`&,$\\|{}[\]]/;
    return !dangerousChars.test(val);
  }, {
    message: "You can not use this special characters: < > ' \" ; ` & $ | \\ { } [ ]"
  }),
  categoryid: z.number().int('categoryid must be a number')
});

export interface SubCategoryResponse {
  id: number,
  name: string,
  categoryid: number,
  data?: ActivityOutput[]
}

export type SubCategoryCreateRequest = z.infer<typeof SubCategoryCreateRequestSchema>;
export type SubCategoryQueryRequest = z.infer<typeof SubCategoryQueryRequestSchema>;
export type SubCategoryUpdateRequest = z.infer<typeof SubCategoryUpdateRequestSchema>;

export interface SubCategoryOutput {
  id: number,
  name: string,
  categoryid: number,
  activityvalue?: number,
  activityexp?: number,
  activitycount?: number,
  activitylogcount?: number
}

export interface SubCategoryCreateInput {
  name: string,
  categoryid: number,
  userid: number
}

export interface SubCategoryQueryInput {
  name?: string,
  categoryid?: number,
  userid: number
}

export interface SubCategoryUpdateInput {
  name: string,
  userid: number,
  categoryid: number
}


export interface SubCategoryCreateDto {
  name: string,
  categoryid: number,
  userid: number
}

export interface SubCategoryQueryDto {
  name?: string,
  categoryid?: number,
  userid: number
}

export interface SubCategoryUpdateDto {
  id: number,
  name: string,
  userid: number,
  categoryid: number,
}

export interface SubCategoryDbo {
  id: number,
  name: string,
  categoryid: number,
  activityvalue?: number,
  activityexp?: number,
  activitycount?: number,
  activitylogcount?: number
}