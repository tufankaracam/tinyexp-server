import { generateToken } from "../helpers/token.helper";
import { UserRepository } from "../repositories/users.repository";
import AppError from "../types/error.type";
import { UserRegisterInput, UserRegisterOutput, UserRegisterDto, UserLoginInput, UserLoginOutput } from "../types/users.type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    private repository = new UserRepository();

    register = async (input: UserRegisterInput): Promise<UserRegisterOutput> => {
        try {

            const exists = await this.repository.findByEmail(input.email);
            if(exists){
                throw new AppError(400,"Email adress is already exist");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);

            const newUser: UserRegisterDto = {
                email: input.email,
                username: input.username,
                hashedpassword: hashedPassword
            }

            
            const data = await this.repository.create(newUser);

            const token = generateToken({id:data.id,email:data.email,username:data.username});

            const output: UserRegisterOutput = {
                id: data.id,
                email: data.email,
                username: data.username,
                token
            }

            return output;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    login = async (input: UserLoginInput): Promise<UserLoginOutput> => {
        const data = await this.repository.findByEmail(input.email);
        if (!data) {
            throw new AppError(401, "User not found!");
        }

        if(!await bcrypt.compare(input.password, data.password)){
            throw new AppError(401, "Password is not correct!");
        }

        const token = generateToken({id:data.id,email:data.email,username:data.username});

        return { id: data.id, email: data.email, username: data.username, token };
    }
}