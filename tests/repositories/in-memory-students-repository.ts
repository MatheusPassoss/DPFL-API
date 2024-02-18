import { Student } from "../../src/domain/core/entities/student";
import { InvalidDataError } from "../../src/domain/core/exceptions/invalid-data-error";
import { IStudentRepository } from "../../src/domain/core/repositories/User/IStudent-repository";


export class InMemoryStudentRepository implements IStudentRepository {
    public students: Student[] = [

        {
            id: "21ed35ad-2671-473f-9a0b-206771a0a786",
            name: "Thomas",
            email: "thomas@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            }
        },

        {
            id: "30ed35ad-2671-473f-9a0b-206771a0a786",
            name: "Vitoria",
            email: "vitoria@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            }
        },

        {
            id: "66ed35ad-2671-473f-9z0b-206771a0a786",
            name: "Vinis",
            email: "vini@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            }
        },

        {
            id: "70ed35ad-2671-473f-9z0b-306771a0a786",
            name: "Marcos",
            email: "marcos@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            }
        }

        


    ]

    async save(student: Student): Promise<Student | null> {

        if (!student) {
            throw new InvalidDataError()
        }

        this.students.push(student)
        return student
    }


    async findById(id: string): Promise<Student | null> {

        const student = await this.students.find(student => student.id == id)
     
        if (!student) {
            return null
        }

        console.log(student)

        return student
    }

    async findByEmail(email: string): Promise<Student | null> {

        const student = await this.students.find(student => student.email == email)

        if (!student) {
            return null
        }

        return student
    }


    update!: (student: Partial<Student>) => Promise<Student | null>;
    findByMentor!: (emailMentor: string) => Promise<Student | null>;
    listByModule!: (module: string) => Promise<Student[] | null>;
    listWithoutMentor!: () => Promise<Student[] | null>;

}