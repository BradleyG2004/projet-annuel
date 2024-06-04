import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Subject } from "./subject";
import { User } from "./user";

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({length: 1000})
  content: string;

  @CreateDateColumn({ type: "datetime"})
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime"})
  updatedAt: Date;

  @ManyToOne(() => Subject, subject => subject.responses)
  subject: Subject;

  @ManyToOne(() => User, user => user.responses)
  user: User;

  constructor(id: number, user_id: number, content: string, createdAt: Date, updatedAt: Date, subject: Subject, user: User){
    this.id = id;
    this.user_id = user_id
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.subject = subject;
    this.user = user;
  }
}
