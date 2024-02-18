import { crypto } from "../../../src/server"
import { Student } from "../../../src/domain/core/entities/user/student"
import { InvalidCpfError } from "../../../src/domain/core/exceptions/invalid-cpf-error"
import { InvalidParamError } from "../../../src/domain/core/exceptions/invalid-param-error"
import { CreateStudentUseCase } from "../../../src/domain/core/use-cases/User/create-student"
import { InMemoryStudentRepository } from "../../repositories/in-memory-students-repository"


describe("Caso de uso de criação de estudante", () => {

    const StudentRepository = new InMemoryStudentRepository
    const createStudentUseCase = new CreateStudentUseCase(StudentRepository)
    const id = crypto.randomUUID()

    const studentSchema = {
        id: id,
        name: "Passos",
        email: "passos@passos",
        cpf: "12345678999",
        phone: "11 947249777",
        birthDate: new Date(),
        address: {
            cep: "05856",
            city: "teste",
            state: "teste",
            road: "teste",
            number: "teste",
        }
    }


    const InvalidStudentSchema = {
        id: id,
        name: "Passos",
        email: "passospassos",
        cpf: "123",
        phone: "11947249777",
        birthDate: new Date(),
        address: {
            cep: "05856",
            city: "teste",
            state: "teste",
            road: "teste",
            number: "teste",
        }
    }

    test("Deve ser possível criar uma entidade estudante", async () => {
        const student = Student.create({ ...studentSchema }, id)
        expect(student).toBeTruthy()
    })

    test("Deve ser possível criar e salvar a entidade estudante através do caso de uso 'create-student'.", async () => {

        const student = await createStudentUseCase.execute({ ...studentSchema })
        expect(student).toBeTruthy()
    })

    test("O método 'findByEmail' deve conseguir localizar o estudando que acabou de ser criado", async () => {

        const student = await StudentRepository.findByEmail("passos@passos")

        expect(student).toBeTruthy
    })

    test("O método 'findById' deve conseguir localizar o estudante que acabou de ser criado", async () => {

        const student = await StudentRepository.findById(id)
        expect(student).toBeTruthy
    })


    test("O estudante deve possuir os dados corretos.", async () => {

        const student = await StudentRepository.findById(id)
        expect(student).toEqual(studentSchema)

    })

    test("Não deve ser possível prosseguir com o caso de uso, devido ao formato do CPF ser inválido", async () => {

        expect(async () => await createStudentUseCase.execute({ ...InvalidStudentSchema })).rejects.toThrow(InvalidParamError)
    });


})