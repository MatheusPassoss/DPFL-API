import { Mentoria} from "../entities/mentoria";
import { IRepository } from "../shared-global/IRepository";


export interface IMentoriaRepository extends IRepository<Mentoria> {

    findByStudentId: (studentId: string) => Promise<Mentoria[] | null>
    findByMentorId: (studentId: string) => Promise<Mentoria[] | null>

}
