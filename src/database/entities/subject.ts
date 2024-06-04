import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { Vote } from "./vote";
import { Response } from "./response";

@Entity()
export class Subject{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({type: "datetime"})
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime"})
  updatedAt: Date;

  @OneToMany(() => Vote, vote => vote.subject)
  votes: Vote[];

  @OneToMany(() => Response, response => response.subject)
  responses: Response[];

  constructor(id: number, title: string, description: string, createdAt: Date, updatedAt: Date, votes: Vote[], responses: Response[]){
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.votes = votes;
    this.responses = responses
  }
}
