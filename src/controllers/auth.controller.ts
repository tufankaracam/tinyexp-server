import { Request, Response, NextFunction } from "express";
import * as z from 'zod';
import { AuthService } from "../services/auth.service";
import { UserLoginInput, UserLoginRequest, UserLoginResponse, UserRegisterInput, UserRegisterRequest, UserRegisterResponse } from '../types/users.type';
import { ApiResponse } from "../types/controller.type";

export class AuthController {
    private service = new AuthService();

    register = async (req: Request<{},{},UserRegisterRequest>, res: Response<ApiResponse<UserRegisterResponse>>, next: NextFunction): Promise<void> => {
        const input:UserRegisterInput = {
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
        };
        const result = await this.service.register(input);
        const output: UserRegisterResponse = {
            id: result.id,
            email:result.email,
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

    login = async(req:Request<{},{},UserLoginRequest>,res:Response<ApiResponse<UserLoginResponse>>,next:NextFunction):Promise<void>=>{
        const input:UserLoginInput = {
            email:req.body.email,
            password:req.body.password
        };
        const data = await this.service.login(input);
        const output:UserLoginResponse = {
            id:data.id,
            email:data?.email,
            username:data?.username,
            token:data.token
        }

        res.status(200).json({
            success:true,
            message:"Login succesful!",
            data:output,
            timestamp:new Date().toISOString()
        })
    }
}