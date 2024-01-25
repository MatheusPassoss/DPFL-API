import { Mentoring } from "../../entities/metoring";
import { EntityNotUpdatedError } from "../../exceptions/entity-not-updated-error";
import { IMentoringRepository } from "../../repositories/Mentoring/IMentoring-repository";
import { IMentorRepository } from "../../repositories/User/IMentor-repository";
import { IStudentRepository } from "../../repositories/User/IStudent-repository";
import { IUseCase } from "../../shared-global/IUse-case";
import { EntityNotFound } from "../../exceptions/entity-not-found";
import { InvalidParamError } from "../../exceptions/invalid-param-error";

interface CancelMentoringParams {
    id: string,
    idStudent: string,
    idMentor: string,
}

export class CancelMentoring implements IUseCase<CancelMentoringParams, Mentoring> {

    repository: IMentoringRepository
    studentRepository: IStudentRepository
    mentorRepository: IMentorRepository

    constructor(repository: IMentoringRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.repository = repository,
        this.mentorRepository = mentorRepository,
        this.studentRepository = studentRepository
    }

    async execute(params: CancelMentoringParams): Promise<Mentoring> {
        const errors = await this.validateParams(params)

        if (errors) {
            throw new InvalidParamError(errors)
        }

        const filterMentoring: Partial<Mentoring> = {
            idStudent: params.idStudent,
            idMentor: params.idMentor,
            id: params.id,
        }

        const updateMentoring: Partial<Mentoring> = {
            status: "CANCELED",
            updateAt: new Date()
        }

        const canceledMentoring = await this.repository.findOneAndUpdate(filterMentoring, updateMentoring)

        if (!canceledMentoring) {
            throw new EntityNotUpdatedError()
        }

        return canceledMentoring

    }

    async validateParams(params: CancelMentoringParams): Promise<Error[] | null> {
        const errors: Error[] = []

        const mentoringExits = this.repository.findById(params.id)
        const mentorExits = this.mentorRepository.findById(params.idMentor)
        const studentExists = this.studentRepository.findById(params.idStudent)

        if (!mentoringExits) errors.push(new EntityNotFound("Mentoring"));

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;

    }
}