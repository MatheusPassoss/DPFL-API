import { MentoringMeeting } from "../../../entities/mentoring-meeting"
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { IStudentRepository } from "../../../repositories/User/IStudent-repository"
import { IMentorRepository } from "../../../repositories/User/IMentor-repository"
import { EntityNotSavedError } from "../../../exceptions/entity-not-saved-error"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { DateInUse } from "../../../exceptions/date-in-use"
import { crypto } from "../../../../.."
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repository"
import { MentoringNotInProgress } from "../../../exceptions/mentoring-not-in-progress-error"
import { IMeetingRepository } from "../../../repositories/Mentoring/Meeting/IMentoring-meeting-repository"


interface CreateMeetingParams {
    idStudent: string
    idMentor: string
    date: Date
}

export class CreateMeeting implements IUseCase<CreateMeetingParams, MentoringMeeting> {

    private readonly repository: IMeetingRepository
    private readonly mentoringRepository: IMentoringRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMeetingRepository, mentoringRepository: IMentoringRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {

        this.repository = repository;
        this.studentRepository = studentRepository;
        this.mentorRepository = mentorRepository
        this.mentoringRepository = mentoringRepository
    }

    async execute(params: CreateMeetingParams): Promise<MentoringMeeting> {

        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const id = crypto.randomUUID()
        const newMentoringMeeting = MentoringMeeting.create(params.date, params.idMentor, params.idStudent, id);

        const created = await this.repository.save(newMentoringMeeting)
        
        if (!created) {
            throw new EntityNotSavedError()
        }

        return created
    }

    private async validateParams(params: CreateMeetingParams): Promise<Error[] | null> {

        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idStudent)

        
        const mentoringInProgress = await this.mentoringRepository.findOne({
            idStudent: params.idStudent,
            idMentor: params.idMentor, 
            status: "PROGRESS"
        })
          
        const dateInUseFilter: Partial<MentoringMeeting> = {
            idMentor: params.idMentor,
            idStudent: params.idStudent,
            date: params.date
        }

        const dateInUse = await this.repository.findOne(dateInUseFilter)

        if (!mentoringInProgress) {
            errors.push(new MentoringNotInProgress())
        }

        if (dateInUse != null) {
            errors.push(new DateInUse(params.date))
        }

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        return errors.length > 0 ? errors : null
    }
}   