import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { UserRegisterDto, UserDbo } from '../types/users.type';

export class UserRepository {
    create = async (params: UserRegisterDto):Promise<UserDbo> => {
        try {
            const sql = 'insert into users(`email`,`username`,`password`) values(?,?,?)';
            const [result] = await pool.execute<ResultSetHeader>(sql, [params.email,params.username,params.hashedpassword]);
            return {
                id:result.insertId,
                username:params.username,
                email:params.email,
                password:params.hashedpassword
            }
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findById = async (id: number):Promise<UserDbo | null> => {
        try {
            const sql = 'select * from `users` where `id` = ?';
            const [rows] = await pool.query(sql, [id]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findByEmail = async (email: string):Promise<UserDbo | null> => {
        try {
            const sql = 'select * from `users` where `email` = ?';
            const [rows] = await pool.query(sql, [email]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async ():Promise<UserDbo[]> => {
        try {
            let sql = 'SELECT * FROM `users`';
            const [rows] = await pool.query(sql) as any;
            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    delete = async(id:number):Promise<boolean>=>{
        try{
            const query = 'DELETE FROM `users` where `id` = ?';
            const [result,fields] = await pool.execute<ResultSetHeader>(query,[id]);
            return result.affectedRows > 0;
        }
        catch(err){
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }
}