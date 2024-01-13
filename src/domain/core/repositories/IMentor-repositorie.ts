import { Mentor } from "../entities/mentor";
import { IRepository } from "../shared-global/IRepository";


export interface IMentorRepository extends IRepository<Mentor> {

    findByStudent: (emailStudent: string) => Promise<Mentor | null>
    listWithoutStudent: () => Promise<Mentor[] | null>
    listMentors: () => Promise<Mentor[] | null>

}
