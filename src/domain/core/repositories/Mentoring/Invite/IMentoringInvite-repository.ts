import { IRepository } from "../../../shared-global/IRepository";
import { MentoringInvite } from "../../../entities/mentoring-invite";

export interface IMentoringInviteRepository extends IRepository<MentoringInvite> {
    
    listByMentorId: (idMentor: string) => Promise<MentoringInvite[] | null>
    listByStudentId: (idMentor: string) => Promise<MentoringInvite[] | null>
    findByStudentId: (idStudent: string) => Promise<MentoringInvite | null>
    
    findByMentorId: (idMentor: string) => Promise<MentoringInvite | null>
    
    
    
    acceptInvite: (filterData: Partial<MentoringInvite>, updateData: Partial<MentoringInvite>) => Promise<MentoringInvite | null>
    refuseAllPeddingInvites: (filterData: Partial<MentoringInvite>, updateData: Partial<MentoringInvite>) => void
    cancelInvite: (filterInvite: Partial<MentoringInvite>) => Promise<MentoringInvite | null>
    
    
    
    
    findOne: (filter: Partial<MentoringInvite>) => Promise<MentoringInvite | null>
    findOneAndUpdate: (filter: Partial<MentoringInvite>, updatePartial: Partial<MentoringInvite>) => Promise<MentoringInvite | null>
    findAcceptedInvite: (filter: Partial<MentoringInvite>) => Promise<MentoringInvite | null>
}