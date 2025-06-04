import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Appointment } from "../entities/Appointment";
import { Patient } from "../entities/Patient";
import { Doctor } from "../entities/Doctor";
import { CreateAppointmentDTO } from "../dtos/CreateAppointmentDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

// CREATE
export async function createAppointment(req: Request, res: Response): Promise<any> {
  const dto = plainToInstance(CreateAppointmentDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) return res.status(400).json({ errors });

  const patientRepo = AppDataSource.getRepository(Patient);
  const doctorRepo = AppDataSource.getRepository(Doctor);
  const appointmentRepo = AppDataSource.getRepository(Appointment);

  const patient = await patientRepo.findOneBy({ id: dto.patientId });
  const doctor = await doctorRepo.findOneBy({ id: dto.doctorId });

  if (!patient || !doctor) {
    return res.status(404).json({ message: "Patient or doctor not found" });
  }

  const appointment = appointmentRepo.create({
    date: new Date(dto.date),
    patient,
    doctor,
  });

  await appointmentRepo.save(appointment);

  return res.status(201).json(appointment);
}

// READ ALL
export async function listAppointments(req: Request, res: Response): Promise<any> {
  const appointments = await AppDataSource.getRepository(Appointment).find();
  return res.json(appointments);
}

// READ ONE
export async function getAppointment(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const appointment = await AppDataSource.getRepository(Appointment).findOneBy({ id: parseInt(id) });

  if (!appointment) return res.status(404).json({ message: "Appointment not found" });

  return res.json(appointment);
}

// UPDATE
export async function updateAppointment(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const repo = AppDataSource.getRepository(Appointment);
  const appointment = await repo.findOneBy({ id: parseInt(id) });

  if (!appointment) return res.status(404).json({ message: "Appointment not found" });

  const dto = plainToInstance(CreateAppointmentDTO, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  const patient = await AppDataSource.getRepository(Patient).findOneBy({ id: dto.patientId });
  const doctor = await AppDataSource.getRepository(Doctor).findOneBy({ id: dto.doctorId });

  if (!patient || !doctor) return res.status(404).json({ message: "Patient or doctor not found" });

  repo.merge(appointment, {
    date: new Date(dto.date),
    patient,
    doctor,
  });

  await repo.save(appointment);

  return res.json(appointment);
}

// DELETE
export async function deleteAppointment(req: Request, res: Response): Promise<any> {
  const { id } = req.params;
  const repo = AppDataSource.getRepository(Appointment);
  const appointment = await repo.findOneBy({ id: parseInt(id) });

  if (!appointment) return res.status(404).json({ message: "Appointment not found" });

  await repo.remove(appointment);

  return res.status(204).send();
}
