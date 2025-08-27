import { requireApiKey } from '../middleware/auth';
import express from 'express';
import { handleCreateScan, handleGetScansByUser } from '../controllers/scanController';
import { validate } from '../middleware/validate';
import { scanSchema } from './schemas/scanSchema';

const router = express.Router();

// POST /api/scans — require API key and validate body
router.post('/', requireApiKey, validate(scanSchema), handleCreateScan);

// GET /api/scans/:userId — no validation needed here
router.get('/:userId', handleGetScansByUser);

export default router;
