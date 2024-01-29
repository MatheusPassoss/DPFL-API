import { MentoringInvite } from "../../entities/mentoring-invite";
import { Mentoring } from "../../entities/metoring";
import { EntityNotFound } from "../../exceptions/entity-not-found";
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { IMentoringRepository } from "../../repositories/Mentoring/IMentoring-repository";
import { IMentoringInviteRepository } from "../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IMentorRepository } from "../../repositories/User/IMentor-repository";
import { IStudentRepository } from "../../repositories/User/IStudent-repository";
import { IUseCase } from "../../shared-global/IUse-case";


interface MentoringAllowedToMentoringParams {
    idMentor: string
    idStudent: string
}

export class MentoringAllowedToCreate implements IUseCase<MentoringAllowedToMentoringParams, boolean> {


    private readonly mentorRepository: IMentorRepository
    private readonly mentoringInviteRepository: IMentoringInviteRepository
    private readonly mentoringRepository: IMentoringRepository
    private readonly studentRepository: IStudentRepository

    constructor(mentorRepository: IMentorRepository, studentRepository: IStudentRepository, mentoringInviteRepository: IMentoringInviteRepository, mentoringRepository: IMentoringRepository) {
        this.mentorRepository = mentorRepository
        this.studentRepository = studentRepository
        this.mentoringInviteRepository = mentoringInviteRepository
        this.mentoringRepository = mentoringRepository
    }


    async execute(params: MentoringAllowedToMentoringParams): Promise<boolean> {

        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterMentoringInProgress: Partial<Mentoring> = {
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            status: "PROGRESS"
        }

        const filterAcceptedInvite: Partial<MentoringInvite> = {
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            status: "ACCEPTED"
        }

        const acceptedInviteOrNull: MentoringInvite | null = await this.mentoringInviteRepository.findOneInvite(filterAcceptedInvite);
        const mentoringInProgressOrNull: Mentoring | null = await this.mentoringRepository.findOne(filterMentoringInProgress)

        return mentoringInProgressOrNull === null && acceptedInviteOrNull != null
    }

    private async validateParams(params: MentoringAllowedToMentoringParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const mentorExists = await this.mentorRepository.findById(params.idMentor)
        const studentExists = await this.studentRepository.findById(params.idStudent)
       
        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        return errors.length > 0 ? errors : null;
    }

}   