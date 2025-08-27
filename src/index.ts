import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import scanRoutes from './routes/scanRoutes';
import { healthRoutes } from './routes/health';
import { errorHandler } from './middleware/errorHandler';

// Load .env variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Allowed origins (update this as needed)
const allowedOrigins = [
  'https://ubiquitous-space-computing-machine-r74vxw9g57rfpgq-3000.app.github.dev',
  'http://localhost:3000'
];

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // ← added Authorization
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests globally
app.options('*', cors(corsOptions));

// Debug logging middleware (optional)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// JSON body parser
app.use(express.json());

// Routes
app.use('/api/scans', scanRoutes);
app.use('/api/health', healthRoutes);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
