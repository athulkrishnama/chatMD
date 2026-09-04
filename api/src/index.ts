import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import wrapRoutes from './routes/wrapRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatwrapped';

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Reduced limit since we no longer send raw messages
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'ChatWrapped API is running' });
});

// Mount the async routes
app.use('/api/wraps', wrapRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('📦 Connected to MongoDB');
    app.listen(port, () => {
      console.log(`⚡️[ChatWrapped API]: Running at http://localhost:${port}`);
      if (!process.env.OPENROUTER_API_KEY) {
        console.warn('⚠️  OPENROUTER_API_KEY not set. AI analysis will fail. Add it to api/.env');
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

