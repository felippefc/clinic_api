import { Router } from "express";
import {
  createAppointment,
  listAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  listAppointmentsByDoctor,
  listAppointmentsByPatient
} from "../controllers/AppointmentController";

const router = Router();

router.post("/appointments", createAppointment);
router.get("/appointments", listAppointments);
router.get("/appointments/:id", getAppointment);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);
router.get("/appointments/doctor/:doctorId", listAppointmentsByDoctor);
router.get("/appointments/patient/:patientId", listAppointmentsByPatient);

export default router;
