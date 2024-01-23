import { MentoringInvite } from "../../src/domain/core/entities/mentoringInvite";
import { IMentoringInviteRepository } from "../../src/domain/core/repositories/Mentoring/Invite/IMentoringInvite-repository";


export class InMemoryMentoringInviteRepository implements IMentoringInviteRepository {


    public MentoringInvites: MentoringInvite[] = []


    async findById(id: string): Promise<MentoringInvite | null> {
        const MentoringInvites = await this.MentoringInvites.find(MentoringInvites => MentoringInvites.id == id)

        if (MentoringInvites) {
            return MentoringInvites
        }

        return null
    }

    async findOne(filter: Partial<MentoringInvite>): Promise<MentoringInvite | null> {
        const filtred = await this.MentoringInvites.find(MentoringInvite => MentoringInvite.id == filter.id && MentoringInvite.idMentor == filter.idMentor && MentoringInvite.idStudent == filter.idStudent)
        if (filtred) return filtred;
        return null
    }


    async findOneAndUpdate(filter: Partial<MentoringInvite>, updatePartial: Partial<MentoringInvite>): Promise<MentoringInvite | null> {

        const MentoringInvites = await this.MentoringInvites.find(MentoringInvites => MentoringInvites.idStudent == filter.idStudent && MentoringInvites.status == filter.status)

        if (MentoringInvites) {
            if (updatePartial.status) {
                MentoringInvites.status = updatePartial.status;
            }

            if (updatePartial.updateAt) {
                MentoringInvites.updateAt = updatePartial.updateAt
            }

            return MentoringInvites
        }

        return null
    }

    save(entity: MentoringInvite): MentoringInvite {

        if (entity) {
            this.MentoringInvites.push(entity)
        }

        return entity
    }


    refuseAllPeddingInvites(filterData: Partial<MentoringInvite>, updateData: Partial<MentoringInvite>): void {
        const MentoringInvites: MentoringInvite[] = []

        this.MentoringInvites.forEach(invite => {
            if (invite.idStudent == filterData.idStudent && invite.status == filterData.status) {
                MentoringInvites.push(invite)
            }
        })

        MentoringInvites.forEach(invite => {
            invite.status == "REFUSED", 
            invite.updateAt == new Date().toLocaleDateString()
        })
    }

    async listByMentorId(idMentor: string): Promise<MentoringInvite[] | null> {

        const invites: MentoringInvite[] = []

        this.MentoringInvites.forEach(invite => {
            if (invite.idMentor == idMentor) {
                invites.push(invite)
            }
        })

        return invites

    }

    async findByStudentId(idStudent: string): Promise<MentoringInvite | null> {
        const invite = await this.MentoringInvites.find(invite => invite.idStudent == idStudent)

        if (invite) return invite

        return null
    }



    acceptInvite: (newStatus: Partial<MentoringInvite>) => Promise<MentoringInvite>;







    findByEmail: (email: string) => Promise<MentoringInvite | null>;
    listByStudentId: (idMentor: string) => Promise<MentoringInvite[] | null>;
    update: (entity: Partial<MentoringInvite>) => Promise<MentoringInvite | null>;



}