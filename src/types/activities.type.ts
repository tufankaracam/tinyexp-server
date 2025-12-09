import * as z from 'zod';
import { ActivityLogsOutput } from './activitylogs.type';

export const ActivityCreateRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters').meta({
      description: 'Activity name',
      example: 'Morning Run'
    }),
  subcategoryid: z.number().int('subcategoryid must be a number').meta({
    description: 'Parent subcategory ID',
    example: 1
  }),
  trackingtypeid: z.number().int('trackingtypeid must be a number').meta({
    description: 'Tracking type ID',
    example: 1
  }),
  minvalue: z.number("minvalue must be a number")
    .min(1, 'minvalue must be at least 1')
    .meta({
      description: 'Minimum required value for exp calculation',
      example: 1
    })
});

export const ActivityQueryRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters')
    .optional().meta({
      description: 'Filter by activity name',
      example: 'Running'
    }),
  subcategoryid: z.number().int('subcategoryid must be a number').optional().meta({
    description: 'Filter by subcategory ID',
    example: 1
  }),
  trackingtypeid: z.number().int('trackingtypeid must be a number').optional().meta({
    description: 'Filter by tracking type ID',
    example: 1
  })
});

export const ActivityUpdateRequestSchema = z.object({
  name: z.string()
    .min(3, 'name must be at least 3 characters').meta({
      description: 'Updated activity name',
      example: 'Evening Jog'
    }),
  subcategoryid: z.number().int('subcategoryid must be a number').optional().meta({
    description: 'Parent subcategory ID',
    example: 1
  }),
  trackingtypeid: z.number().int('trackingtypeid must be a number').optional().meta({
    description: 'Tracking type ID',
    example: 1
  }),
  minvalue: z.number()
    .min(1, 'minvalue must be at least 1')
    .meta({
      description: 'Minimum required value for exp calculation',
      example: 1
    })

});

export interface ActivityResponse {
  id: number,
  name: string,
  subcategoryid: number,
  trackingtypeid: number,
  minvalue: number,
  data?: ActivityLogsOutput[]
}

export type ActivityCreateRequest = z.infer<typeof ActivityCreateRequestSchema>;
export type ActivityQueryRequest = z.infer<typeof ActivityQueryRequestSchema>;
export type ActivityUpdateRequest = z.infer<typeof ActivityUpdateRequestSchema>;

export interface ActivityOutput {
  id: number,
  name: string,
  subcategoryid: number,
  trackingtypeid: number,
  minvalue: number,
  activityvalue?: number,
  activityexp?: number,
  activitylogcount?:number
}

export interface ActivityCreateInput {
  name: string,
  subcategoryid: number,
  trackingtypeid: number,
  userid: number,
  minvalue: number
}

export interface ActivityQueryInput {
  name?: string,
  subcategoryid?: number,
  trackingtypeid?: number,
  userid: number
}

export interface ActivityUpdateInput {
  name: string,
  userid: number,
  subcategoryid: number,
  trackingtypeid: number,
  minvalue: number
}


export interface ActivityCreateDto {
  name: string,
  subcategoryid: number,
  trackingtypeid: number,
  userid: number,
  minvalue: number
}

export interface ActivityQueryDto {
  name?: string,
  subcategoryid?: number,
  trackingtypeid?: number,
  userid: number
}

export interface ActivityUpdateDto {
  id: number,
  name: string,
  userid: number,
  subcategoryid: number,
  trackingtypeid: number,
  minvalue: number
}

export interface ActivityDbo {
  id: number,
  name: string,
  subcategoryid: number,
  trackingtypeid: number,
  minvalue: number,
  activityvalue?: number,
  activityexp?: number,
  activitylogcount?:number
}