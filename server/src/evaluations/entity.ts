import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  color: string;

  @Column("text", { nullable: false })
  date: string;

  @ManyToOne(_ => Student, student => student.evaluations)
  student: Student;
}

// @ManyToOne(_ => Batch, batch => batch.students)
// batch: Batch;
