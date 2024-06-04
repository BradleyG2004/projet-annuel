import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  amount: number;

  @Column()
  employeeName: string;

  @CreateDateColumn({ type: "datetime"})
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(id: number, amount: number, employeeName: string, createdAt: Date, updatedAt: Date){
    this.id = id;
    this.amount = amount;
    this.employeeName = employeeName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
