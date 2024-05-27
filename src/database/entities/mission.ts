import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evenement } from "./evenement";
import { Step } from "./step";

@Entity({ name: "mission" })
export class Mission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    starting: Date;

    @Column()
    ending: Date;

    @Column()
    description: string;

    @OneToMany(() => Evenement, (evenement) => evenement.mission)
    evenements!: Evenement[];
    
    @OneToMany(() => Step, (step) => step.missions)
    steps: Step[];

    constructor(id: number, starting: Date, ending: Date, description: string,steps:Step[]) {
        this.id = id;
        this.starting = starting;
        this.ending = ending;
        this.description = description;
        this.steps=steps
    }
}
