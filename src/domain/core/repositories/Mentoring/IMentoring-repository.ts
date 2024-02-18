import { Mentoring} from "../../entities/metoring";
import { IRepository } from "../../shared-global/IRepository";


export interface IMentoringRepository extends IRepository<Mentoring> {

    findByStudentId: (studentId: string) => Promise<Mentoring| null>
    findByMentorId: (studentId: string) => Promise<Mentoring | null>

    findByMentorIdAndStatus: (filter: Partial<Mentoring>) => Promise<Mentoring | null>
    findByStudentIdAndStatus: (filter: Partial<Mentoring>) => Promise<Mentoring | null>

    findOneAndUpdate: (filter: Partial<Mentoring>, updatePartial: Partial<Mentoring>) => Promise<Mentoring | null>
    findOne: (filter: Partial<Mentoring>) => Promise<Mentoring | null>
    updateMany: (filter: Partial<Mentoring>) => Promise<Mentoring[] | null> 
}
