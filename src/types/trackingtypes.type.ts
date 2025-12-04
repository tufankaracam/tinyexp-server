import * as z from 'zod';

export const TrackingTypeCreateRequestSchema = z.object({
  name: z.string()
    .min(1, 'Name must be at least 1 characters').meta({
      description: 'Tracking type name',
      example: 'Steps'
    })
});

export const TrackingTypeQueryRequestSchema = z.object({
  name: z.string()
    .min(1, 'Name must be at least 1 characters')
    .optional().meta({
      description: 'Filter by tracking type name',
      example: 'Steps'
    })
});

export const TrackingTypeUpdateRequestSchema = z.object({
  name: z.string()
    .min(1, 'Name must be at least 1 characters').meta({
      description: 'Updated tracking type name',
      example: 'Distance'
    })
});

export interface TrackingTypeResponse {
    id: number,
    name: string
}

export type TrackingTypeCreateRequest = z.infer<typeof TrackingTypeCreateRequestSchema>;
export type TrackingTypeQueryRequest = z.infer<typeof TrackingTypeQueryRequestSchema>;
export type TrackingTypeUpdateRequest = z.infer<typeof TrackingTypeUpdateRequestSchema>;

export interface TrackingTypeOutput {
    id: number,
    name: string
}

export interface TrackingTypeCreateInput {
    name: string,
    userid:number
}

export interface TrackingTypeQueryInput {
    name?: string,
    userid:number
}

export interface TrackingTypeUpdateInput {
    name: string,
    userid:number
}

export interface TrackingTypeCreateDto {
    name: string,
    userid:number
}

export interface TrackingTypeQueryDto{
    name?:string,
    userid:number
}

export interface TrackingTypeUpdateDto {
    id: number,
    name: string,
    userid:number
}

export interface TrackingTypeDbo {
    id: number,
    name: string
}