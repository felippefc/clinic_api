import { IsNotEmpty, IsInt, IsDateString } from "class-validator";

export class CreateAppointmentDTO {
  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @IsNotEmpty()
  @IsInt()
  patientId!: number;

  @IsNotEmpty()
  @IsInt()
  doctorId!: number;
}
