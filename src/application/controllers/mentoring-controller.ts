import { IMentoringRepository } from "../../domain/core/repositories/Mentoring/IMentoring-repository";
import { IMeetingRepository } from "../../domain/core/repositories/Mentoring/Meeting/IMentoring-meeting-repository";
import { IMentorRepository } from "../../domain/core/repositories/User/IMentor-repository";
import { IStudentRepository } from "../../domain/core/repositories/User/IStudent-repository";
import { CancelMentoring } from "../../domain/core/use-cases/mentoring-cases/mentoring/cancel-mentoring";
import { CompleteMentoring } from "../../domain/core/use-cases/mentoring-cases/mentoring/complete-mentoring";
import { IHttpContext } from "../../port/http/IHttpContext";

export class MentoringController {

    private readonly repository: IMentoringRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;
    private readonly meetingRepository: IMeetingRepository

    constructor(repo: IMentoringRepository, studentRepo: IStudentRepository, mentorRepo: IMentorRepository, meetingRepo: IMeetingRepository) {
        this.repository = repo
        this.studentRepository = studentRepo
        this.mentorRepository = mentorRepo
        this.meetingRepository = meetingRepo
    }

    async cancel(http: IHttpContext) {
         
        const res = http.getRequest()

        const cancelParams = {
            id: res.body.id,
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
        }

        const canceled = await new CancelMentoring(this.repository, this.studentRepository, this.mentorRepository).execute(cancelParams)
    
        return canceled
    }

    async complete(http: IHttpContext) {
        const res = http.getRequest()

        const completeParams = {
            id: res.body.id,
            idStudent: res.body.idStudent,
            idMentor: res.body.idMentor,
        }

        const completed = await new CompleteMentoring(this.repository, this.studentRepository, this.mentorRepository, this.meetingRepository).execute(completeParams)

        return completed
    }

    async getById(http: IHttpContext) {
       
        const res = http.getRequest()

        const { id } = res.query
        const mentoring = await this.repository.findById(id)

        return mentoring

    }

    async getByStudentId(http: IHttpContext) {
        
        const res = http.getRequest()

        const { idStudent } = res.query
        
        const mentoring = await this.repository.findById(idStudent)

        return mentoring

    }
}