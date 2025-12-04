import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

router.get('/health', async (req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'DOWN',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: (error as Error).message
    });
  }
});

export default router;