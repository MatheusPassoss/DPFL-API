import { IRepository } from "../shared-global/IRepository";
import { MentoringInvite } from "../entities/mentoringInvite";


interface StatusProps {
    status: "PEDDING" | "ACCEPT" | "REFUSED" | "CANCELED"
}

export interface IMentoringInviteRepository extends IRepository<MentoringInvite> {
    findByMentorId: (idMentor: string) => Promise<MentoringInvite>
    listByMentorId: (idMentor: string) => Promise<MentoringInvite[] | null>
    listByStudentId: (idMentor: string) => Promise<MentoringInvite[] | null>
    findByStudentId: (idStudent: string) => Promise<MentoringInvite>
    updateStatus: (newStatus: StatusProps) => Promise<MentoringInvite>
}