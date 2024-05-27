import { DataSource } from "typeorm";
import { Evenement } from "../database/entities/evenement";
import { Mission } from "../database/entities/mission";

export interface ListEvenementFilter {
    limit: number;
    page: number;
}

export interface UpdateEvenementParams {
    type?: string;
    location?: string;
    description?: string;
    quorum?: number;
    starting?: Date;
    ending?: Date;
    missionId?: number;
}

export class EvenementUsecase {
    constructor(private readonly db: DataSource) { }

    async listEvenements(filter: ListEvenementFilter): Promise<{ evenements: Evenement[]; totalCount: number; }> {
        const query = this.db.createQueryBuilder(Evenement, 'evenement')
            .skip((filter.page - 1) * filter.limit)
            .take(filter.limit);

        const [evenements, totalCount] = await query.getManyAndCount();
        return {
            evenements,
            totalCount
        };
    }

    async createEvenement(type: string, location: string, description: string, quorum: number, starting: Date, ending: Date, missionId: number): Promise<Evenement> {
        const missionRepo = this.db.getRepository(Mission);
        const mission = await missionRepo.findOne({ where: { id: missionId } });
        if (!mission) {
            throw new Error('Mission not found');
        }

        const evenementRepo = this.db.getRepository(Evenement);
        const newEvenement = evenementRepo.create({ type, location, description, quorum, starting, ending, mission });
        await evenementRepo.save(newEvenement);
        return newEvenement;
    }

    async getEvenement(id: number): Promise<Evenement | null> {
        const repo = this.db.getRepository(Evenement);
        const evenementFound = await repo.findOne({ where: { id } });
        return evenementFound || null;
    }

    async updateEvenement(id: number, params: UpdateEvenementParams): Promise<Evenement | null> {
        const repo = this.db.getRepository(Evenement);
        const evenementFound = await repo.findOne({ where: { id } });
        if (!evenementFound) return null;

        if (params.type) evenementFound.type = params.type;
        if (params.location) evenementFound.location = params.location;
        if (params.description) evenementFound.description = params.description;
        if (params.quorum) evenementFound.quorum = params.quorum;
        if (params.starting) evenementFound.starting = params.starting;
        if (params.ending) evenementFound.ending = params.ending;
        if (params.missionId) {
            const missionRepo = this.db.getRepository(Mission);
            const mission = await missionRepo.findOne({ where: { id: params.missionId } });
            if (mission) {
                evenementFound.mission = mission;
            }
        }

        const updatedEvenement = await repo.save(evenementFound);
        return updatedEvenement;
    }

    async deleteEvenement(id: number): Promise<boolean> {
        const repo = this.db.getRepository(Evenement);
        const evenementFound = await repo.findOne({ where: { id } });
        if (!evenementFound) return false;

        await repo.remove(evenementFound);
        return true;
    }
}
