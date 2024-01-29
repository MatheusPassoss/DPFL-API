
import { MentoringMeetingInvite } from "../../../entities/mentoring-meeting-invite"
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error"
import { InvitationAlreadyAccepted } from "../../../exceptions/invitation-already-accepted-error"

interface AcceptMeetingInviteParams {
    idMentoringMeetingInvite: string
    idStudent: string
    idMentor: string

}

export class AcceptMentoringMeetingInvite implements IUseCase<AcceptMeetingInviteParams, MentoringMeetingInvite> {

    private readonly MeetingInviteRepository: IMeetingInviteRepository

    constructor(InviteRepository: IMeetingInviteRepository) {
        this.MeetingInviteRepository = InviteRepository
    }

    async execute(params: AcceptMeetingInviteParams): Promise<MentoringMeetingInvite> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterInvite: Partial<MentoringMeetingInvite> = {
            id: params.idMentoringMeetingInvite,
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            status: "PEDDING"
        }

        const updateInvite: Partial<MentoringMeetingInvite> = {
            status: "ACCEPTED",
            updateAt: new Date()
        }

        const update = await this.MeetingInviteRepository.acceptInvite(filterInvite, updateInvite);

        if (!update) {
            throw new EntityNotUpdatedError()
        } 

        return update;
    }


    
    private async validateParams(params: AcceptMeetingInviteParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const inviteExists = await this.MeetingInviteRepository.findById(params.idMentoringMeetingInvite)

        const invitationAceptedFilter: Partial<MentoringMeetingInvite> = {
            idStudent: params.idStudent,
            status: "ACCEPTED"
        }

        // const inviteAcepptedExits = await this.MeetingInviteRepository.findAcceptedInvite(invitationAceptedFilter)

        if (!inviteExists) {
            errors.push(new EntityNotFound("Mentoring Invite"))
        }
        
        // if (inviteAcepptedExits) {
        //     errors.push(new InvitationAlreadyAccepted())
        // }

        return errors.length > 0 ? errors : null

    }

}