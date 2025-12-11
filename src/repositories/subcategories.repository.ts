import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { SubCategoryCreateDto, SubCategoryDbo, SubCategoryQueryDto, SubCategoryUpdateDto } from '../types/subcategories.type';

export class SubCategoryRepository {

    create = async (params: SubCategoryCreateDto): Promise<SubCategoryDbo> => {
        try {
            const sql = 'insert into subcategories(`name`,`categoryid`,`userid`) values(?,?,?)';
            const [result] = await pool.execute<ResultSetHeader>(sql, [params.name, params.categoryid, params.userid]);
            return {
                id: result.insertId,
                name: params.name,
                categoryid: params.categoryid
            }
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<SubCategoryDbo | null> => {
        try {
            const sql = 'select * from `subcategories` where `id` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findByName = async (name: string, userid: number): Promise<SubCategoryDbo | null> => {
        try {
            const sql = 'select * from `subcategories` where `name` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [name, userid]) as any;
            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async (query: SubCategoryQueryDto): Promise<SubCategoryDbo[]> => {
        try {
            let sql = `
            SELECT 
                sc.*, 
                COUNT(al.id) as activitylogcount,
                COUNT(DISTINCT a.id) as activitycount, 
                COALESCE(SUM(al.activityvalue), 0) as activityvalue, 
                COALESCE(SUM(al.activityexp), 0) as activityexp
            FROM subcategories sc
            LEFT JOIN activities a ON sc.id = a.subcategoryid
            LEFT JOIN activitylogs al ON a.id = al.activityid
            WHERE sc.userid = ?
        `;

            const params: any[] = [];
            params.push(query.userid);

            if (query.name) {
                sql += ' AND sc.name LIKE ?';
                params.push(`%${query.name}%`);
            }

            if (query.categoryid) {
                sql += ' AND sc.categoryid = ?';
                params.push(query.categoryid);
            }

            sql += ' GROUP BY sc.id order by sc.name asc';

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    update = async (params: SubCategoryUpdateDto): Promise<SubCategoryDbo> => {
        try {
            const query = 'UPDATE `subcategories` SET `name` = ?, `categoryid`= ? where `id` = ? and `userid` = ?';
            const [result, fields] = await pool.execute<ResultSetHeader>(query, [params.name, params.categoryid, params.id, params.userid]);
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
            const query = 'DELETE FROM `subcategories` where `id` = ? and `userid` = ?';
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