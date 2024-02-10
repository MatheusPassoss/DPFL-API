import { MentoringInvite } from "../../../entities/mentoring-invite";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IMentorRepository } from "../../../repositories/User/IMentor-repository";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { MentorAllowedToInvite } from "./mentor-allowed-to-invite";
import { MentorNotAllowedToInvite } from "../../../exceptions/mentor-not-allowed-to-invite";
import { EntityNotSavedError } from "../../../exceptions/entity-not-saved-error";
import { IUseCase } from "../../../shared-global/IUse-case";
import { StudentAllowedToInvite } from "./student-allowed-to-invite";
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repository";
import { StudentNotAllowedToInvite } from "../../../exceptions/student-not-allowed-to-invite";
import { crypto } from "../../../../..";

interface CreateMentoringInviteParams {
    idMentor: string
    idStudent: string
    createAt: Date
}

export class CreateMentoringInvite implements IUseCase<CreateMentoringInviteParams, MentoringInvite>{

    private readonly repository: IMentoringInviteRepository
    private readonly mentoringRepository: IMentoringRepository
    private readonly studentRepository: IStudentRepository
    private readonly mentorRepository: IMentorRepository

    constructor(repository: IMentoringInviteRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository, mentoringRepository: IMentoringRepository) {
        this.repository = repository
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
        this.mentoringRepository = mentoringRepository
    }

    async execute(params: CreateMentoringInviteParams): Promise<MentoringInvite> {
        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const id = crypto.randomUUID()
        const date = new Date()

        const newMentoringInvite = MentoringInvite.create(params.idMentor, params.idStudent, id, date);

        const saved = await this.repository.save(newMentoringInvite);
        if (!saved) {
            throw new EntityNotSavedError()
        }

        return saved;
    }

    private async validateParams(params: CreateMentoringInviteParams): Promise<Error[] | null> {
        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idMentor)
        const mentorAllowedToInvite = await new MentorAllowedToInvite(this.mentorRepository, this.repository, this.mentoringRepository).execute({idMentor: params.idMentor})
        const studentAllowedToInvite = await new StudentAllowedToInvite(this.studentRepository, this.repository, this.mentoringRepository).execute({idStudent: params.idStudent})


        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        if (!mentorAllowedToInvite) {
            errors.push(new MentorNotAllowedToInvite())
        }

        if (!studentAllowedToInvite) {
            errors.push(new StudentNotAllowedToInvite())
        }

        return errors.length > 0 ? errors : null;
    }

}