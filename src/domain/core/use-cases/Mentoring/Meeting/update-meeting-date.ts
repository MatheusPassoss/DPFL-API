import { MentoringMeeting } from "../../../entities/MentoringMeeting";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { IMeetingRepository } from "../../../repositories/Mentoring/Meeting/IMentoring-meeting-repository";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error";
import { IUseCase } from "../../../shared-global/IUse-case";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IMentorRepository } from "../../../repositories/User/IMentor-repositorie";
import { DateInUse } from "../../../exceptions/date-in-use";

interface UpdateMentoringMeetingParams {
    idMentoringMeeting: string,
    idStudent: string
    idMentor: string
    date: Date
}

export class UpdateMentoringMeeting implements IUseCase<UpdateMentoringMeetingParams, MentoringMeeting> {

    private readonly MentoringMeetingRepository: IMeetingRepository
    private readonly studentRepository: IStudentRepository
    private readonly mentorRepository: IMentorRepository


    constructor(repository: IMeetingRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.MentoringMeetingRepository = repository
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
    }

    async execute(params: UpdateMentoringMeetingParams): Promise<MentoringMeeting> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterMeeting: Partial<MentoringMeeting> = {
            id: params.idMentoringMeeting,
            idStudent: params.idStudent,
            idMentor: params.idMentor
        }

        const updateMeeting: Partial<MentoringMeeting> = {
            date: params.date,
            status: "PEDDING",
            updateAt: new Date()
        }

        const updated = await this.MentoringMeetingRepository.findOneAndUpdate(filterMeeting, updateMeeting)

        if (!updated) {
            throw new EntityNotUpdatedError()
        }

        return updated
    }

    private async validateParams(params: UpdateMentoringMeetingParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const MeetingExists = await this.MentoringMeetingRepository.findById(params.idMentoringMeeting)
        const studentExists = await this.studentRepository.findById(params.idStudent)
        const mentorExists = await this.mentorRepository.findById(params.idMentor)

        const filterDate: Partial<MentoringMeeting> = {
            date: params.date,
            idStudent: params.idStudent,
            idMentor: params.idMentor,
        }

        const dateInUse = await this.MentoringMeetingRepository.findOne(filterDate)

        if (dateInUse != null) {
            errors.push(new DateInUse(params.date))
        }

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        if (!MeetingExists) {
            errors.push(new EntityNotFound("Mentoring Invite"))
        }

        return errors.length > 0 ? errors : null

    }

}