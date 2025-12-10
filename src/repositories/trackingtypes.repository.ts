import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { TrackingTypeCreateDto, TrackingTypeDbo, TrackingTypeQueryDto, TrackingTypeUpdateDto } from '../types/trackingtypes.type';

export class TrackingTypeRepository {
    create = async (params: TrackingTypeCreateDto): Promise<TrackingTypeDbo> => {
        try {
            const sql = 'insert into trackingtypes(`name`,`userid`) values(?,?)';
            const [result] = await pool.execute<ResultSetHeader>(sql, [params.name, params.userid]);
            return {
                id: result.insertId,
                name: params.name
            }
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<TrackingTypeDbo | null> => {
        try {
            const sql = 'select * from `trackingtypes` where `id` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findByName = async (name: string, userid: number): Promise<TrackingTypeDbo | null> => {
        try {
            const sql = 'select * from `trackingtypes` where `name` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [name, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async (query: TrackingTypeQueryDto): Promise<TrackingTypeDbo[]> => {
        try {
            let sql = 'SELECT * FROM `trackingtypes` WHERE userid = ?';
            const params: any[] = [];

            params.push(query.userid)

            if (query.name) {
                sql += ' AND `name` LIKE ?'
                params.push(`%${query.name}%`);
            }

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    checkByActivity = async (id: number, userid: number): Promise<TrackingTypeDbo[]> => {
        try {
            const sql = 'select * from `activities` where `trackingtypeid` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    update = async (params: TrackingTypeUpdateDto): Promise<TrackingTypeDbo> => {
        try {
            const query = 'UPDATE `trackingtypes` SET `name` = ? where `id` = ? and `userid` = ?';
            const [result, fields] = await pool.execute<ResultSetHeader>(query, [params.name, params.id, params.userid]);
            const updatedData = await this.findById(params.id, params.userid);
            return updatedData!;

        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    delete = async (id: number, userid: number): Promise<boolean> => {
        try {
            const query = 'DELETE FROM `trackingtypes` where `id` = ? and `userid` = ?';
            const [result, fields] = await pool.execute<ResultSetHeader>(query, [id, userid]);
            return result.affectedRows > 0;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }
}