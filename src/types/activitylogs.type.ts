import * as z from 'zod';

export const ActivityLogsCreateRequestSchema = z.object({
  activityid: z.number('activityid must be a number').int('activityid must be a decimal number').meta({
    description: 'Activity ID',
    example: 1
  }),
  activityvalue: z.number().int('activityvalue must be a number').min(1, "activityvalue must be bigger then zero").meta({
    description: 'Activity value (must be greater than zero)',
    example: 5000
  }),
  activitydatetime: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
      'activitydatetime must be valid datetime-local format'
    )
    .refine(
      (val) => !isNaN(new Date(val).getTime()),
      'activitydatetime must be valid date'
    ).meta({
      description: 'Activity datetime in ISO format',
      example: '2024-11-17T14:30'
    }),
    activitynote: z.string().refine((val) => {
    const dangerousChars = /[<>'";`&,$\\|{}[\]]/;
    return !dangerousChars.test(val);
  }, {
    message: "You can not use this special characters: < > ' \" ; ` & $ | \\ { } [ ]"
  }).optional()
});

export const ActivityLogsQueryRequestSchema = z.object({
  activityid: z.number().int('activityid must be a number').optional().meta({
    description: 'Filter by activity ID',
    example: 1
  })
});

export const ActivityLogsUpdateRequestSchema = z.object({
  activityid: z.number('activityid must be a number').int('activityid must be a decimal number').meta({
    description: 'Activity ID',
    example: 1
  }).optional(),
  activityvalue: z.number('activityvalue must be a number').min(1, "activityvalue must be bigger then zero").meta({
    description: 'Activity value (must be greater than zero)',
    example: 6000
  }),
  activitydatetime: z.string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
      'activitydatetime must be valid datetime-local format'
    )
    .refine(
      (val) => !isNaN(new Date(val).getTime()),
      'activitydatetime must be valid date'
    ).optional().meta({
      description: 'Updated activity datetime in ISO format',
      example: '2024-11-17T15:45'
    }),
    activitynote: z.string().optional().default("")
});

export interface ActivityLogsResponse {
  id: number,
  activityid: number,
  activityvalue: number,
  activitydatetime: string
}

export type ActivityLogsCreateRequest = z.infer<typeof ActivityLogsCreateRequestSchema>;
export type ActivityLogsQueryRequest = z.infer<typeof ActivityLogsQueryRequestSchema>;
export type ActivityLogsUpdateRequest = z.infer<typeof ActivityLogsUpdateRequestSchema>;

export interface ActivityLogsOutput {
  id: number,
  activityid: number,
  activityvalue: number,
  activityexp: number,
  activitydatetime: string,
  activitynote: string
}

export interface ActivityLogsCreateInput {
  activityid: number,
  activityvalue: number,
  activitydatetime: string,
  userid: number,
  activitynote: string
}

export interface ActivityLogsQueryInput {
  activityid?: number,
  userid: number
}

export interface ActivityLogsUpdateInput {
  activityid?: number,
  activityvalue?: number,
  activitydatetime?: string,
  activitynote?: string,
  userid: number
}

export interface ActivityLogsCreateDto {
  activityid: number,
  activityvalue: number,
  activityexp: number,
  activitydatetime: string,
  userid: number,
  activitynote: string
}

export interface ActivityLogsQueryDto {
  activityid?: number,
  userid: number
}

export interface ActivityLogsUpdateDto {
  id: number,
  activityid: number | null,
  activityvalue: number | null,
  activitydatetime: string | null,
  activitynote: string | null,
  userid: number
}

export interface ActivityLogsDbo {
  id: number,
  activityid: number,
  activityvalue: number,
  activityexp: number,
  activitydatetime: string,
  activitydate: string,
  activitynote: string
}