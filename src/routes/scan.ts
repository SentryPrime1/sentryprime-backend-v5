
import { Router } from 'express';
import { handleCreateScan, handleGetScansByUser } from '../controllers/scanController';

export const scanRouter = Router();

scanRouter.post('/', handleCreateScan);
scanRouter.get('/user/:id', handleGetScansByUser);
