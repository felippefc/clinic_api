import express from 'express';
import { AppDataSource } from './data-source';
import patientRoutes from "./routes/patient.routes";
import doctorRoutes from "./routes/doctor.routes";
import appointmentRoutes from "./routes/appointment.routes";
import { errorMiddleware } from './errors/errorMiddleware';


const app = express();
app.use(express.json());
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(appointmentRoutes);
app.use(errorMiddleware);


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
