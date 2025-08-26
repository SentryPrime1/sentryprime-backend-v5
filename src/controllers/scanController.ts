
import { Request, Response } from 'express';
import { createScan, getScansByUser } from '../services/scanService';

export async function handleCreateScan(req: Request, res: Response) {
  const scan = await createScan(req.body);
  res.status(201).json(scan);
}

export async function handleGetScansByUser(req: Request, res: Response) {
  const scans = await getScansByUser(req.params.id);
  res.json(scans);
}
