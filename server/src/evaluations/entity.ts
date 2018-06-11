import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

@Entity()
export default class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  color: string;

  @Column("text", { nullable: false })
  date: string;
}

// \*\* a function that returns the number of changes between boards

// ```
// const moves = (board1, board2) =>
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length
// ```
