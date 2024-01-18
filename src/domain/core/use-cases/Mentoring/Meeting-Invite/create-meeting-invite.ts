import { MentoringMeetingInvite } from "../../../entities/MentoringMeetingInvite"
import { IMeetingInviteRepository } from "../../../repositories/Mentoring/Meeting-invite/IMentoring-meeting-invite-repository"
import { IUseCase } from "../../../shared-global/IUse-case"
import { IStudentRepository } from "../../../repositories/User/IStudent-repository"
import { IMentorRepository } from "../../../repositories/User/IMentor-repositorie"
import { EntityNotSavedError } from "../../../exceptions/entity-not-saved-error"
import { InvalidParamError } from "../../../exceptions/invalid-param-error"
import { EntityNotFound } from "../../../exceptions/entity-not-found"
import { DateInUse } from "../../../exceptions/date-in-use"

interface CreateMeetingInviteParams {
    idStudent: string
    idMentor: string
    date: Date
}

export class CreateMeetingInvite implements IUseCase<CreateMeetingInviteParams, MentoringMeetingInvite>{

    private readonly repository: IMeetingInviteRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMeetingInviteRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {

        this.repository = repository;
        this.studentRepository = studentRepository;
        this.mentorRepository = mentorRepository
    }

    async execute(params: CreateMeetingInviteParams): Promise<MentoringMeetingInvite> {
        
        const errors = this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const id = crypto.randomUUID()
        const newMentoringMeetingInvite = MentoringMeetingInvite.create(id, params.idStudent, params.idMentor, params.date);
        
        const created = await this.repository.save(newMentoringMeetingInvite)
        if (!created) {
            throw new EntityNotSavedError()
        }

        return created
    }

    validateParams(params: CreateMeetingInviteParams) {

        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idStudent)

        const dateInUseFilter: Partial<MentoringMeetingInvite> = {
            idMentor: params.idMentor,
            idStudent: params.idStudent,
            date: params.date
        }

        const dateInUse = this.repository.findOne(dateInUseFilter)

        if (dateInUse != null) {
            errors.push(new DateInUse(params.date))
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