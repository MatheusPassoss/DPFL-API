import { InvalidDataError } from "../../domain/core/exceptions/invalid-data-error";
import { MentorNotAllowedToInvite } from "../../domain/core/exceptions/mentor-not-allowed-to-invite";
import { StudentNotAllowedToInvite } from "../../domain/core/exceptions/student-not-allowed-to-invite";
import { IMentoringRepository } from "../../domain/core/repositories/Mentoring/IMentoring-repository";
import { IMentoringInviteRepository } from "../../domain/core/repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IMentorRepository } from "../../domain/core/repositories/User/IMentor-repository";
import { IStudentRepository } from "../../domain/core/repositories/User/IStudent-repository";
import { MentorshipService } from "../../domain/core/domain-services/mentorship-service";

interface SendInviteParams {
    idStudent: string, 
    idMentor: string
}

export class SendMentoringInvite {

    constructor(private readonly repository: IMentoringInviteRepository, private readonly studentRepository: IStudentRepository, private readonly mentorRepository: IMentorRepository, private readonly mentoringRepository: IMentoringRepository) {
    }

    
    async execute({idStudent, idMentor}: SendInviteParams) {

        const mentorPeddingInvites = await this.repository.listByStatusAndMentorId({idMentor, status: "PEDDING"})
        const mentorMentorshipInProgress = await this.mentoringRepository.findByMentorIdAndStatus({idMentor, status: "PROGRESS"})
        const studentMentorshipInProgress = await this.mentoringRepository.findByStudentIdAndStatus({idStudent, status: "PROGRESS"})
        const student = await this.studentRepository.findById(idStudent)
        const mentor = await this.mentorRepository.findById(idMentor)
   
        if (mentorPeddingInvites != null || mentorMentorshipInProgress != null) {
            throw new MentorNotAllowedToInvite()
        }

        if (studentMentorshipInProgress != null) {
            throw new StudentNotAllowedToInvite()
        }

        if (!mentor || !student) {
            throw new InvalidDataError()
        }
 
        const invite = new MentorshipService().createInvite(mentor, student)

        if (!invite) {
            // notificar o publisher que o invite deu erro na hora da criação pra ele enviar o e-mail
        }

        if (invite) {
            // notificar o publisher que o invite foi criado pra ele enviar o e-mail
        }
    }
    
}