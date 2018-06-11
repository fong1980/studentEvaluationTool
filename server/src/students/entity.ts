//students/entity

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Batch from "../batchs/entity";
import Evaluation from "../evaluations/entity";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  firstName: string;

  //@IsIn('text',{nullable:false})
  @Column("text", { nullable: false })
  lastName: string;

  @Column("text", { nullable: false })
  enddate: string;

  @Column("text", { nullable: false })
  photo: string;

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch;

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, { eager: true })
  evaluations: Evaluation[];
}
