import { generateToken } from "../helpers/token.helper";
import { UserRepository } from "../repositories/users.repository";
import AppError from "../types/error.type";
import { UserRegisterInput, UserRegisterOutput, UserRegisterDto, UserLoginInput, UserLoginOutput, UserPasswordChangeInput, UserResetPasswordRequest, UserResetPasswordConfirmRequest } from "../types/users.type";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { sendResetPasswordMail } from "../utils/mailer";

export class AuthService {
    private repository = new UserRepository();

    register = async (input: UserRegisterInput): Promise<UserRegisterOutput> => {
        try {

            const exists = await this.repository.findByEmail(input.email);
            if (exists) {
                throw new AppError(400, "Email adress is already exist");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);

            const newUser: UserRegisterDto = {
                email: input.email,
                username: input.username,
                hashedpassword: hashedPassword
            }


            const data = await this.repository.create(newUser);

            const token = generateToken({ id: data.id, email: data.email, username: data.username });

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

        if (!await bcrypt.compare(input.password, data.password)) {
            throw new AppError(401, "Password is not correct!");
        }

        const token = generateToken({ id: data.id, email: data.email, username: data.username });

        return { id: data.id, email: data.email, username: data.username, token };
    }

    changePassword = async (input: UserPasswordChangeInput): Promise<boolean> => {
        try {
            const data = await this.repository.findById(input.id);
            if (!data) {
                throw new AppError(401, "User not found!");
            }

            if (!await bcrypt.compare(input.oldpassword, data.password)) {
                throw new AppError(401, "Old Password is not correct!");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);

            await this.repository.updatePassword(input.id, hashedPassword);

            return true;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    resetPassword = async (input: UserResetPasswordRequest): Promise<boolean> => {
        try {
            const data = await this.repository.findByEmail(input.email);
            if (!data) {
                throw new AppError(401, "User not found!");
            }
            const resetCode = uuidv4();
            this.repository.updateResetCode(input.email, resetCode);
            await sendResetPasswordMail(data?.email, resetCode);
            return true;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    resetPasswordStatus = async (resetcode: string): Promise<boolean> => {
        try {
            const data = await this.repository.findByResetCode(resetcode);
            if (!data) {
                throw new AppError(400, "Password reset code is not valid!");
            }
            return true;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

    resetPasswordConfirm = async (resetcode: string, input: UserResetPasswordConfirmRequest): Promise<boolean> => {
        try {
            console.log(resetcode, input)
            const data = await this.repository.findByResetCode(resetcode);
            if (!data) {
                throw new AppError(400, "Password reset code is not valid!");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(input.password, salt);

            await this.repository.updatePassword(data?.id, hashedPassword);
            await this.repository.updateResetCode(data?.email, null);
            return true;
        }
        catch (err) {
            const error = err as Error;
            console.log(error.message);
            throw error;
        }
    }

}