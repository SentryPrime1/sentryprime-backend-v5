
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { healthRouter } from './routes/health';
import { scanRouter } from './routes/scan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/scan', scanRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
