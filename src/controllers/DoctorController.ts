import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Doctor } from "../entities/Doctor";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateDoctorDTO } from "../dtos/CreateDoctorDTO";
import { AppError } from "../errors/AppError";

// CREATE
export async function createDoctor(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Doctor);
    const dto = plainToInstance(CreateDoctorDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints || {})).flat();
      throw new AppError(messages.join(", "), 400);
    }

    const exists = await repo.findOneBy({ email: dto.email });
    if (exists) throw new AppError("Doctor already exists", 400);

    const doctor = repo.create(dto);
    await repo.save(doctor);

    return res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
}

// READ ALL
export async function listDoctors(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const doctors = await AppDataSource.getRepository(Doctor).find();
    return res.json(doctors);
  } catch (error) {
    next(error);
  }
}

// READ ONE
export async function getDoctor(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const doctor = await AppDataSource.getRepository(Doctor).findOneBy({ id: Number(req.params.id) });
    if (!doctor) throw new AppError("Doctor not found", 404);
    return res.json(doctor);
  } catch (error) {
    next(error);
  }
}

// UPDATE
export async function updateDoctor(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Doctor);
    const doctor = await repo.findOneBy({ id: Number(req.params.id) });
    if (!doctor) throw new AppError("Doctor not found", 404);

    const dto = plainToInstance(CreateDoctorDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints || {})).flat();
      throw new AppError(messages.join(", "), 400);
    }

    repo.merge(doctor, dto);
    await repo.save(doctor);

    return res.json(doctor);
  } catch (error) {
    next(error);
  }
}

// DELETE
export async function deleteDoctor(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Doctor);
    const doctor = await repo.findOneBy({ id: Number(req.params.id) });
    if (!doctor) throw new AppError("Doctor not found", 404);

    await repo.remove(doctor);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
