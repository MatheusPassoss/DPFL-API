import { MentoringInvite } from "../entities/mentoringInvite";
import { IMentoringInviteRepository } from "../repositories/IMentoringInvite-repository"
import { InvalidParamError } from "../exceptions/invalid-param-error";
import { IStudentRepository } from "../repositories/IStudent-repository";
import { IMentorRepository } from "../repositories/IMentor-repositorie";
import { EntityNotFound } from "../exceptions/entity-not-found";
import { MentorAllowedToInvite } from "./mentor-allowed-to-invite";
import { MentorNotAllowedToInvite } from "../exceptions/mentor-not-allowed-to-invite";
import { EntityNotSavedError } from "../exceptions/entity-not-saved-error";


interface CreateMentoringInviteParams {
    idMentor: string
    idStudent: string
    createAt: Date
}

export class CreateMentoringInvite {

    private readonly repository: IMentoringInviteRepository
    private readonly studentRepository: IStudentRepository
    private readonly mentorRepository: IMentorRepository

    constructor(repository: IMentoringInviteRepository) {
        this.repository = repository
    }

    async execute(params: CreateMentoringInviteParams): Promise<MentoringInvite> {
        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const id = "aaabbbbccc"
        const date = new Date()

        const newMentoringInvite = MentoringInvite.create(params.idMentor, params.idStudent, id, date);

        const saved = await this.repository.save(newMentoringInvite);
        if (!saved) {
            throw new EntityNotSavedError()
        }

        return saved;
    }

    private async validateParams(params: CreateMentoringInviteParams) {
        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idStudent)
        const mentorAllowedToInvite = await new MentorAllowedToInvite(this.mentorRepository, this.repository).verify(params.idMentor)

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        if (!mentorExists) {
            errors.push(new EntityNotFound("Mentor"))
        }

        if (!mentorAllowedToInvite) {
            errors.push(new MentorNotAllowedToInvite())
        }

        return errors.length > 0 ? errors : null;
    }




}