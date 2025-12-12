import { ResultSetHeader } from 'mysql2';
import pool from '../db';
import { ActivityLogsCreateDto, ActivityLogsDbo, ActivityLogsQueryDto, ActivityLogsUpdateDto } from '../types/activitylogs.type';

export class ActivityLogsRepository {

    create = async (params: ActivityLogsCreateDto): Promise<ActivityLogsDbo> => {
        try {
            const sqlGetActivity = 'SELECT minvalue FROM activities WHERE id = ?';
            const [activityRows] = await pool.execute<any[]>(sqlGetActivity, [params.activityid]);

            if (activityRows.length === 0) {
                throw new Error(`Activity ID ${params.activityid} not found.`);
            }

            const minvalue = activityRows[0].minvalue;
            let calculatedExp = 0;
            if (minvalue && minvalue > 0) {
                calculatedExp = (params.activityvalue / minvalue) * 250;
            }

            calculatedExp = Math.round(calculatedExp);

            const sql = 'insert into activitylogs(`activityid`,`activityvalue`,`activityexp`,`activitydatetime`,`activitydate`,`activitynote`,`userid`) values(?,?,?,?,?,?,?)';


            const [result] = await pool.execute<ResultSetHeader>(sql, [
                params.activityid,
                params.activityvalue,
                calculatedExp,
                params.activitydatetime,
                params.activitydatetime.split(" ")[0],
                params.activitynote,
                params.userid
            ]);

            return {
                id: result.insertId,
                activityid: params.activityid,
                activityvalue: params.activityvalue,
                activityexp: calculatedExp,
                activitydatetime: params.activitydatetime,
                activitydate: params.activitydatetime,
                activitynote: params.activitynote
            };
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findById = async (id: number, userid: number): Promise<ActivityLogsDbo | null> => {
        try {
            const sql = 'select * from `activitylogs` where `id` = ? and `userid` = ?';
            const [rows] = await pool.query(sql, [id, userid]) as any;

            return rows[0] || null;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    findAll = async (query: ActivityLogsQueryDto): Promise<ActivityLogsDbo[]> => {
        try {
            let sql = 'SELECT * FROM `activitylogs` WHERE userid = ?';
            const params: any[] = [];

            params.push(query.userid);

            if (query.activityid) {
                sql += ' AND `activityid` = ?'
                params.push(`${query.activityid}`);
            }

            sql += ' order by id desc'

            const [rows] = await pool.query(sql, params) as any;

            return rows;
        }
        catch (err) {
            const error = err as Error;
            console.error(`Database Error : ${error.message}`);
            throw error;
        }
    }

    update = async (params: ActivityLogsUpdateDto): Promise<ActivityLogsDbo> => {
        try {
            let calculatedExp: number | null = null;

            if (params.activityvalue) {
                const [logRows] = await pool.execute<any[]>('SELECT activityid FROM activitylogs WHERE id = ? AND userid = ?', [params.id, params.userid]);

                if (logRows.length === 0) {
                    throw new Error("Güncellenecek kayıt bulunamadı.");
                }

                const currentActivityId = logRows[0].activityid;

                const [actRows] = await pool.execute<any[]>('SELECT minvalue FROM activities WHERE id = ?', [currentActivityId]);

                if (actRows.length > 0) {
                    const minvalue = actRows[0].minvalue;
                    if (minvalue && minvalue > 0) {
                        calculatedExp = Math.round((params.activityvalue / minvalue) * 250);
                    }
                }
            }

            let query = 'UPDATE `activitylogs` SET ';
            const updates: string[] = [];
            const queryparams: any[] = [];

            if (params.activityvalue) {
                updates.push('`activityvalue` = ?');
                queryparams.push(params.activityvalue);

                if (calculatedExp !== null) {
                    updates.push('`activityexp` = ?');
                    queryparams.push(calculatedExp);
                }
            }

            if (params.activitydatetime) {
                updates.push('`activitydatetime` = ?');
                queryparams.push(params.activitydatetime);

                updates.push('`activitydate` = ?');
                queryparams.push(params.activitydatetime.split(" ")[0]);
            }

            if (params.activitynote) {
                updates.push('`activitynote` = ?');
                queryparams.push(params.activitynote);
            }
            if (updates.length === 0) {
                return await this.findById(params.id, params.userid) as ActivityLogsDbo;
            }

            query += updates.join(', ');
            query += ' WHERE `id` = ? AND `userid` = ?';

            queryparams.push(params.id);
            queryparams.push(params.userid);

            await pool.execute<ResultSetHeader>(query, queryparams);

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
            const query = 'DELETE FROM `activitylogs` where `id` = ? and `userid` = ?';
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