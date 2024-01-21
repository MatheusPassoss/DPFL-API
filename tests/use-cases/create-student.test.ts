import { crypto } from "../../src"
import { Student } from "../../src/domain/core/entities/Student"
import { CreateStudentUseCase } from "../../src/domain/core/use-cases/User/create-student"
import { InMemoryStudentRepository } from "../repositories/in-memory-students-repository"


describe("Caso de uso de criação de estudante", () => {


    test("Deve ser possível criar uma entidade estudante", async () => {
        const StudentRepository = new InMemoryStudentRepository

        const studentSchema = {
            name: "Passos",
            email: "passos@passos",
            cpf: "212222"
        }

        const id = crypto.randomUUID()

        const student = Student.create({ ...studentSchema }, id)
        console.log(student)
        expect(student).toBeTruthy()
    })

    test("Deve ser possível criar e salvar a entidade estudante através do caso de uso 'create-student'.", async () => {
        const StudentRepository = new InMemoryStudentRepository

        const studentSchema = {
            name: "Passos",
            email: "passos@passos",
            cpf: "12345678999",
            phone: "11 947249777",
            bithDate: "10-11-2002",
            address: {
                cep: "05856",
                city: "teste",
                state: "teste",
                road: "teste",
                number: "teste",
            }
        }

        const createStudentUseCase = new CreateStudentUseCase(StudentRepository)
        
        const student = await createStudentUseCase.execute({...studentSchema})
        console.log(student)

        console.log(student)
        expect(student).toBeTruthy()
    })


})