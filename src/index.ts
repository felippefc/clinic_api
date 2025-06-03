import express from 'express';
import { AppDataSource } from './data-source';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
