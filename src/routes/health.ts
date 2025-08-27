import express from 'express';

export const healthRoutes = express.Router();

healthRoutes.get('/', (req, res) => {
  res.json({ message: '✅ API is healthy' });
});
