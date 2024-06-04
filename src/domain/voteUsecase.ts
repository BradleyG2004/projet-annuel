import { DataSource } from "typeorm";
import { Vote } from "../database/entities/vote";

export interface ListVotesFilter {
    limit: number;
    page: number;
}

export interface UpdateVoteParams {
    vote?: string;
}

export class VoteUsecase {
    constructor(private readonly db: DataSource) { }

    async listVotes(filter: ListVotesFilter): Promise<{ votes: Vote[]; totalCount: number; }> {
        const query = this.db.createQueryBuilder(Vote, 'vote')
            .skip((filter.page - 1) * filter.limit)
            .take(filter.limit);

        const [votes, totalCount] = await query.getManyAndCount();
        return {
            votes,
            totalCount
        };
    }

    async createVote(vote: string, userId: number, subjectId: number): Promise<Vote> {
        const subjectRepo = this.db.getRepository(Subject);
        const subject = await subjectRepo.findOne({ where: { id: subjectId } });
        if (!subject) {
            throw new Error('Subject not found');
        }

        const userRepo = this.db.getRepository(User);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const voteRepo = this.db.getRepository(Vote);
        const newVote = voteRepo.create({ vote, subject, user });
        await voteRepo.save(newVote);
        return newVote;
    }

    async getVote(id: number): Promise<Vote | null> {
        const repo = this.db.getRepository(Vote);
        const voteFound = await repo.findOne({ where: { id } });
        return voteFound || null;
    }

    async updateVote(id: number, params: UpdateVoteParams): Promise<Vote | null> {
        const repo = this.db.getRepository(Vote);
        const voteFound = await repo.findOne({ where: { id } });
        if (!voteFound) return null;

        if (params.vote) voteFound.vote = params.vote;

        const updatedVote = await repo.save(voteFound);
        return updatedVote;
    }

    async deleteVote(id: number): Promise<boolean> {
        const repo = this.db.getRepository(Vote);
        const voteFound = await repo.findOne({ where: { id } });
        if (!voteFound) return false;

        await repo.remove(voteFound);
        return true;
    }
}
