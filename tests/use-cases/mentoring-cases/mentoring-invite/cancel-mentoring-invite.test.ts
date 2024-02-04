import { InMemoryMentorRepository } from "../../../repositories/in-memory-mentor-repository"
import { InMemoryMentoringRepository } from "../../../repositories/in-memory-mentoring-repository"
import { InMemoryStudentRepository } from "../../../repositories/in-memory-students-repository"
import { CreateStudentUseCase } from "../../../../src/domain/core/use-cases/User/create-student"
import { InMemoryMentoringInviteRepository } from "../../../repositories/in-memory-mentoring-invite-repository"
import { crypto } from "../../../../src"
import { CreateMentorUseCase } from "../../../../src/domain/core/use-cases/User/create-mentor"
import { CreateMentoringInvite } from "../../../../src/domain/core/use-cases/mentoring-cases/Invite/create-metoring-invite"
import { AcceptMentoringInvite } from "../../../../src/domain/core/use-cases/mentoring-cases/Invite/accept-mentoring-invite"
import { MentoringInvite } from "../../../../src/domain/core/entities/mentoring-invite"
import { Mentoring } from "../../../../src/domain/core/entities/metoring"
import { CancelMentoringInvite } from "../../../../src/domain/core/use-cases/mentoring-cases/Invite/cancel-mentoring-invite" 

describe("Testes do caso de uso de cancelar um convite de Mentoria", () => {

    const MentoringInviteRepository = new InMemoryMentoringInviteRepository()
    const studentRepository = new InMemoryStudentRepository()
    const mentorRepository = new InMemoryMentorRepository()
    const cancelMentoringInvite = new CancelMentoringInvite(MentoringInviteRepository, studentRepository, mentorRepository)
    
    
    test("Deve ser possível cancelar um convite pendente", async () => {
        const student = await studentRepository.findByEmail("vitoria@example.com")
        const mentor = await mentorRepository.findByEmail("renato@example.com")
    
        if (student) {
            const filter: Partial<MentoringInvite> = {

                idStudent: student.id,
                idMentor: mentor.id,
                status: "PEDDING"
            }

            const mentoringInvite = await MentoringInviteRepository.findOneInvite(filter)
            

            if (mentoringInvite) {

                const params = {
                    id: mentoringInvite.id,
                    idStudent: mentoringInvite.idStudent,
                    idMentor: mentoringInvite.idMentor
                }

                const canceled = await cancelMentoringInvite.execute(params)
                console.log(canceled)
                expect(canceled.status).toBe("CANCELED")
            }
            
            expect(mentoringInvite).toBeTruthy()
    
    }})


    
    test("Não deve ser possível cancelar um convite já aceito pelo o aluno", async () => {
        
        const student = await studentRepository.findByEmail("thomas@example.com")

        if (student) {
            const filter: Partial<MentoringInvite> = {
                idStudent: student.id,
                status: "ACCEPTED"
            }

            const mentoringInvite = await MentoringInviteRepository.findAcceptedInvite(filter)
            if (mentoringInvite) {

                const params = {
                    id: mentoringInvite.id,
                    idStudent: mentoringInvite.idStudent,
                    idMentor: mentoringInvite.idMentor
                }

                expect(async () => await cancelMentoringInvite.execute(params)).rejects.toThrow()
               
            }
        }
    })

    test("Não deve ser possível cancelar um convite já cancelado", async () => {
        
        const student = await studentRepository.findByEmail("vitoria@example.com")

        if (student) {
            const filter: Partial<MentoringInvite> = {
                idStudent: student.id,
                status: "CANCELED"
            }

            const mentoringInvite = await MentoringInviteRepository.findAcceptedInvite(filter)
            if (mentoringInvite) {

                const params = {
                    id: mentoringInvite.id,
                    idStudent: mentoringInvite.idStudent,
                    idMentor: mentoringInvite.idMentor
                }

                expect(async () => await cancelMentoringInvite.execute(params)).rejects.toThrow()
               
            }
        }
    })


})