import { Router } from "express";
import {
  createDoctor,
  listDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/DoctorController";

const router = Router();

router.post("/doctors", createDoctor);
router.get("/doctors", listDoctors);
router.get("/doctors/:id", getDoctor);
router.put("/doctors/:id", updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

export default router;
