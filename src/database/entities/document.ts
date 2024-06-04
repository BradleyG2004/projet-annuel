import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Document{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn({ type: "datetime"})
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime"})
  updatedAt: Date;

  constructor(id: number, title: string, content: string, createdAt: Date, updatedAt: Date){
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
