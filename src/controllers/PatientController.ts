import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Patient } from "../entities/Patient";
import { CreatePatientDTO } from "../dtos/CreatePatientDTO";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

// CREATE
export async function createPatient(req: Request, res: Response) : Promise<any>{
  const repo = AppDataSource.getRepository(Patient);

  const dto = plainToInstance(CreatePatientDTO, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const exists = await repo.findOneBy({ email: dto.email });
  if (exists) {
    return res.status(400).json({ message: "Patient already exists" });
  }

  const patient = repo.create(dto);
  await repo.save(patient);

  return res.status(201).json(patient);
}

// READ ALL
export async function listPatients(req: Request, res: Response) : Promise<any> {
  const repo = AppDataSource.getRepository(Patient);
  const patients = await repo.find();
  return res.json(patients);
}

// READ ONE
export async function getPatient(req: Request, res: Response) : Promise<any> {
  const repo = AppDataSource.getRepository(Patient);
  const { id } = req.params;

  const patient = await repo.findOneBy({ id });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  return res.json(patient);
}

// UPDATE
export async function updatePatient(req: Request, res: Response) : Promise<any> {
  const repo = AppDataSource.getRepository(Patient);
  const { id } = req.params;

  const patient = await repo.findOneBy({ id });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const dto = plainToInstance(CreatePatientDTO, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  repo.merge(patient, dto);
  await repo.save(patient);

  return res.json(patient);
}

// DELETE
export async function deletePatient(req: Request, res: Response) : Promise<any> {
  const repo = AppDataSource.getRepository(Patient);
  const { id } = req.params;

  const patient = await repo.findOneBy({ id });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  await repo.remove(patient);
  return res.status(204).send();
}
