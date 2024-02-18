import { SendMentoringInvite } from "../../../src/application/use-cases/send-mentoring-invite"
import { MentorNotAllowedToInvite } from "../../../src/domain/core/exceptions/mentor-not-allowed-to-invite"
import { StudentNotAllowedToInvite } from "../../../src/domain/core/exceptions/student-not-allowed-to-invite"
import { InMemoryMentorRepository } from "../../repositories/in-memory-mentor-repository"
import { InMemoryMentoringInviteRepository } from "../../repositories/in-memory-mentoring-invite-repository"
import { InMemoryMentoringRepository } from "../../repositories/in-memory-mentoring-repository"
import { InMemoryStudentRepository } from "../../repositories/in-memory-students-repository"

describe("Send Mentoring Invite use case tests", () => {


    const StudentRepository = new InMemoryStudentRepository
    const MentorRepository = new InMemoryMentorRepository
    const MentoringRepository = new InMemoryMentoringRepository
    const MentoringInvite = new InMemoryMentoringInviteRepository

    const sendMentoringInvite = new SendMentoringInvite(MentoringInvite, StudentRepository, MentorRepository, MentoringRepository)


    it("Não deve permitir prosseguir com use-case porque o mentor já possuí um convite de Mentoria pendente", async () => {

        expect( async () => await sendMentoringInvite.execute({idStudent: "66ed35ad-2671-473f-9z0b-206771a0a786", idMentor: "80052778-6118-123c-8e49-138e71643faf"})).rejects.toThrow(MentorNotAllowedToInvite)

    })

    it("Não deve prosseguir com o use-case, porque o mentor já tem uma mentoria em progresso", async () => {
        
       expect( async () => await sendMentoringInvite.execute({idStudent: "66ed35ad-2671-473f-9z0b-206771a0a786", idMentor: "89852778-6118-428c-8e49-138e71643faf"})).rejects.toThrow(MentorNotAllowedToInvite)
   
    })

    it("Não deve prosseguir com o use-case, porque o aluno já tem um convite de Mentoria aceito", async () => {

        
       expect( async () => await sendMentoringInvite.execute({idStudent: "21ed35ad-2671-473f-9a0b-206771a0a786", idMentor: "70152000-6118-123c-8e49-138e71643fa"})).rejects.toThrow(StudentNotAllowedToInvite)
    })


    it("Não deve prosseguir com o use-case, porque o aluno já tem uma mentoria em progresso", async () => {

       expect( async () => await sendMentoringInvite.execute({idStudent: "21ed35ad-2671-473f-9a0b-206771a0a786", idMentor: "70152000-6118-123c-8e49-138e71643fa"})).rejects.toThrow(StudentNotAllowedToInvite)
    
        
    
    })



    


})