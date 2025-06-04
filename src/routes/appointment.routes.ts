import { Router } from "express";
import {
  createAppointment,
  listAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  
} from "../controllers/AppointmentController";

const router = Router();

router.post("/appointments", createAppointment);
router.get("/appointments", listAppointments);
router.get("/appointments/:id", getAppointment);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);


export default router;
