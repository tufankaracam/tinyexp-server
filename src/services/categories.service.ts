import { CategoryRepository } from "../repositories/categories.repository";
import { SubCategoryRepository } from "../repositories/subcategories.repository";
import { CategoryCreateInput, CategoryOutput, CategoryQueryInput, CategoryUpdateInput, CategoryQueryDto, CategoryCreateDto, CategoryUpdateDto } from "../types/categories.type";
import AppError from "../types/error.type";

export class CategoryService {
    private repository = new CategoryRepository();
    private subRepository = new SubCategoryRepository();
    
    create = async (input: CategoryCreateInput): Promise<CategoryOutput> => {
        try {
            const isExist = await this.repository.findByName(input.name, input.userid);
            if (isExist) {
                throw new AppError(400, 'Category is already exists!');
            }

            const newCategory: CategoryCreateDto = {
                name: input.name.toLowerCase(),
                userid: input.userid
            }
            const data = await this.repository.create(newCategory);

            const output: CategoryOutput = {
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

    findById = async (id: number, userid: number): Promise<CategoryOutput | null> => {
        try {
            const result = await this.repository.findById(id, userid);

            if (result) {
                const output: CategoryOutput = {
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

    findAll = async (input: CategoryQueryInput): Promise<CategoryOutput[]> => {
        const dto: CategoryQueryDto = {
            name: input.name,
            userid: input.userid
        }

        const result = await this.repository.findAll(dto);

        const output: CategoryOutput[] = result.map(r => {
            const o: CategoryOutput = {
                id: r.id, name: r.name,
                activitycount: r?.activitycount,
                activitylogcount: r.activitylogcount,
                subcategorycount: r.subcategorycount,
                activityexp: r?.activityexp,
                activityvalue: r?.activityvalue
            }
            return o;
        })

        return output;
    }
    getCharacterData = async (input: CategoryQueryInput): Promise<CategoryOutput[]> => {
        const dto: CategoryQueryDto = {
            name: input.name,
            userid: input.userid
        }

        const result = await this.repository.getCharacterData(dto);

        const output: CategoryOutput[] = result.map(r => {
            const o: CategoryOutput = {
                id: r.id, name: r.name,
                activitycount: r?.activitycount,
                activitylogcount: r.activitylogcount,
                subcategorycount: r.subcategorycount,
                activityexp: r?.activityexp,
                activityvalue: r?.activityvalue,
                categorycount: r?.categorycount
            }
            return o;
        })

        return output;
    }

    update = async (id: number, input: CategoryUpdateInput): Promise<CategoryOutput> => {
        const isExist = await this.repository.findByName(input.name, input.userid);
        if (isExist && isExist.id != id) {
            throw new AppError(400, 'Category name is already used!');
        }
        const dto: CategoryUpdateDto = { id: id, name: input.name, userid: input.userid };
        const result = await this.repository.update(dto);
        const output: CategoryOutput = { id: result.id, name: result.name };
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