import { SubCategoryRepository } from "../repositories/subcategories.repository";
import { SubCategoryQueryDto, SubCategoryCreateDto, SubCategoryUpdateDto, SubCategoryCreateInput, SubCategoryOutput, SubCategoryQueryInput, SubCategoryUpdateInput } from "../types/subcategories.type";

export class SubCategoryService {
    private repository = new SubCategoryRepository();

    create = async (input: SubCategoryCreateInput): Promise<SubCategoryOutput> => {
        console.log(input);
        try {
            const newCategory: SubCategoryCreateDto = {
                name: input.name,
                categoryid: input.categoryid,
                userid: input.userid
            }
            const data = await this.repository.create(newCategory);

            const output: SubCategoryOutput = {
                id: data.id,
                name: data.name,
                categoryid: data.categoryid
            }

            return output;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<SubCategoryOutput | null> => {
        try {
            const result = await this.repository.findById(id, userid);

            if (result) {
                const output: SubCategoryOutput = {
                    id: result.id,
                    name: result.name,
                    categoryid: result.categoryid
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

    findAll = async (input: SubCategoryQueryInput): Promise<SubCategoryOutput[]> => {
        const dto: SubCategoryQueryDto = {
            name: input.name,
            userid: input.userid,
            categoryid: input.categoryid
        }

        const result = await this.repository.findAll(dto);

        const output: SubCategoryOutput[] = result.map(r => {
            const o: SubCategoryOutput = { id: r.id, name: r.name, categoryid: r.categoryid, activityvalue: r.activityvalue, activitycount: r.activitycount, activityexp: r.activityexp ,activitylogcount:r.activitylogcount}
            return o;
        })

        return output;
    }

    update = async (id: number, input: SubCategoryUpdateInput): Promise<SubCategoryOutput> => {
        const dto: SubCategoryUpdateDto = { id: id, name: input.name, userid: input.userid, categoryid: input.categoryid };
        const result = await this.repository.update(dto);
        const output: SubCategoryOutput = { id: result.id, name: result.name, categoryid: result.categoryid };
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