import { z } from 'zod';

export const scanSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  url: z.string().url('Must be a valid URL'),
  status: z.enum(['pending', 'completed', 'error']),
  issues: z.array(z.string()),
});
