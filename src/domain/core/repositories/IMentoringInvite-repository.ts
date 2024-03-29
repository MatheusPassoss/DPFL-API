import { IRepository } from "../shared-global/IRepository";
import { MentoringInvite } from "../entities/mentoringInvite";




export interface IMentoringInviteRepository extends IRepository<MentoringInvite> {
    findByMentorId: (idMentor: string) => Promise<MentoringInvite>
    listByMentorId: (idMentor: string) => Promise<MentoringInvite[] | null>
    listByStudentId: (idMentor: string) => Promise<MentoringInvite[] | null>
    findByStudentId: (idStudent: string) => Promise<MentoringInvite>
    acceptInvite: (newStatus: Partial<MentoringInvite>) => Promise<MentoringInvite>
    refuseAllPeddingInvites: (filterData: Partial<MentoringInvite>, updateData: Partial<MentoringInvite>) => void
}