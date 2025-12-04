import { TrackingTypeRepository } from "../repositories/trackingtypes.repository";
import { TrackingTypeCreateInput, TrackingTypeOutput, TrackingTypeQueryInput, TrackingTypeUpdateInput, TrackingTypeQueryDto, TrackingTypeCreateDto, TrackingTypeUpdateDto } from "../types/trackingtypes.type";

export class TrackingTypeService {
    private repository = new TrackingTypeRepository();

    create = async (input: TrackingTypeCreateInput): Promise<TrackingTypeOutput> => {
        try {
            const newTrackingType: TrackingTypeCreateDto = {
                name: input.name,
                userid:input.userid
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

    findById = async (id: number,userid:number): Promise<TrackingTypeOutput | null> => {
        try {
            const result = await this.repository.findById(id,userid);

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

    findAll = async (input: TrackingTypeQueryInput): Promise<TrackingTypeOutput[]> => {
        const dto: TrackingTypeQueryDto = {
            name: input.name,
            userid:input.userid
        }

        const result = await this.repository.findAll(dto);

        const output: TrackingTypeOutput[] = result.map(r => {
            const o: TrackingTypeOutput = { id: r.id, name: r.name }
            return o;
        })

        return output;
    }

    update = async (id: number, input: TrackingTypeUpdateInput): Promise<TrackingTypeOutput> => {
        const dto: TrackingTypeUpdateDto = { id: id, name: input.name,userid:input.userid };
        const result = await this.repository.update(dto);
        const output: TrackingTypeOutput = { id: result.id, name: result.name };
        return output;
    }

    delete = async (id: number,userid:number): Promise<boolean> => {
        try {
            const result = await this.repository.delete(id,userid);
            return result;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }
}