import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { ActivityCreateDto, ActivityDbo, ActivityQueryDto, ActivityUpdateDto } from '../types/activities.type';

export class ActivityRepository {

    create = async (params: ActivityCreateDto): Promise<ActivityDbo> => {
        try {
            const sql = 'insert into activities(`name`,`subcategoryid`,`trackingtypeid`,`userid`,`minvalue`) values(?,?,?,?,?)';
            const [result] = await pool.execute<ResultSetHeader>(sql, [params.name, params.subcategoryid, params.trackingtypeid, params.userid, params.minvalue]);
            return {
                id: result.insertId,
                name: params.name,
                subcategoryid: params.subcategoryid,
                trackingtypeid: params.trackingtypeid,
                minvalue: params.minvalue
            }
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<ActivityDbo | null> => {
        try {
            const sql = 'select a.*,tt.name trackingtypename from activities a left join trackingtypes tt on a.trackingtypeid = tt.id where a.id = ? and a.userid = ?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findByName = async (name: string, userid: number): Promise<ActivityDbo | null> => {
        try {
            const sql = 'select a.*,tt.name trackingtypename from activities a left join trackingtypes tt on a.trackingtypeid = tt.id where a.name = ? and a.userid = ?';
            const [rows] = await pool.query(sql, [name, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async (query: ActivityQueryDto): Promise<ActivityDbo[]> => {
        try {
            let sql = `
            SELECT 
                a.*,
                tt.name trackingtypename, 
                COUNT(al.id) as activitylogcount, 
                COALESCE(SUM(al.activityvalue), 0) as activityvalue, 
                COALESCE(SUM(al.activityexp), 0) as activityexp
            FROM activities a
            LEFT JOIN activitylogs al ON a.id = al.activityid
            LEFT JOIN trackingtypes tt on a.trackingtypeid = tt.id
            WHERE a.userid = ?
        `;

            const params: any[] = [];
            params.push(query.userid);

            if (query.name) {
                sql += ' AND a.name LIKE ?';
                params.push(`%${query.name}%`);
            }

            if (query.subcategoryid) {
                sql += ' AND a.subcategoryid = ?';
                params.push(`${query.subcategoryid}`);
            }

            if (query.trackingtypeid) {
                sql += ' AND a.trackingtypeid = ?';
                params.push(`%${query.trackingtypeid}%`);
            }

            sql += ' GROUP BY a.id order by a.name asc';

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    update = async (params: ActivityUpdateDto): Promise<ActivityDbo> => {
        try {
            const query = 'UPDATE `activities` SET `name` = ?,`minvalue` = ?,`subcategoryid` = ? , `trackingtypeid` = ? where `id` = ? and `userid` = ?';
            const [result, fields] = await pool.execute<ResultSetHeader>(query, [params.name, params.minvalue, params.subcategoryid, params.trackingtypeid, params.id, params.userid]);
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
            const query = 'DELETE FROM `activities` where `id` = ? and `userid` = ?';
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