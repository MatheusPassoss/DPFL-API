
import { MentoringMeetingInvite } from "../../../entities/mentoring-meeting-invite"
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error"

interface RefuseMeetingInviteParams {
    idMeetingInvite: string,
}

export class RefuseMeetingInvite implements IUseCase<RefuseMeetingInviteParams, MentoringMeetingInvite> {

    private readonly repository: IMeetingInviteRepository

    constructor(repository: IMeetingInviteRepository) {
        this.repository = repository
    }

    async execute(params: RefuseMeetingInviteParams): Promise<MentoringMeetingInvite> {

        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const filterMeetingInvite: Partial<MentoringMeetingInvite> = {
            id: params.idMeetingInvite,
            status: "PEDDING"
        }

        const updateMeetingInvite: Partial<MentoringMeetingInvite> = {
            status: "REFUSED", 
            updateAt: new Date().toLocaleDateString()
        }

        const refusedInvite = await this.repository.findOneAndUpdate(filterMeetingInvite, updateMeetingInvite)
        if (!refusedInvite) {
            throw new EntityNotUpdatedError()
        }

        return refusedInvite

    }

    private async validateParams(params: RefuseMeetingInviteParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const meetingInviteExists = await this.repository.findById(params.idMeetingInvite)

        if (!meetingInviteExists) {
            errors.push(new EntityNotFound("Mentoring Meeting Invite"))
        }

        return errors.length > 0 ? errors : null

    }
}