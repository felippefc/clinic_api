import { Router } from "express";
import {
  createPatient,
  listPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/PatientController";

const router = Router();

router.post("/patients", createPatient);
router.get("/patients", listPatients);
router.get("/patients/:id", getPatient);
router.put("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

export default router;

