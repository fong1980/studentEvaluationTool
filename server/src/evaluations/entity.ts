//entity evaluations

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";
import User from "../users/entity";

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  color: string;

  @Column("text", { nullable: false })
  date: string;

  @ManyToOne(_ => Student, student => student.evaluations, {
    onDelete: "CASCADE"
  })
  student: Student;

  @ManyToOne(_ => User, user => user.evaluations)
  user: User;
}

// @ManyToOne(_ => Batch, batch => batch.students)
// batch: Batch;

//https://github.com/typeorm/typeorm/issues/1460
