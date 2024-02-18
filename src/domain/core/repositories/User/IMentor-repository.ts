import { Mentor } from "../../entities/user/mentor";
import { IRepository } from "../../shared-global/IRepository";


export interface IMentorRepository extends IRepository<Mentor> {

    findByStudent: (emailStudent: string) => Promise<Mentor | null>
    listWithoutStudent: () => Promise<Mentor[] | null>
    listMentors: () => Promise<Mentor[] | null>

}
