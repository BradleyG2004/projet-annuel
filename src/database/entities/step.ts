import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projet } from "./projet";
import { Mission } from "./mission";

@Entity({ name: "step" })
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: string;

    @Column()
    description: string;

    @Column({ type: "datetime" })
    starting: Date;

    @Column({ type: "datetime" })
    ending: Date;

    @ManyToOne(() => Projet, (projet) => projet.steps)
    projet: Projet;

    @OneToMany(() => Mission, (mission) => mission.steps)
    missions: Mission[] = [];

    constructor(id: number, state: string, description: string, starting: Date, ending: Date, projet: Projet) {
        this.id = id;
        this.state = state;
        this.description = description;
        this.starting = starting;
        this.ending = ending;
        this.projet = projet;
    }
}