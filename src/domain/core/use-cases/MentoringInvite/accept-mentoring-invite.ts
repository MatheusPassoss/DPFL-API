import { MentoringInvite } from "../entities/mentoringInvite";
import { EntityNotFound } from "../exceptions/entity-not-found";
import { IMentoringInviteRepository } from "../repositories/IMentoringInvite-repository";
import { InvalidParamError } from "../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../exceptions/entity-not-updated-error";
import { IUseCase } from "../shared-global/IUse-case";

interface AcceptMentoringInviteParams {
    idMentoringInvite: string,
    idStudent: string
}

export class AcceptMentoringInvite implements IUseCase<AcceptMentoringInviteParams, MentoringInvite> {

    private readonly MentoringInviteRepository: IMentoringInviteRepository

    constructor(InviteRepository: IMentoringInviteRepository) {
        this.MentoringInviteRepository = InviteRepository
    }

    async execute(params: AcceptMentoringInviteParams) {
        const errors = await this.validateParams(params.idMentoringInvite)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const update = await this.MentoringInviteRepository.acceptInvite({ status: "ACCEPT", updateAt: new Date() });

        if (!update) {
            throw new EntityNotUpdatedError()
        } else {
            this.MentoringInviteRepository.refuseAllPeddingInvites(
                { idStudent: params.idStudent, status: "PEDDING" },
                { updateAt: new Date(), status: "REFUSED" }
            )
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