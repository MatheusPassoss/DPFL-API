import { MentorshipService } from "../../domain/core/domain-services/mentorship-service";
import { InvalidDataError } from "../../domain/core/exceptions/invalid-data-error";
import { IMentoringRepository } from "../../domain/core/repositories/Mentoring/IMentoring-repository";
import { IMentoringInviteRepository } from "../../domain/core/repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IMentorRepository } from "../../domain/core/repositories/User/IMentor-repository";
import { IStudentRepository } from "../../domain/core/repositories/User/IStudent-repository";


export class AcceptInviteAndCreateMentorship {

    constructor(private readonly InviteRepository: IMentoringInviteRepository, private readonly studentRepository: IStudentRepository, private readonly mentorRepository: IMentorRepository, private readonly mentoringRepository: IMentoringRepository) {
    }


   async execute(idMentor: string, idStudent: string) {

        const invite = await this.InviteRepository.findOne({
            idMentor,
            idStudent,
            status: "PEDDING"
        })

        const student = await this.studentRepository.findById(idStudent)
        const mentor = await this.mentorRepository.findById(idMentor)

        if (!invite || !student || !mentor) {
            throw new InvalidDataError()
        }

        const acceptedInvite = new MentorshipService().acceptInviteAndCreateMentorship(invite, mentor, student)

        if (!acceptedInvite) {
            // notificar o publisher que o invite deu erro na hora da criação pra ele enviar o e-mail
        }

        if (acceptedInvite) {
            this.mentoringRepository.save(acceptedInvite)
            // notificar o publisher que o invite foi criado pra ele enviar o e-mail
        }
    }

}   