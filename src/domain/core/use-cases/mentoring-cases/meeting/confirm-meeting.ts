// Entre 01 hora,
//  ou duas, após a data e horário da reunião de Mentoria, eu 
//  envio uma notificação, questionando 
//  sobre um feedback da Mentoria e uma confirmação se ela foi realizada. 


import { MentoringMeeting } from "../../../entities/mentoring-meeting"
import { IMeetingRepository } from "../../../repositories/Mentoring/Meeting/IMentoring-meeting-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error"
import { InvitationAlreadyAccepted } from "../../../exceptions/invitation-already-accepted-error"

interface ConfirmMentoringMeetingParams {
    idMentoringMeeting: string
    idStudent: string
    idMentor: string

}

export class ConfirmMentoringMeeting implements IUseCase<ConfirmMentoringMeetingParams, MentoringMeeting> {

    private readonly MeetingRepository: IMeetingRepository

    constructor(Repository: IMeetingRepository) {
        this.MeetingRepository = Repository
    }

    async execute(params: ConfirmMentoringMeetingParams): Promise<MentoringMeeting> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<MentoringMeeting> = {
            id: params.idMentoringMeeting,
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            status: "NOT-CONFIRMED"
        }

        const update: Partial<MentoringMeeting> = {
            status: "CONFIRMED",
            updateAt: new Date()
        }

        const updated = await this.MeetingRepository.findOneAndUpdate(filter, update);

        if (!updated) {
            throw new EntityNotUpdatedError()
        }

        return updated;
    }

    private async validateParams(params: ConfirmMentoringMeetingParams): Promise<Error[] | null> {
       
        const errors: Error[] = []

        const Exists = await this.MeetingRepository.findById(params.idMentoringMeeting)

        const invitationAceptedFilter: Partial<MentoringMeeting> = {
            idStudent: params.idStudent,
            status: "CONFIRMED"
        }

        const AcepptedExits = await this.MeetingRepository.findOne(invitationAceptedFilter)

        if (!Exists) {
            errors.push(new EntityNotFound("Mentoring Meeting "))
        }
        
        if (AcepptedExits) {
            errors.push(new InvitationAlreadyAccepted())
        }

        return errors.length > 0 ? errors : null

    }

}