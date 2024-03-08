import { Student } from "../../src/domain/core/entities/user/student";
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
            role: {
                persona: "student",
                status: "active",
                idPermissionToken: ""
            },
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "30ed35ad-2671-473f-9a0b-206771a0a786",
            name: "Vitoria",
            email: "vitoria@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
                        role: {
                persona: "student",
                status: "active",
                idPermissionToken: ""
            },
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "66ed35ad-2671-473f-9z0b-206771a0a786",
            name: "Vinis",
            email: "vini@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
                        role: {
                persona: "student",
                status: "active",
                idPermissionToken: ""
            },
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "70ed35ad-2671-473f-9z0b-306771a0a786",
            name: "Marcos",
            email: "marcos@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
                       role: {
                persona: "student",
                status: "active",
                idPermissionToken: ""
            },
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        }, 

        {
            id: "100052000-6118-123c-8e49-138e71643fa",
            name: "Matheus Passos",
            email: "matheuspassos.work@gmail.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            role: {
                idPermissionToken: "",
                persona: "student",
                status: "active"
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        
        {
            id: "100052000-6118-123c-8e49-138e71643fa",
            name: "vinicius costa teste",
            email: "viniciuscosta_e10@hotmail.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            role: {
                idPermissionToken: "",
                persona: "student",
                status: "active"
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "1340520la-6118-123c-8e49-138e71643fa",
            name: "vini",
            email: "viniciuscosta_e10@hotmail.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            role: {
                idPermissionToken: "",
                persona: "student",
                status: "active"
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "999992228778-6118-123c-8e49-138e71643fa",
            name: "Passos Matheus",
            email: "passosmatheus.work@gmail.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                street: "Rua3",
                number: "789",
            },
            role: {
                idPermissionToken: "",
                persona: "student",
                status: "active"
            },
            createAt: new Date(),
            updateAt: new Date()
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