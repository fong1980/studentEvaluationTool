// src/games/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import Student from "../students/entity";

@Entity()
export default class Batch extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: false })
  startdate: string;

  @Column("text", { nullable: false })
  enddate: string;

  @OneToMany(_ => Student, student => student.batch, { eager: true })
  students: Student[];
}

// Game
// @OneToMany(_ => Player, player => player.game, { eager: true })
// players: Player[];

// player
// @ManyToOne(_ => Game, game => game.players)
// game: Game;
