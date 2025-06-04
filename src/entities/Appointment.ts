import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("timestamp")
  date!: Date;

  @ManyToOne(() => Patient, { eager: true })
  patient!: Patient;

  @ManyToOne(() => Doctor, { eager: true })
  doctor!: Doctor;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
