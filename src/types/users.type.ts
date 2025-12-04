import * as z from 'zod';

export const UserRegisterRequestSchema = z.object({
  email: z.string().email("email must be valid").meta({
    description: 'User email address',
    example: 'user@example.com'
  }),
  username: z.string()
    .min(3, 'Username must be at least 3 characters').meta({
      description: 'Username for the account',
      example: 'johndoe'
    }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters').meta({
      description: 'Account password (minimum 8 characters)',
      example: 'securePass123!'
    }),
  password2: z.string()
    .min(8, 'Password2 must be at least 8 characters').meta({
      description: 'Password confirmation - must match password field',
      example: 'securePass123!'
    })
}).refine(
  (data) => data.password === data.password2,
  {
    message: "Passwords don't match",
    path: ["password2"]
  }
);

export const UserLoginRequestSchema = z.object({
  email: z.string().email("email must be valid").meta({
    description: 'User email address',
    example: 'user@example.com'
  }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters').meta({
      description: 'Account password',
      example: 'securePass123!'
    })
});

export type UserRegisterRequest = z.infer<typeof UserRegisterRequestSchema>;
export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;

export interface UserRegisterResponse {
    id: number,
    email:string,
    username: string,
    token: string
}

export interface UserLoginResponse {
    id:number,
    email:string,
    username: string,
    token:string
}

export interface UserRegisterInput {
    email:string,
    username:string,
    password:string
}

export interface UserLoginInput {
    email:string,
    password:string
}

export interface UserRegisterOutput{
    id:number,
    email:string,
    username:string,
    token:string
}

export interface UserLoginOutput {
    id:number,
    email:string,
    username:string,
    token:string
}


export interface UserRegisterDto {
    email:string,
    username:string,
    hashedpassword:string
}

export interface UserLoginDto {
    email:string,
    password:string
}

export interface UserDbo {
    id:number,
    username:string,
    email:string,
    password:string
}

export interface UserToken {
    id:number,
    username:string,
    email:string
}

















