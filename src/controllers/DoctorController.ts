import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entities/Doctor";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDoctorDTO } from "../dtos/CreateDoctorDTO";

// CREATE
export async function createDoctor(req: Request, res: Response): Promise<any> {
  const repo = AppDataSource.getRepository(Doctor);
  const dto = plainToInstance(CreateDoctorDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) return res.status(400).json({ errors });

  const exists = await repo.findOneBy({ email: dto.email });
  if (exists) return res.status(400).json({ message: "Doctor already exists" });

  const doctor = repo.create(dto);
  await repo.save(doctor);
  return res.status(201).json(doctor);
}

// READ ALL
export async function listDoctors(req: Request, res: Response): Promise<any> {
  const doctors = await AppDataSource.getRepository(Doctor).find();
  return res.json(doctors);
}

// READ ONE
export async function getDoctor(req: Request, res: Response): Promise<any> {
  const doctor = await AppDataSource.getRepository(Doctor).findOneBy({ id:Number( req.params.id) });
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  return res.json(doctor);
}

// UPDATE
export async function updateDoctor(req: Request, res: Response): Promise<any> {
  const repo = AppDataSource.getRepository(Doctor);
  const doctor = await repo.findOneBy({ id: Number(req.params.id) });
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  const dto = plainToInstance(CreateDoctorDTO, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  repo.merge(doctor, dto);
  await repo.save(doctor);
  return res.json(doctor);
}

// DELETE
export async function deleteDoctor(req: Request, res: Response): Promise<any> {
  const repo = AppDataSource.getRepository(Doctor);
  const doctor = await repo.findOneBy({ id: Number(req.params.id) });
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  await repo.remove(doctor);
  return res.status(204).send();
}
