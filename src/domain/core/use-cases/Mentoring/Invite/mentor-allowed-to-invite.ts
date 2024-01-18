import { MentoringInvite } from "../../../entities/mentoringInvite";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentorRepository } from "../../../repositories/User/IMentor-repositorie";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IUseCase } from "../../../shared-global/IUse-case";


interface MentorAllowedToInviteParams {
    mentorId: string
}


export class MentorAllowedToInvite implements IUseCase<MentorAllowedToInviteParams, boolean> {

    private readonly mentorRepository: IMentorRepository
    private readonly mentoringInviteRepository: IMentoringInviteRepository

    constructor(mentorRepository: IMentorRepository, mentoringRepository: IMentoringInviteRepository) {
        this.mentorRepository = mentorRepository  
        this.mentoringInviteRepository = mentoringRepository
    }   
    
    async execute(params: MentorAllowedToInviteParams): Promise<boolean> {
            
        const errors = await this.validateParams(params.mentorId);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const mentoringInvitesOrNull: MentoringInvite[] | null = await this.mentoringInviteRepository.listByMentorId(params.mentorId);

        if (!mentoringInvitesOrNull) return true; 

        return mentoringInvitesOrNull.length == 0
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