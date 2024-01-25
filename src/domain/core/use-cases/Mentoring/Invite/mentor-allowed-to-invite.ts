import { MentoringInvite } from "../../../entities/mentoring-invite";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentorRepository } from "../../../repositories/User/IMentor-repository";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repository";
import { Mentoring } from "../../../entities/metoring";


interface MentorAllowedToInviteParams {
    mentorId: string
}


export class MentorAllowedToInvite implements IUseCase<MentorAllowedToInviteParams, boolean> {

    private readonly mentorRepository: IMentorRepository
    private readonly mentoringInviteRepository: IMentoringInviteRepository
    private readonly mentoringRepository: IMentoringRepository

    constructor(mentorRepository: IMentorRepository, mentoringInviteRepository: IMentoringInviteRepository, mentoringRepository: IMentoringRepository) {
        this.mentorRepository = mentorRepository  
        this.mentoringInviteRepository = mentoringInviteRepository
        this.mentoringRepository = mentoringRepository
    }   
    
    async execute(params: MentorAllowedToInviteParams): Promise<boolean> {
            
        const errors = await this.validateParams(params.mentorId);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterMentoringInProgress: Partial<Mentoring> = {
            idMentor: params.mentorId,
            status: "PROGRESS"
        }

        const mentoringInProgressOrNull: Mentoring | null = await this.mentoringRepository.findOne(filterMentoringInProgress)
        const mentoringInvitesOrNull: MentoringInvite[] | null = await this.mentoringInviteRepository.listByMentorId(params.mentorId);

        if (!mentoringInProgressOrNull) return true; 
        if (!mentoringInvitesOrNull) return true; 

        return mentoringInProgressOrNull === null && mentoringInvitesOrNull.length == 0
    }

    private async validateParams(mentorId: string): Promise<Error[] | null> {
        const errors: Error[] = []

        const mentorExists = await this.mentorRepository.findById(mentorId)

        if(!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        return errors.length > 0 ? errors : null;
    }

}