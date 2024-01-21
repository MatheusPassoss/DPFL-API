import { Student } from "../../src/domain/core/entities/Student";
import { IStudentRepository } from "../../src/domain/core/repositories/User/IStudent-repository";


export class InMemoryStudentRepository implements IStudentRepository {
    public students: Student[] = []

    save(student: Student): Student {
        this.students.push(student)
        return student
    }


    update: (student: Partial<Student>) => Promise<Student>;


    async findById(id: string): Promise<Student | null> {

        const student = await this.students.find(student => student.id == id)
        if (student) {
            return student
        }

        return null
    }

    async findByEmail(email: string): Promise<Student | null> {

        const student = await this.students.find(student => student.email == email)
        if (student) {
            return student
        }

        return null
    }
    

    findByMentor: (emailMentor: string) => Promise<Student | null>;
    listByModule: (module: string) => Promise<Student[] | null>;
    listWithoutMentor: () => Promise<Student[] | null>;

}