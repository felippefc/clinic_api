import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Doctor {
   @PrimaryGeneratedColumn() // 
  id!: number;
  
  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  specialty!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
