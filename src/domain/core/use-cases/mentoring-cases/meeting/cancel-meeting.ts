// Entre 01 hora,
//  ou duas, após a data e horário da reunião de Mentoria, eu 
//  envio uma notificação, questionando 
//  sobre um feedback da Mentoria e uma Cancelação se ela foi realizada. 


import { MentoringMeeting } from "../../../entities/mentoring-meeting"
import { IMeetingRepository } from "../../../repositories/Mentoring/Meeting/IMentoring-meeting-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error"
import { InvitationAlreadyAccepted } from "../../../exceptions/invitation-already-accepted-error"

interface CancelMentoringMeetingParams {
    idMentoringMeeting: string
    idStudent: string
    idMentor: string

}

export class CancelMentoringMeeting implements IUseCase<CancelMentoringMeetingParams, MentoringMeeting> {

    private readonly MeetingRepository: IMeetingRepository

    constructor(Repository: IMeetingRepository) {
        this.MeetingRepository = Repository
    }

    async execute(params: CancelMentoringMeetingParams): Promise<MentoringMeeting> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<MentoringMeeting> = {
            id: params.idMentoringMeeting,
            idStudent: params.idStudent,
            idMentor: params.idMentor,
        }

        const update: Partial<MentoringMeeting> = {
            status: "CANCELED",
            updateAt: new Date()
        }

        const updated = await this.MeetingRepository.findOneAndUpdate(filter, update);

        if (!updated) {
            throw new EntityNotUpdatedError()
        }

        return updated;
    }

    private async validateParams(params: CancelMentoringMeetingParams): Promise<Error[] | null> {
       
        const errors: Error[] = []

        const exists = await this.MeetingRepository.findById(params.idMentoringMeeting)

        if (!exists) {
            errors.push(new EntityNotFound("Mentoring Meeting"))
        }

        return errors.length > 0 ? errors : null

    }

}