
import prisma from '../lib/prisma';

export function createScan(data: { userId: string; url: string; result: any }) {
  return prisma.scan.create({ data });
}

export function getScansByUser(userId: string) {
  return prisma.scan.findMany({ where: { userId } });
}
