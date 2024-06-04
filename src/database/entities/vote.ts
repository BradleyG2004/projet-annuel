import{Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { Subject } from "./subject";
import { User } from "./user";

@Entity()
export class Vote{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 10})
  vote: string;

  @CreateDateColumn({type: "datetime"})
  createdAt: Date;

  @ManyToOne(()=> Subject, subject => subject.votes)
  subject: Subject;

  @ManyToOne(() => User, user => user.votes)
  user: User;

  constructor(id: number, user_id: number, vote: string, createdAt: Date, subject: Subject, user: User){
    this.id = id;
    this.user_id = user_id;
    this.vote = vote;
    this.createdAt = createdAt;
    this.subject = subject;
    this.user = user;
  }
}
