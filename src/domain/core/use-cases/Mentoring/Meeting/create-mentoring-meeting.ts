import { MentoringMeeting } from "../../../entities/mentoring-meeting";
import { IMentorRepository } from "../../../repositories/User/IMentor-repository";
import { IMeetingRepository } from "../../../repositories/Mentoring/Meeting/IMentoring-meeting-repository";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { EntityNotSavedError } from "../../../exceptions/entity-not-saved-error";
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository";
import { MentoringMeetingInvite } from "../../../entities/mentoring-meeting-invite";
import { MeetingInviteNotAceppted } from "../../../exceptions/meeting-invite-not-aceppted";

interface CreateMentoringMeetingParams {
    idStudent: string,
    idMentor: string,
    date: Date
}

export class CreateMentoringMeeting implements IUseCase<CreateMentoringMeetingParams, MentoringMeeting> {

    repository: IMeetingRepository
    meetingInviteRepository: IMeetingInviteRepository
    studentRepository: IStudentRepository
    mentorRepository: IMentorRepository

    constructor(repository: IMeetingRepository, meetingInviteRepository: IMeetingInviteRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {

        this.repository = repository;
        this.meetingInviteRepository = meetingInviteRepository
        this.studentRepository = studentRepository;
        this.mentorRepository = mentorRepository
    }

    async execute(params: CreateMentoringMeetingParams): Promise<MentoringMeeting> {

        const errors = this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const id = crypto.randomUUID()
        const newMentoringMeeting = MentoringMeeting.create(params.date, params.idMentor, params.idStudent, id);

        const saved = await this.repository.save(newMentoringMeeting)

        if (!saved) {
            throw new EntityNotSavedError()
        }
        
        return saved
    }

    validateParams(params: CreateMentoringMeetingParams) {

        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idStudent)

        const inviteIsAcepptedFilter: Partial<MentoringMeetingInvite> = {
            idMentor: params.idMentor,
            idStudent: params.idStudent,
            status: "ACEPPTED",
        }

        const inviteIsAceppted = this.meetingInviteRepository.findOne(inviteIsAcepptedFilter)

        if (!inviteIsAceppted) {
            errors.push(new MeetingInviteNotAceppted())
        }

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        return errors.length > 0 ? errors : null;
    }
}   