import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Appointment } from '../entities/Appointment';
import { Patient } from '../entities/Patient';
import { Doctor } from '../entities/Doctor';
import { AppError } from '../errors/AppError';

// CREATE Appointment
export async function createAppointment(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Appointment);
    const patientRepo = AppDataSource.getRepository(Patient);
    const doctorRepo = AppDataSource.getRepository(Doctor);

    const { patientId, doctorId, date } = req.body;

    if (!patientId || !doctorId || !date) {
      throw new AppError("Missing patientId, doctorId or date", 400);
    }

    const patient = await patientRepo.findOneBy({ id: patientId });
    if (!patient) throw new AppError("Patient not found", 404);

    const doctor = await doctorRepo.findOneBy({ id: doctorId });
    if (!doctor) throw new AppError("Doctor not found", 404);

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      throw new AppError("Invalid date format", 400);
    }

    // ✅ Validação: data no futuro
    const now = new Date();
    if (appointmentDate < now) {
      throw new AppError("Cannot schedule an appointment in the past", 400);
    }

    // ✅ Validação: horário entre 08:00 e 18:00
    const hour = appointmentDate.getHours();
    if (hour < 8 || hour >= 18) {
      throw new AppError("Appointment must be between 08:00 and 18:00", 400);
    }

    // ✅ Conflito: horário já ocupado pelo médico
    const conflictingDoctorAppointment = await repo.findOne({
      where: {
        doctor: { id: doctorId },
        date: appointmentDate,
      },
      relations: ["doctor"],
    });

    if (conflictingDoctorAppointment) {
      throw new AppError("Já existe um agendamento para este médico neste horário.", 409);
    }

    // ✅ Conflito: horário já ocupado pelo paciente
    const conflictingPatientAppointment = await repo.findOne({
      where: {
        patient: { id: patientId },
        date: appointmentDate,
      },
      relations: ["patient"],
    });

    if (conflictingPatientAppointment) {
      throw new AppError("Paciente já possui um agendamento neste horário.", 409);
    }

    // ✅ Criar agendamento
    const appointment = repo.create({
      patient,
      doctor,
      date: appointmentDate,
    });

    await repo.save(appointment);

    return res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
}




// LIST ALL appointments (optional filters by doctorId or patientId)
export async function listAppointments(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Appointment);
    const { doctorId, patientId } = req.query;

    let where = {};
    if (doctorId) where = { ...where, doctor: { id: Number(doctorId) } };
    if (patientId) where = { ...where, patient: { id: Number(patientId) } };

    const appointments = await repo.find({
      where,
      relations: ['patient', 'doctor'],
      order: { date: 'ASC' },
    });

    return res.json(appointments);
  } catch (error) {
    next(error);
  }
}

// GET appointment by id
export async function getAppointment(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Appointment);
    const { id } = req.params;

    const appointment = await repo.findOne({
      where: { id: Number(id) },
      relations: ['patient', 'doctor'],
    });

    if (!appointment) throw new AppError("Appointment not found", 404);

    return res.json(appointment);
  } catch (error) {
    next(error);
  }
}

// UPDATE appointment
export async function updateAppointment(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const repo = AppDataSource.getRepository(Appointment);
    const patientRepo = AppDataSource.getRepository(Patient);
    const doctorRepo = AppDataSource.getRepository(Doctor);
    const { id } = req.params;
    const { patientId, doctorId, date } = req.body;

    const appointment = await repo.findOneBy({ id: Number(id) });
    if (!appointment) throw new AppError("Appointment not found", 404);

    if (patientId) {
      const patient = await patientRepo.findOneBy({ id: patientId });
      if (!patient) throw new AppError("Patient not found", 404);
      appointment.patient = patient;
    }

    if (doctorId) {
      const doctor = await doctorRepo.findOneBy({ id: doctorId });
      if (!doctor) throw new AppError("Doctor not found", 404);
      appointment.doctor = doctor;
    }

    if (date) {
      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate.getTime())) {
        throw new AppError("Invalid date format", 400);
      }
      appointment.date = appointmentDate;
    }

    await repo.save(appointment);
    return res.json(appointment);
  } catch (error) {
    next(error);
  }
}

// DELETE appointment
export async function deleteAppointment(req: Request, res: Response, next: NextFunction) : Promise<any>{
  try {
    const repo = AppDataSource.getRepository(Appointment);
    const { id } = req.params;

    const appointment = await repo.findOneBy({ id: Number(id) });
    if (!appointment) throw new AppError("Appointment not found", 404);

    await repo.remove(appointment);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
