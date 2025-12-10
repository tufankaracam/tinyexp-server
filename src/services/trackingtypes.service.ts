import { TrackingTypeRepository } from "../repositories/trackingtypes.repository";
import AppError from "../types/error.type";
import { TrackingTypeCreateInput, TrackingTypeOutput, TrackingTypeQueryInput, TrackingTypeUpdateInput, TrackingTypeQueryDto, TrackingTypeCreateDto, TrackingTypeUpdateDto } from "../types/trackingtypes.type";

export class TrackingTypeService {
    private repository = new TrackingTypeRepository();

    create = async (input: TrackingTypeCreateInput): Promise<TrackingTypeOutput> => {
        try {
            const isExist = await this.repository.findByName(input.name, input.userid);
            if (isExist) {
                throw new AppError(400, 'Trackingtype is already exists!');
            }

            const newTrackingType: TrackingTypeCreateDto = {
                name: input.name,
                userid: input.userid
            }
            const data = await this.repository.create(newTrackingType);

            const output: TrackingTypeOutput = {
                id: data.id,
                name: data.name
            }

            return output;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<TrackingTypeOutput | null> => {
        try {
            const result = await this.repository.findById(id, userid);

            if (result) {
                const output: TrackingTypeOutput = {
                    id: result.id,
                    name: result.name
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

    checkByActivity = async (id: number, userid: number): Promise<TrackingTypeOutput[]> => {
        try {
            const result = await this.repository.checkByActivity(id, userid);

            const output: TrackingTypeOutput[] = result.map(r => {
                const o: TrackingTypeOutput = { id: r.id, name: r.name }
                return o;
            })
            return output;

        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findAll = async (input: TrackingTypeQueryInput): Promise<TrackingTypeOutput[]> => {
        const dto: TrackingTypeQueryDto = {
            name: input.name,
            userid: input.userid
        }

        const result = await this.repository.findAll(dto);

        const output: TrackingTypeOutput[] = result.map(r => {
            const o: TrackingTypeOutput = { id: r.id, name: r.name }
            return o;
        })
        return output;
    }

    update = async (id: number, input: TrackingTypeUpdateInput): Promise<TrackingTypeOutput> => {
        const isExist = await this.repository.findByName(input.name, input.userid);
        if (isExist && isExist.id != id) {
            throw new AppError(400, 'Trackingtype name is already used!');
        }
        const dto: TrackingTypeUpdateDto = { id: id, name: input.name, userid: input.userid };
        const result = await this.repository.update(dto);
        const output: TrackingTypeOutput = { id: result.id, name: result.name };
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