import { IMeetingRepository } from "../../../../src/domain/core/repositories/Mentoring/Meeting/IMentoring-meeting-repository"
import { InMemoryMentoryngMeetingRepository } from "../../../repositories/in-memory-mentoring-meeting-repository"
import { InMemoryMentoringRepository } from "../../../repositories/in-memory-mentoring-repository"
import { CreateMeeting } from "../../../../src/domain/core/use-cases/mentoring-cases/meeting/create-meeting"
import { IMentoringRepository } from "../../../../src/domain/core/repositories/Mentoring/IMentoring-repository"
import { IStudentRepository } from "../../../../src/domain/core/repositories/User/IStudent-repository"
import { InMemoryStudentRepository } from "../../../repositories/in-memory-students-repository"
import { InMemoryMentorRepository } from "../../../repositories/in-memory-mentor-repository"
import { IMentorRepository } from "../../../../src/domain/core/repositories/User/IMentor-repository"
import { MentoringMeeting } from "../../../../src/domain/core/entities/mentoring-meeting"

describe("Testes dos casos de uso de reunião de Mentoria.", () => {

    const meetingRepository: IMeetingRepository = new InMemoryMentoryngMeetingRepository()
    const mentoringRepository: IMentoringRepository = new InMemoryMentoringRepository()
    const studentRepository: IStudentRepository = new InMemoryStudentRepository
    const mentorRepository: IMentorRepository = new InMemoryMentorRepository

    const createMeeting: CreateMeeting = new CreateMeeting(meetingRepository, mentoringRepository, studentRepository, mentorRepository)

    test("Pra criar a reunião de Mentoria, deve haver uma Mentoria em progresso entre o aluno e o Mentor", async () => {

        const params = {
            idMentor: "89852778-6118-428c-8e49-138e71643faf",
            idStudent: "21ed35ad-2671-473f-9a0b-206771a0a786",
            date: new Date("01/02/2024")
        }

        const meeting = await createMeeting.execute(params)
        console.log(meeting.date.toLocaleDateString(), meeting.date.toLocaleTimeString())
        expect(meeting.status).toBe("NOT-CONFIRMED")

    })

    test("Não deve ser possível criar uma reunião de Mentoria sem o vínculo de Mentoria.", async () => {

        const params = {
            idMentor: "85952000-6118-123c-8e49-138e71643faf",
            idStudent: "21ed35ad-2671-473f-9a0b-206771a0a786",
            date: new Date("01/02/2024")
        }

        expect(async () => await createMeeting.execute(params)).rejects.toThrow()

    })


    // test("O Mentor pode reagendar a data da Mentoria", async () => {

    // })



})