import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Batch from "../batchs/entity";

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
}

// \*\* a function that returns the number of changes between boards

// ```
// const moves = (board1, board2) =>
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length
// ```
