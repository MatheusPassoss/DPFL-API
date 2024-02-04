import { MentoringInvite } from "../../../entities/mentoring-invite";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentorRepository } from "../../../repositories/User/IMentor-repository";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidInviteStatusError } from "../../../exceptions/invalid-invite-status-error";
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error";


interface CancelMentoringInviteParams {
    id: string
    idStudent: string,
    idMentor: string,
}

export class CancelMentoringInvite implements IUseCase<CancelMentoringInviteParams, MentoringInvite> {

    private readonly repository: IMentoringInviteRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMentoringInviteRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.repository = repository
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
    }

    async execute(params: CancelMentoringInviteParams): Promise<MentoringInvite> {

        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<MentoringInvite> = {
            id: params.id,
            idStudent: params.idStudent,
            idMentor: params.idMentor
        }

        const update: Partial<MentoringInvite> = {
            status: "CANCELED",
            updateAt: new Date(),
        }

        const canceled = await this.repository.cancelInvite(filter)
        if (!canceled) {
            throw new EntityNotUpdatedError()
        }

        return canceled

    }

    private async validateParams(params: CancelMentoringInviteParams): Promise<Error[] | null> {

        const errors: Error[] = [];

        const mentorExits = await this.mentorRepository.findById(params.idMentor)
        const studentExists = await this.studentRepository.findById(params.idStudent)
        const inviteExists = await this.repository.findById(params.id)

        if (!inviteExists) errors.push(new EntityNotFound("Mentoring Invite"));

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        if (inviteExists && inviteExists.status != "PEDDING") {
            errors.push(new InvalidInviteStatusError(inviteExists.status))
        }

        return errors.length > 0 ? errors : null;

    }
}