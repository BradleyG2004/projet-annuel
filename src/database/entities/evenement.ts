import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mission } from "./mission";

@Entity({ name: "evenement" })
export class Evenement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    quorum: number;

    @Column({ type: "datetime" })
    starting: Date;

    @Column({ type: "datetime" })
    ending: Date;

    @ManyToOne(() => Mission, (mission) => mission.evenements)
    mission: Mission;

    constructor(id: number, type: string, location: string, description: string, quorum: number, starting: Date, ending: Date, mission: Mission) {
        this.id = id;
        this.type = type;
        this.location = location;
        this.description = description;
        this.quorum = quorum;
        this.starting = starting;
        this.ending = ending;
        this.mission = mission;
    }
}
