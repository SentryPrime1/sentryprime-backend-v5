import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { scanWebsiteForADA } from '../services/adaScanner';

// Controller: Run scan + save results
export const handleCreateScan = async (req: Request, res: Response) => {
  try {
    console.log('🔥 Incoming body:', req.body);

    const { userId, url, status, issues } = req.body;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid userId' });
    }

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid url' });
    }

    const validStatuses = ['pending', 'completed', 'error'];
    const safeStatus = status && validStatuses.includes(status) ? status : 'completed';

    // Run scan (will always return violations or empty)
    const scanResults = await scanWebsiteForADA(url);
    const violations = Array.isArray(issues)
      ? issues
      : Array.isArray(scanResults?.violations)
      ? scanResults.violations
      : [];

    const newScan = await prisma.scanResult.create({
      data: {
        userId,
        url,
        status: safeStatus,
        issues: violations,
      },
    });

    return res.status(201).json({
      message: '✅ ADA scan completed and saved',
      data: newScan,
    });
  } catch (error: any) {
    console.error('❌ Error in handleCreateScan:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Controller: Get all scans by userId
export const handleGetScansByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid userId' });
    }

    const scans = await prisma.scanResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ scans });
  } catch (error: any) {
    console.error('❌ Error fetching scans:', error.message);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Export
export {
  handleCreateScan as createScan,
  handleGetScansByUser as getScansByUser,
};
