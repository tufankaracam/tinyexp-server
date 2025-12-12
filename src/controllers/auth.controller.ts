import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { AuthService } from "../services/auth.service";
import { UserLoginInput, UserLoginRequest, UserLoginResponse, UserPasswordChangeInput, UserPasswordChangeRequest, UserRegisterInput, UserRegisterRequest, UserRegisterResponse, UserResetPasswordConfirmRequest, UserResetPasswordRequest } from '../types/users.type';
import { ApiResponse } from "../types/controller.type";

export class AuthController {
    private service = new AuthService();

    register = async (req: Request<{}, {}, UserRegisterRequest>, res: Response<ApiResponse<UserRegisterResponse>>, next: NextFunction): Promise<void> => {
        const input: UserRegisterInput = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };
        const result = await this.service.register(input);
        const output: UserRegisterResponse = {
            id: result.id,
            email: result.email,
            username: result.username,
            token: result.token,
        };

        res.status(200).json({
            success: true,
            data: output,
            message: 'Auth created successfully',
            timestamp: new Date().toISOString()
        });
    }

    login = async (req: Request<{}, {}, UserLoginRequest>, res: Response<ApiResponse<UserLoginResponse>>, next: NextFunction): Promise<void> => {
        const input: UserLoginInput = {
            email: req.body.email,
            password: req.body.password
        };
        const data = await this.service.login(input);
        const output: UserLoginResponse = {
            id: data.id,
            email: data?.email,
            username: data?.username,
            token: data.token
        }

        res.status(200).json({
            success: true,
            message: "Login succesful!",
            data: output,
            timestamp: new Date().toISOString()
        })
    }

    changePassword = async (req: Request<{}, {}, UserPasswordChangeRequest>, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const input: UserPasswordChangeInput = {
            id: req.user?.id!,
            oldpassword: req.body.oldpassword,
            password: req.body.password,
            password2: req.body.password2
        };
        const output = await this.service.changePassword(input);

        res.status(200).json({
            success: true,
            message: "Password changed succesfully!",
            data: output,
            timestamp: new Date().toISOString()
        })
    }

    resetPassword = async (req: Request<{}, {}, UserResetPasswordRequest>, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const input: UserResetPasswordRequest = {
            email: req.body.email
        };
        const output = await this.service.resetPassword(input);

        res.status(200).json({
            success: true,
            message: "Reset Password link sent succesfully! Please check your email address.",
            data: output,
            timestamp: new Date().toISOString()
        })
    }

    resetPasswordStatus = async (req: Request<{ resetcode?: string }, {}, {}>, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const output = await this.service.resetPasswordStatus(req.params?.resetcode!);
        res.status(200).json({
            success: true,
            message: "Reset Password link sent succesfully!",
            data: output,
            timestamp: new Date().toISOString()
        })
    }

    resetPasswordConfirm = async (req: Request<{ resetcode?: string }, {}, UserResetPasswordConfirmRequest>, res: Response<ApiResponse<boolean>>, next: NextFunction): Promise<void> => {
        const input: UserResetPasswordConfirmRequest = {
            password: req.body.password,
            password2: req.body.password2,
        };
        const output = await this.service.resetPasswordConfirm(req.params.resetcode!, input);

        res.status(200).json({
            success: true,
            message: "Reset Password link sent succesfully!",
            data: output,
            timestamp: new Date().toISOString()
        })
    }
}