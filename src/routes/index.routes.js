import { Router } from 'express';
import { ping } from '../controllers/index.controller.js';

const router = Router();

// Test de mysql2/promise
router.get('/ping', ping);

export default router;