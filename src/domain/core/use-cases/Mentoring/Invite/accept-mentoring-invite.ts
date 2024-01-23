import { MentoringInvite } from "../../../entities/mentoringInvite";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error";
import { IUseCase } from "../../../shared-global/IUse-case";

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

        const filterInvite: Partial<MentoringInvite> = {
            id: params.idMentoringInvite,
            idStudent: params.idStudent,
            status: "PEDDING"
        }

        const updateInvite: Partial<MentoringInvite> = {
            status: "ACCEPTED",
            updateAt: new Date()
        }

        const update = await this.MentoringInviteRepository.findOneAndUpdate(filterInvite, updateInvite);

        if (!update) {
            throw new EntityNotUpdatedError()
        } else {

            let filterAllInvites: Partial<MentoringInvite> = {
                idStudent: params.idStudent,
                status: "PEDDING"
            }

            let updateAllInvites: Partial<MentoringInvite> = {
                status: "REFUSED",
                updateAt: new Date()
            }

            this.MentoringInviteRepository.refuseAllPeddingInvites(filterAllInvites, updateAllInvites)
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