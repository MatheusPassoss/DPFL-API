import { MentoringInvite } from "../../../entities/mentoring-invite";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error";
import { IUseCase } from "../../../shared-global/IUse-case";
import { InvitationAlreadyAccepted } from "../../../exceptions/invitation-already-accepted-error";

interface AcceptMentoringInviteParams {
    idMentoringInvite: string
    idStudent: string
    idMentor: string
}

export class AcceptMentoringInvite implements IUseCase<AcceptMentoringInviteParams, MentoringInvite> {

    private readonly MentoringInviteRepository: IMentoringInviteRepository

    constructor(InviteRepository: IMentoringInviteRepository) {
        this.MentoringInviteRepository = InviteRepository
    }

    async execute(params: AcceptMentoringInviteParams): Promise<MentoringInvite> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterInvite: Partial<MentoringInvite> = {
            id: params.idMentoringInvite,
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            status: "PEDDING"
        }

        const updateInvite: Partial<MentoringInvite> = {
            status: "ACCEPTED",
            updateAt: new Date()
        }

        const update = await this.MentoringInviteRepository.acceptInvite(filterInvite, updateInvite);
    
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

    private async validateParams(params: AcceptMentoringInviteParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const inviteExists = await this.MentoringInviteRepository.findById(params.idMentoringInvite)

        const invitationAceptedFilter: Partial<MentoringInvite> = {
            idStudent: params.idStudent,
            status: "ACCEPTED"
        }

        const inviteAcepptedExits = await this.MentoringInviteRepository.findAcceptedInvite(invitationAceptedFilter)

        if (!inviteExists) {
            errors.push(new EntityNotFound("Mentoring Invite"))
        }
        
        if (inviteAcepptedExits) {
            errors.push(new InvitationAlreadyAccepted())
        }

        return errors.length > 0 ? errors : null

    }

}