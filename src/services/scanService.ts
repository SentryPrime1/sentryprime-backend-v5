// src/services/scanService.ts

import prisma from '../lib/prisma';

type CreateScanInput = {
  userId: string;
  url: string;
  status: string;
  issues: any;
};

export async function createScan(data: CreateScanInput) {
  return await prisma.scanResult.create({ data });
}

export async function getScansByUser(userId: string) {
  return await prisma.scanResult.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
