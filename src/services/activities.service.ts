import { ActivityRepository } from "../repositories/activities.repository";
import { ActivityQueryDto, ActivityCreateDto, ActivityUpdateDto, ActivityCreateInput, ActivityOutput, ActivityQueryInput, ActivityUpdateInput } from "../types/activities.type";
import AppError from "../types/error.type";

export class ActivityService {
    private repository = new ActivityRepository();

    create = async (input: ActivityCreateInput): Promise<ActivityOutput> => {
        try {
            const isExist = await this.repository.findByName(input.name, input.userid);
            if (isExist) {
                throw new AppError(400, 'Activity is already exists!');
            }
            const newCategory: ActivityCreateDto = {
                name: input.name,
                subcategoryid: input.subcategoryid,
                trackingtypeid: input.trackingtypeid,
                userid: input.userid,
                minvalue: input.minvalue
            }
            const data = await this.repository.create(newCategory);

            const output: ActivityOutput = {
                id: data.id,
                name: data.name,
                subcategoryid: data.subcategoryid,
                trackingtypeid: data.trackingtypeid,
                minvalue: data.minvalue
            }

            return output;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<ActivityOutput | null> => {
        try {
            const result = await this.repository.findById(id, userid);

            if (result) {
                const output: ActivityOutput = {
                    id: result.id,
                    name: result.name,
                    subcategoryid: result.subcategoryid,
                    trackingtypeid: result.trackingtypeid,
                    minvalue: result.minvalue,
                    trackingtypename: result.trackingtypename!
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

    findAll = async (input: ActivityQueryInput): Promise<ActivityOutput[]> => {
        const dto: ActivityQueryDto = {
            name: input.name,
            userid: input.userid,
            subcategoryid: input.subcategoryid
        }

        const result = await this.repository.findAll(dto);

        const output: ActivityOutput[] = result.map(r => {
            const o: ActivityOutput = { id: r.id, name: r.name, subcategoryid: r.subcategoryid, trackingtypeid: r.trackingtypeid, minvalue: r.minvalue, activityexp: r.activityexp, activityvalue: r.activityvalue, activitylogcount: r.activitylogcount, trackingtypename: r.trackingtypename }
            return o;
        })

        return output;
    }

    update = async (id: number, input: ActivityUpdateInput): Promise<ActivityOutput> => {
        const isExist = await this.repository.findByName(input.name, input.userid);
        if (isExist && isExist.id != id) {
            throw new AppError(400, 'Activity name is already used!');
        }
        const dto: ActivityUpdateDto = { id: id, name: input.name, userid: input.userid, minvalue: input.minvalue, subcategoryid: input.subcategoryid, trackingtypeid: input.trackingtypeid };
        const result = await this.repository.update(dto);
        const output: ActivityOutput = { id: result.id, name: result.name, subcategoryid: result.subcategoryid, trackingtypeid: result.trackingtypeid, minvalue: result.minvalue };
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