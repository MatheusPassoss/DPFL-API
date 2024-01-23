import { IMentoringRepository } from "../../repositories/Mentoring/IMentoring-repositorie";
import { IUseCase } from "../../shared-global/IUse-case";
import { IMentorRepository } from "../../repositories/User/IMentor-repositorie";
import { IStudentRepository } from "../../repositories/User/IStudent-repository";
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { EntityNotFound } from "../../exceptions/entity-not-found";
import { Mentoring } from "../../entities/metoring";
import { IMeetingRepository } from "../../repositories/Mentoring/Meeting/IMentoring-meeting-repository";
import { MentoringMeeting } from "../../entities/MentoringMeeting";
import { NotEnoughMeetings } from "../../exceptions/not-enough-meetings";

interface CompleteMentoringParams {
    id: string
    idStudent: string,
    idMentor: string,
}

export class CompleteMentoring implements IUseCase<CompleteMentoringParams, Mentoring> {


    repository: IMentoringRepository
    private readonly meetingRepository: IMeetingRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMentoringRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository, meetingRepository: IMeetingRepository) {
        this.repository = repository
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
        this.meetingRepository = meetingRepository
    }

    async execute(params: CompleteMentoringParams): Promise<Mentoring | null> {

        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<Mentoring> = {
            id: params.id,
            idStudent: params.idStudent,
            idMentor: params.idMentor
        }

        const update: Partial<Mentoring> = {
            status: "COMPLETED",
            updateAt: new Date(),
        }

        const completed = this.repository.findOneAndUpdate(filter, update)

        if (completed) {
            return completed
        }

        return null

    }

    async validateParams(params: CompleteMentoringParams) {

        const errors: Error[] = [];
        const mentoringExits = this.repository.findById(params.id)
        const mentorExits = this.mentorRepository.findById(params.idMentor)
        const studentExists = this.studentRepository.findById(params.idStudent)

        const filterMeetings: Partial<MentoringMeeting> = {
            idMentor: params.idMentor,
            idStudent: params.idStudent,
            status: "CONFIRMED"
        }

        const hasEnoughMeetings: MentoringMeeting[] = await this.meetingRepository.findMany(filterMeetings)

        if (hasEnoughMeetings.length < 12) {
            errors.push(new NotEnoughMeetings())
        }

        if (!mentoringExits) errors.push(new EntityNotFound("Mentoring"));

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;


    }

}