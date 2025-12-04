import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import AppError from "../types/error.type";


export interface TokenPayload extends JwtPayload {
    id: number,
    email: string,
    username: string
}

export const generateToken = (data: TokenPayload) => {
    return jwt.sign(data, config.JWT_SECRETKEY, { expiresIn: "7d" });
}

export const verifyToken = (token: string): TokenPayload => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRETKEY) as TokenPayload;
        return decoded;
    }
    catch (error) {
        throw new AppError(400, "Token is invalid");
    }
}