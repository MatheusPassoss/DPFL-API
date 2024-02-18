import { Student } from "../../entities/user/student";
import { IRepository } from "../../shared-global/IRepository";


export interface IStudentRepository extends IRepository<Student> {
    findByMentor: (emailMentor: string) => Promise<Student | null>
    listByModule: (module: string) => Promise<Student[] | null>
    listWithoutMentor: () => Promise<Student[] | null>

}
