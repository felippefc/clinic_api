import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Patient } from "../entities/Patient";
import { CreatePatientDTO } from "../dtos/CreatePatientDTO";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AppError } from "../errors/AppError";

// CREATE
export async function createPatient(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Patient);
    const dto = plainToInstance(CreatePatientDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints || {})).flat();
      throw new AppError(messages.join(", "), 400);
    }

    const exists = await repo.findOneBy({ email: dto.email });
    if (exists) throw new AppError("Patient already exists", 400);

    const patient = repo.create(dto);
    await repo.save(patient);

    return res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
}

// READ ALL
export async function listPatients(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Patient);
    const patients = await repo.find();
    return res.json(patients);
  } catch (error) {
    next(error);
  }
}

// READ ONE
export async function getPatient(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Patient);
     const  id  = Number(req.params.id);

    const patient = await repo.findOneBy({ id });
    if (!patient) throw new AppError("Patient not found", 404);

    return res.json(patient);
  } catch (error) {
    next(error);
  }
}

// UPDATE
export async function updatePatient(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Patient);
    const  id  = Number(req.params.id);

    const patient = await repo.findOneBy({ id });
    if (!patient) throw new AppError("Patient not found", 404);

    const dto = plainToInstance(CreatePatientDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints || {})).flat();
      throw new AppError(messages.join(", "), 400);
    }

    repo.merge(patient, dto);
    await repo.save(patient);

    return res.json(patient);
  } catch (error) {
    next(error);
  }
}

// DELETE
export async function deletePatient(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Patient);
    const  id  = Number(req.params.id);

    const patient = await repo.findOneBy({ id });
    if (!patient) throw new AppError("Patient not found", 404);

    await repo.remove(patient);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
