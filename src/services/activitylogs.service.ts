import { ActivityLogsRepository } from "../repositories/activitylogs.repository";
import { ActivityLogsQueryDto, ActivityLogsCreateDto, ActivityLogsUpdateDto, ActivityLogsCreateInput, ActivityLogsOutput, ActivityLogsQueryInput, ActivityLogsUpdateInput } from "../types/activitylogs.type";

export class ActivityLogsService {
    private repository = new ActivityLogsRepository();

    create = async (input: ActivityLogsCreateInput): Promise<ActivityLogsOutput> => {
        try {
            const newCategory: ActivityLogsCreateDto = {
                activityid: input.activityid,
                activityvalue: input.activityvalue,
                activityexp: 100,
                activitydatetime: input.activitydatetime,
                userid: input.userid,
                activitynote: input.activitynote
            }
            const data = await this.repository.create(newCategory);

            const output: ActivityLogsOutput = {
                id: data.id,
                activityid: data.activityid,
                activityvalue: data.activityvalue,
                activitydatetime: data.activitydatetime,
                activityexp: data.activityexp,
                activitynote: data.activitynote
            }

            return output;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<ActivityLogsOutput | null> => {
        try {
            const result = await this.repository.findById(id, userid);

            if (result) {
                const output: ActivityLogsOutput = {
                    id: result.id,
                    activityid: result.activityid,
                    activityvalue: result.activityvalue,
                    activitydatetime: result.activitydatetime,
                    activityexp: result.activityexp,
                    activitynote: result.activitynote
                }

                return output;
            }
            return null;

        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findAll = async (input: ActivityLogsQueryInput): Promise<ActivityLogsOutput[]> => {
        const dto: ActivityLogsQueryDto = {
            activityid: input.activityid,
            userid: input.userid
        }

        const result = await this.repository.findAll(dto);

        const output: ActivityLogsOutput[] = result.map(r => {
            const o: ActivityLogsOutput = { id: r.id, activityid: r.activityid, activityvalue: r.activityvalue, activitydatetime: r.activitydatetime, activityexp: r.activityexp, activitynote: r.activitynote }
            return o;
        })

        return output;
    }

    update = async (id: number, input: ActivityLogsUpdateInput): Promise<ActivityLogsOutput> => {
        const dto: ActivityLogsUpdateDto = {
            id: id
            , activityvalue: input.activityvalue || null
            , activitydatetime: input.activitydatetime || null
            , activityid: input.activityid || null
            , activitynote: input.activitynote || null
            , userid: input.userid
        };
        const result = await this.repository.update(dto);
        const output: ActivityLogsOutput = { id: result.id, activityid: result.activityid, activityvalue: result.activityvalue, activitydatetime: result.activitydatetime, activityexp: result.activityexp, activitynote: result.activitynote };
        return output;
    }

    delete = async (id: number, userid: number): Promise<boolean> => {
        try {
            const result = await this.repository.delete(id, userid);
            return result;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }
}