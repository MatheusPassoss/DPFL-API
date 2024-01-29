import { InMemoryMentorRepository } from "../repositories/in-memory-mentor-repository"
import { InMemoryMentoringRepository } from "../repositories/in-memory-mentoring-repository"
import { InMemoryStudentRepository } from "../repositories/in-memory-students-repository"
import { CreateStudentUseCase } from "../../src/domain/core/use-cases/User/create-student"
import { InMemoryMentoringInviteRepository } from "../repositories/in-memory-mentoring-invite-repository"
import { crypto } from "../../src"
import { CreateMentorUseCase } from "../../src/domain/core/use-cases/User/create-mentor"
import { CreateMentoringInvite } from "../../src/domain/core/use-cases/Mentoring/Invite/create-metoring-invite"
import { AcceptMentoringInvite } from "../../src/domain/core/use-cases/Mentoring/Invite/accept-mentoring-invite"
import { CreateMentoring } from "../../src/domain/core/use-cases/Mentoring/create-mentoring"

describe("Deve ser possível criar uma Mentoria", () => {

    const StudentRepository = new InMemoryStudentRepository
    const MentorRepository = new InMemoryMentorRepository
    const MentoringRepository = new InMemoryMentoringRepository
    const MentoringInvite = new InMemoryMentoringInviteRepository

    const createStudentUseCase = new CreateStudentUseCase(StudentRepository)
    const createMentorUseCase = new CreateMentorUseCase(MentorRepository)
    const createMentoring = new CreateMentoringInvite(MentoringInvite, StudentRepository, MentorRepository, MentoringRepository)
    const acceptInvite = new AcceptMentoringInvite(MentoringInvite)
    const createRealMentoring = new CreateMentoring(MentoringRepository, MentoringInvite, StudentRepository, MentorRepository,)

    const date = new Date()


    const idStudent = crypto.randomUUID()
    const idMentor = crypto.randomUUID()

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

    test("Deve ser possível criar um estudante", async () => {

        const student = await createStudentUseCase.execute(studentSchema)

        expect(student).toEqual(studentSchema)

    })

    test("Deve ser possível criar um Mentor", async () => {

        const mentor = await createMentorUseCase.execute(mentorSchema)

        expect(mentor).toEqual(mentorSchema)

    })

    test("Deve ser possível criar (enviar) um convite de Mentoria", async () => {

        const InviteParams = {
            idMentor: idMentor,
            idStudent: idStudent,
            createAt: date
        }

        const Invite = await createMentoring.execute(InviteParams)

        expect(Invite.idStudent).toBe(idStudent)
        expect(Invite.idMentor).toBe(idMentor)

    })

    test("Deve ser possível aceitar um convite de Mentoria", async () => {

        const mentoring = await MentoringInvite.findByStudentId(idStudent)

        if (mentoring) {
            const params = {
                idMentoringInvite: mentoring.id,
                idStudent: idStudent,
                idMentor: idMentor
            }

            const accepted = await acceptInvite.execute(params)
            expect(accepted.idStudent).toBe(idStudent)
            expect(accepted.idMentor).toBe(idMentor)
        }
    })

    test("Deve ser possível (finalmente) criar a Mentoria", async () => {

        const CreateMentoringParams = {
            idStudent: idStudent,
            idMentor: idMentor,
            date: date
        }

        const Mentoring = await createRealMentoring.execute(CreateMentoringParams)

        expect(Mentoring?.idMentor).toBe(idMentor)
        expect(Mentoring?.idStudent).toBe(idStudent)

    })



})