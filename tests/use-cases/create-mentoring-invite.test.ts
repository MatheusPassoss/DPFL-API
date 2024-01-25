import { InMemoryMentorRepository } from "../repositories/in-memory-mentor-repository"
import { InMemoryMentoringRepository } from "../repositories/in-memory-mentoring-repository"
import { InMemoryStudentRepository } from "../repositories/in-memory-students-repository"
import { CreateStudentUseCase } from "../../src/domain/core/use-cases/User/create-student"
import { InMemoryMentoringInviteRepository } from "../repositories/in-memory-mentoring-invite-repository"
import { crypto } from "../../src"
import { CreateMentorUseCase } from "../../src/domain/core/use-cases/User/create-mentor"
import { CreateMentoringInvite } from "../../src/domain/core/use-cases/Mentoring/Invite/create-metoring-invite"

describe("Criação de convite de Mentoria", () => {

    const StudentRepository = new InMemoryStudentRepository
    const MentorRepository = new InMemoryMentorRepository
    const MentoringInvite = new InMemoryMentoringInviteRepository
    const MentoringRepository = new InMemoryMentoringRepository

    const createStudentUseCase = new CreateStudentUseCase(StudentRepository)
    const createMentorUseCase = new CreateMentorUseCase(MentorRepository)
    const createMentoringInviteUseCase = new CreateMentoringInvite(MentoringInvite, StudentRepository, MentorRepository, MentoringRepository)

    const date = new Date()
    const idStudent = crypto.randomUUID()
    const idMentor = crypto.randomUUID()


    test("Deve ser possível criar um estudante", async () => {


        const studentSchema = {
            id: idStudent,
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

        const student = await createStudentUseCase.execute(studentSchema)
        expect(student).toEqual(studentSchema)

    })

    test("Deve ser possível criar um Mentor", async () => {

        const mentorSchema = {
            id: idMentor,
            name: "renato",
            email: "renato@calabro",
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

        const mentor = await createMentorUseCase.execute(mentorSchema)
        expect(mentor).toEqual(mentorSchema)

    })

    test("Deve ser possível criar (enviar) um convite de Mentoria", async () => {

        const InviteParams = {
            idMentor: idMentor,
            idStudent: idStudent,
            createAt: new Date()
        }

        const Invite = await createMentoringInviteUseCase.execute(InviteParams)
        expect(Invite.idStudent).toBe(idStudent)
        expect(Invite.idMentor).toBe(idMentor)
        expect(Invite.status).toBe("PEDDING")

    })

    // test("Deve retornar um erro caso o id do estudante seja inválido", async () => {
    //     const InviteParams = {
    //         idMentor: idMentor,
    //         idStudent: "123",
    //         createAt: date
    //     }

    //     expect(async () => await createMentoringInviteUseCase.execute(InviteParams)).toThrow()
    // })


    // test("Deve retornar um erro caso o id do Mentor seja inválido", async () => {
    //     const InviteParams = {
    //         idMentor: "123",
    //         idStudent: idStudent,
    //         createAt: date
    //     }

    //     expect(async () => await createMentoringInviteUseCase.execute(InviteParams)).toThrow()
    // })

    // test("Deve retornar um erro caso o id do Mentor e do aluno estejam invertidos", async () => {
    //     const InviteParams = {
    //         idMentor: idStudent,
    //         idStudent: idMentor,
    //         createAt: date
    //     }

    //     expect(async () => await createMentoringInviteUseCase.execute(InviteParams)).toThrow()
    // })




})