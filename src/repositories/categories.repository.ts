import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { CategoryCreateDto, CategoryDbo, CategoryQueryDto, CategoryUpdateDto } from '../types/categories.type';

export class CategoryRepository {
    create = async (params: CategoryCreateDto): Promise<CategoryDbo> => {
        try {
            const sql = 'insert into categories(`name`,`userid`) values(?,?)';
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

    findById = async (id: number, userid: number): Promise<CategoryDbo | null> => {
        try {
            const sql = 'select * from `categories` where `id` = ? and `userid`=?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findByName = async (name: string, userid: number): Promise<CategoryDbo | null> => {
        try {
            const sql = 'select * from `categories` where `name` = ? and `userid`=?';
            const [rows] = await pool.query(sql, [name, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async (query: CategoryQueryDto): Promise<CategoryDbo[]> => {
        try {
            // 1. Zincirleme 3 adet LEFT JOIN ile en alt tabloya ulaşıyoruz.
            // c: categories, sc: subcategories, a: activities, al: activitylogs
            let sql = `
            SELECT 
                c.*,
                COUNT(DISTINCT sc.id) as subcategorycount,
                COUNT(DISTINCT a.id) as activitycount,
                COUNT(al.id) as activitylogcount, 
                COALESCE(SUM(al.activityvalue), 0) as activityvalue, 
                COALESCE(SUM(al.activityexp), 0) as activityexp
            FROM categories c
            LEFT JOIN subcategories sc ON c.id = sc.categoryid
            LEFT JOIN activities a ON sc.id = a.subcategoryid
            LEFT JOIN activitylogs al ON a.id = al.activityid
            WHERE c.userid = ?
        `;

            const params: any[] = [];

            // İlk soru işareti (?) userid olduğu için önce onu ekliyoruz.
            params.push(query.userid);

            // 2. Filtreleme (Alias olarak 'c.' kullanıyoruz)
            if (query.name) {
                sql += ' AND c.name LIKE ?';
                params.push(`%${query.name}%`);
            }

            // 3. Tüm bu toplamları Kategori ID'sine göre paketliyoruz.
            sql += ' GROUP BY c.id order by c.name asc';

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }
    getCharacterData = async (query: CategoryQueryDto): Promise<CategoryDbo[]> => {
        try {
            let sql = `
            SELECT 
                COUNT(DISTINCT c.id) as categorycount,
                COUNT(DISTINCT sc.id) as subcategorycount,
                COUNT(DISTINCT a.id) as activitycount,
                COUNT(al.id) as activitylogcount, 
                COALESCE(SUM(al.activityvalue), 0) as activityvalue, 
                COALESCE(SUM(al.activityexp), 0) as activityexp

            FROM categories c
            LEFT JOIN subcategories sc ON c.id = sc.categoryid
            LEFT JOIN activities a ON sc.id = a.subcategoryid
            LEFT JOIN activitylogs al ON a.id = al.activityid
            WHERE c.userid = ?
        `;

            const params: any[] = [];

            params.push(query.userid);

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    update = async (params: CategoryUpdateDto): Promise<CategoryDbo> => {
        try {
            const query = 'UPDATE `categories` SET `name` = ? where `userid`=? and `id` = ?';
            const [result, fields] = await pool.execute<ResultSetHeader>(query, [params.name, params.userid, params.id]);
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
            const query = 'DELETE FROM `categories` where `id` = ? and `userid` = ?';
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