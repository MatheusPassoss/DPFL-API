
import { MentoringMeetingInvite } from "../../../entities/MentoringMeetingInvite"
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error"

interface AcceptMeetingInviteParams {
    idMeetingInvite: string,
}

export class AcceptMeetingInvite implements IUseCase<AcceptMeetingInviteParams, MentoringMeetingInvite> {

    private readonly repository: IMeetingInviteRepository

    constructor(repository: IMeetingInviteRepository) {
        this.repository = repository
    }

    async execute(params: AcceptMeetingInviteParams): Promise<MentoringMeetingInvite> {

        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const filterMeetingInvite: Partial<MentoringMeetingInvite> = {
            id: params.idMeetingInvite,
            status: "PEDDING"
        }

        const updateMeetingInvite: Partial<MentoringMeetingInvite> = {
            status: "ACEPPTED", 
            updateAt: new Date().toLocaleDateString()
        }

        const acceptInvite = await this.repository.findOneAndUpdate(filterMeetingInvite, updateMeetingInvite)
        if (!acceptInvite) {
            throw new EntityNotUpdatedError()
        }

        return acceptInvite

    }

    private async validateParams(params: AcceptMeetingInviteParams) {
        const errors: Error[] = []

        const meetingInviteExists = await this.repository.findById(params.idMeetingInvite)

        if (!meetingInviteExists) {
            errors.push(new EntityNotFound("Mentoring Meeting Invite"))
        }

        return errors.length > 0 ? errors : null

    }
}