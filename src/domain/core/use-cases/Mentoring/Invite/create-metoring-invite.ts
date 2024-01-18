import { MentoringInvite } from "../../../entities/mentoringInvite";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository"
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IMentorRepository } from "../../../repositories/User/IMentor-repositorie";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { MentorAllowedToInvite } from "./mentor-allowed-to-invite";
import { MentorNotAllowedToInvite } from "../../../exceptions/mentor-not-allowed-to-invite";
import { EntityNotSavedError } from "../../../exceptions/entity-not-saved-error";
import { IUseCase } from "../../../shared-global/IUse-case";
import { StudentAllowedToInvite } from "./student-allowed-to-invite";
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repositorie";
import { StudentNotAllowedToInvite } from "../../../exceptions/student-not-allowed-to-invite";

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

    constructor(repository: IMentoringInviteRepository) {
        this.repository = repository
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

    private async validateParams(params: CreateMentoringInviteParams) {
        const errors: Error[] = [];

        const studentExists = this.studentRepository.findById(params.idStudent)
        const mentorExists = this.mentorRepository.findById(params.idStudent)
        const mentorAllowedToInvite = await new MentorAllowedToInvite(this.mentorRepository, this.repository).execute({mentorId: params.idMentor})
        const studentAllowedToInvite = await new StudentAllowedToInvite(this.studentRepository, this.mentoringRepository).execute({idStudent: params.idStudent})


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