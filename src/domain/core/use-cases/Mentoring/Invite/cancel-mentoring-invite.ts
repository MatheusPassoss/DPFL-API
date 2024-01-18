import { MentoringInvite } from "../../../entities/mentoringInvite";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentorRepository } from "../../../repositories/User/IMentor-repositorie";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { EntityNotFound } from "../../../exceptions/entity-not-found";


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


    async execute(params: CancelMentoringInviteParams) {

        const errors = this.validateParams(params);

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

        const canceled = this.repository.findOneAndUpdate(filter, update)

        return canceled

    }

    validateParams(params: CancelMentoringInviteParams) {

        const errors: Error[] = [];

        const mentorExits = this.mentorRepository.findById(params.idMentor)
        const studentExists = this.studentRepository.findById(params.idStudent)
        const inviteExists = this.repository.findById(params.id)

        if (!inviteExists) errors.push(new EntityNotFound("Mentoring Invite"));

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;


    }
}