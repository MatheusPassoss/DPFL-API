import { MentoringInvite } from "../entities/mentoringInvite";
import { EntityNotFound } from "../exceptions/entity-not-found";
import { IMentoringInviteRepository } from "../repositories/IMentoringInvite-repository";
import { InvalidParamError } from "../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../exceptions/entity-not-updated-error";


export class RefuseMentoringInvite {

    private readonly MentoringInviteRepository: IMentoringInviteRepository

    constructor(InviteRepository: IMentoringInviteRepository) {
        this.MentoringInviteRepository = InviteRepository
    }


    async execute(idMentoringInvite: string) {
        const errors = await this.validateParams(idMentoringInvite)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const updateInviteToRefused: Partial<MentoringInvite> = {
            lastUpdate: new Date(),
            status: "REFUSED"
        }

        const update = await this.MentoringInviteRepository.update(updateInviteToRefused);
        
        if (!update) {
            throw new EntityNotUpdatedError()
        }

        return update;
    }

    private async validateParams(idMentoringInvite: string) {
        const errors: Error[] = []

        const inviteExists = await this.MentoringInviteRepository.findById(idMentoringInvite)

        if (!inviteExists) {
            errors.push(new EntityNotFound("Mentoring Invite"))
        }

        return errors.length > 0 ? errors : null

    }

}