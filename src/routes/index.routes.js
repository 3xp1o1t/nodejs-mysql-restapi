import { Router } from 'express';
import {pool} from '../db.js';

const router = Router();

// Test de mysql2/promise
router.get('/ping', async (req, res) => {
  const [result] = await pool.query('SELECT 1 + 1 AS pong');

  res.json(result);
});

export default router;