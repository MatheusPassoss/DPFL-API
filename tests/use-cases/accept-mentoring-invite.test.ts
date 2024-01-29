import { InMemoryMentorRepository } from "../repositories/in-memory-mentor-repository"
import { InMemoryMentoringRepository } from "../repositories/in-memory-mentoring-repository"
import { InMemoryStudentRepository } from "../repositories/in-memory-students-repository"
import { CreateStudentUseCase } from "../../src/domain/core/use-cases/User/create-student"
import { InMemoryMentoringInviteRepository } from "../repositories/in-memory-mentoring-invite-repository"
import { crypto } from "../../src"
import { CreateMentorUseCase } from "../../src/domain/core/use-cases/User/create-mentor"
import { CreateMentoringInvite } from "../../src/domain/core/use-cases/Mentoring/Invite/create-metoring-invite"
import { AcceptMentoringInvite } from "../../src/domain/core/use-cases/Mentoring/Invite/accept-mentoring-invite"
import { MentoringInvite } from "../../src/domain/core/entities/mentoring-invite"
import { InvalidParamError } from "../../src/domain/core/exceptions/invalid-param-error"

describe("Criação de convite de Mentoria", () => {

    const StudentRepository = new InMemoryStudentRepository()
    const MentorRepository = new InMemoryMentorRepository()
    const MentoringInvite = new InMemoryMentoringInviteRepository()
    const MentoringRepository = new InMemoryMentoringRepository()

    const createStudentUseCase = new CreateStudentUseCase(StudentRepository)
    const createMentorUseCase = new CreateMentorUseCase(MentorRepository)
    const createMentoringInviteUseCase = new CreateMentoringInvite(MentoringInvite, StudentRepository, MentorRepository, MentoringRepository)
    const acceptInvite = new AcceptMentoringInvite(MentoringInvite)


    const date = new Date()
    const idStudent = crypto.randomUUID()
    const idSecondStudent = crypto.randomUUID()
    const idThirdStudent = crypto.randomUUID()
    const idFourStudent = crypto.randomUUID()
    const idMentor = crypto.randomUUID()
    const idSecondMentor = crypto.randomUUID()
    const idThirdMentor = crypto.randomUUID()
    const idFourMentor = crypto.randomUUID()
    const idFifithMentor = crypto.randomUUID()
    const idFridayMentor = crypto.randomUUID()
    const idSeventhMentor = crypto.randomUUID()
    const idEightMentor = crypto.randomUUID()

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

    test("Deve ser possível criar mais de um estudante", async () => {

        const secondStudentSchema = {
            id: idSecondStudent,
            name: "Novo Estudante 2",
            email: "estudante2@exemplo.com",
            cpf: "98765432122",
            phone: "11 987654323",
            birthDate: new Date(),
            address: {
                cep: "67890",
                city: "Cidade2",
                state: "Estado2",
                road: "Rua4",
                number: "789",
            }
        }

        const thirdStudentSchema = {
            id: idThirdStudent,
            name: "Novo Estudante 3",
            email: "estudante3@exemplo.com",
            cpf: "98765432100",
            phone: "11 987654321",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "123",
            }
        }

        const fourStudentSchema = {
            id: idFourStudent,
            name: "Novo Estudante 4",
            email: "estudante4@exemplo.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "54321",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "456",
            }
        }

        const secondStudent = await createStudentUseCase.execute(secondStudentSchema);
        const thirdStudent = await createStudentUseCase.execute(thirdStudentSchema);
        const fourStudent = await createStudentUseCase.execute(fourStudentSchema);

        expect(secondStudent).toEqual(secondStudentSchema);
        expect(thirdStudent).toEqual(thirdStudentSchema);
        expect(fourStudent).toEqual(fourStudentSchema);
    });

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

    test("Deve ser possível criar mais de um Mentor", async () => {

        const secondMentorSchema = {
            id: idSecondMentor,
            name: "Mentor2",
            email: "mentor2@example.com",
            cpf: "98765432100",
            phone: "11 987654321",
            birthDate: new Date(),
            address: {
                cep: "54321",
                city: "Cidade2",
                state: "Estado2",
                road: "Rua2",
                number: "456",
            }
        }

        const thirdMentorSchema = {
            id: idThirdMentor,
            name: "Mentor3",
            email: "mentor3@example.com",
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

        const fourMentorSchema = {
            id: idFourMentor,
            name: "Novo Mentor 4",
            email: "mentor4@exemplo.com",
            cpf: "98765432133",
            phone: "11 987654324",
            birthDate: new Date(),
            address: {
                cep: "13579",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "101",
            }
        }

        const fifthMentorSchema = {
            id: idFifithMentor,
            name: "Novo Mentor 5",
            email: "mentor5@exemplo.com",
            cpf: "98765432133",
            phone: "11 987654324",
            birthDate: new Date(),
            address: {
                cep: "13579",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "101",
            }
        }

        const fridayMentorSchema = {
            id: idFridayMentor,
            name: "Novo Mentor 6",
            email: "mentor6@exemplo.com",
            cpf: "98765432833",
            phone: "11 987654324",
            birthDate: new Date(),
            address: {
                cep: "13579",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "101",
            }
        }

        const seventhMentorSchema = {
            id: idSeventhMentor,
            name: "Novo Mentor 7",
            email: "mentor7@exemplo.com",
            cpf: "98765432833",
            phone: "11 987654324",
            birthDate: new Date(),
            address: {
                cep: "13579",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "101",
            }
        }

        const eighthMentorSchema = {
            id: idEightMentor,
            name: "Novo Mentor 8",
            email: "mentor8@exemplo.com",
            cpf: "98725432810",
            phone: "11 987654384",
            birthDate: new Date(),
            address: {
                cep: "13579",
                city: "Cidade4",
                state: "Estado4",
                road: "Rua4",
                number: "101",
            }
        }



        const secondMentor = await createMentorUseCase.execute(secondMentorSchema);
        const thirdMentor = await createMentorUseCase.execute(thirdMentorSchema);
        const fourMentor = await createMentorUseCase.execute(fourMentorSchema);
        const fifthMentor = await createMentorUseCase.execute(fifthMentorSchema);
        const fridayMentor = await createMentorUseCase.execute(fridayMentorSchema);
        const seventhMentor = await createMentorUseCase.execute(seventhMentorSchema);
        const eighthMentor = await createMentorUseCase.execute(eighthMentorSchema);

        expect(secondMentor).toEqual(secondMentorSchema);
        expect(thirdMentor).toEqual(thirdMentorSchema);
        expect(fourMentor).toEqual(fourMentorSchema);
        expect(fifthMentor).toEqual(fifthMentorSchema);
        expect(fridayMentor).toEqual(fridayMentor);
        expect(seventhMentor).toEqual(seventhMentorSchema);
        expect(eighthMentor).toEqual(eighthMentorSchema);
    });

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

    test("Deve ser possível criar (enviar) mais de um convite de Mentoria para o mesmo aluno", async () => {

        const SecondInviteParams = {
            idMentor: idSecondMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const ThirdInviteParams = {
            idMentor: idThirdMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const FourInviteParams = {
            idMentor: idFourMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const fifthInviteParams = {
            idMentor: idFifithMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const frydayInviteParams = {
            idMentor: idFridayMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const seventhInviteParams = {
            idMentor: idSeventhMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const eighthInviteParams = {
            idMentor: idEightMentor,
            idStudent: idSecondStudent,
            createAt: date
        }

        const SecondInvite = await createMentoringInviteUseCase.execute(SecondInviteParams)
        const ThirdInvite = await createMentoringInviteUseCase.execute(ThirdInviteParams)
        const FourInvite = await createMentoringInviteUseCase.execute(FourInviteParams)
        const FifthInvite = await createMentoringInviteUseCase.execute(fifthInviteParams)
        const FridayInvite = await createMentoringInviteUseCase.execute(frydayInviteParams)
        const SeventhInvite = await createMentoringInviteUseCase.execute(seventhInviteParams)
        const EightInvite = await createMentoringInviteUseCase.execute(eighthInviteParams)

        expect(SecondInvite.idStudent).toBe(idSecondStudent)
        expect(SecondInvite.idMentor).toBe(idSecondMentor)
        expect(SecondInvite.status).toBe("PEDDING")

        expect(ThirdInvite.idStudent).toBe(idSecondStudent)
        expect(ThirdInvite.idMentor).toBe(idThirdMentor)
        expect(ThirdInvite.status).toBe("PEDDING")

        expect(FourInvite.idStudent).toBe(idSecondStudent)
        expect(FourInvite.idMentor).toBe(idFourMentor)
        expect(FourInvite.status).toBe("PEDDING")

        expect(FifthInvite.idStudent).toBe(idSecondStudent)
        expect(FifthInvite.idMentor).toBe(idFifithMentor)
        expect(FifthInvite.status).toBe("PEDDING")

        expect(FridayInvite.idStudent).toBe(idSecondStudent)
        expect(FridayInvite.idMentor).toBe(idFridayMentor)
        expect(FridayInvite.status).toBe("PEDDING")

        expect(SeventhInvite.idStudent).toBe(idSecondStudent)
        expect(SeventhInvite.idMentor).toBe(idSeventhMentor)
        expect(SeventhInvite.status).toBe("PEDDING")

        expect(EightInvite.idStudent).toBe(idSecondStudent)
        expect(EightInvite.idMentor).toBe(idEightMentor)
        expect(EightInvite.status).toBe("PEDDING")

    })


    test("Deve ser possível aceitar um convite de Mentoria", async () => {

        const mentoring = await MentoringInvite.findByMentorId(idSecondMentor)

        if (mentoring) {
            const params = {
                idMentoringInvite: mentoring.id,
                idStudent: idSecondStudent,
                idMentor: idSecondMentor,

            }

            const accepted = await acceptInvite.execute(params)

            expect(accepted).toBeTruthy()
            expect(accepted.idStudent).toBe(idSecondStudent)
            expect(accepted.idMentor).toBe(idSecondMentor)
            expect(accepted.status).toBe("ACCEPTED")
        }
    })

    test("Todos os convites de Mentoria pendentes devem ser recusados após um ser aceito", async () => {

        const invitesOrNull = await MentoringInvite.listByStudentId(idSecondStudent)

        const invites: MentoringInvite[] = []

        if (invitesOrNull) {
            invitesOrNull.forEach((invite) => {

                if (invite.status == "PEDDING") {

                    invites.push(invite)
                }
            })
        }

        expect(invites.length).toBe(0)
    })


    test("Deve ser possível localizar um convite de Mentoria já enviado", async () => {

        const FirstMentoring = await MentoringInvite.findByMentorId(idSecondMentor)

        expect(FirstMentoring).toBeTruthy()
        expect(FirstMentoring?.idStudent).toBe(idSecondStudent)
        expect(FirstMentoring?.idMentor).toBe(idSecondMentor)
        expect(FirstMentoring?.status).toBe("ACCEPTED")

    })


    test("Não deve ser possível aceitar mais de um convite de Mentoria", async () => {
        const mentoring = await MentoringInvite.findByMentorId(idThirdMentor);

        if (!mentoring) {
            return null
        }
        const params = {
            idMentoringInvite: mentoring.id,
            idStudent: idSecondStudent,
            idMentor: idThirdMentor,
        };

        expect(async () => await acceptInvite.execute(params)).rejects.toThrow(InvalidParamError);

    });

    test("Não deve ser possível enviar um convite de Mentoria se já há um convite pendente por parte do Mentor, ou aceito.", async () => {

        const secondMentorNotAllowed = {
            idMentor: idSecondMentor,
            idStudent: idThirdStudent,
            createAt: date
        }

        const secondStudentNotAllowed = {
            idMentor: idSeventhMentor,
            idStudent: idSecondStudent,
            createAt: date
        }
        
        expect( async () => await createMentoringInviteUseCase.execute(secondMentorNotAllowed)).rejects.toThrow(InvalidParamError)
        expect( async () => await createMentoringInviteUseCase.execute(secondStudentNotAllowed)).rejects.toThrow(InvalidParamError)

    })

}
)