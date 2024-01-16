import { IStudentRepository } from "../../repositories/IStudent-repository";
import { IUseCase } from "../../shared-global/IUse-case";
import { MentoringInvite } from "../../entities/mentoringInvite";
import { EntityNotFound } from "../../exceptions/entity-not-found";
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { IMentoringInviteRepository } from "../../repositories/IMentoringInvite-repository";
 

interface StudentAllowedToInviteParams {
    idStudent: string
}


export class StudentAllowedToInvite implements IUseCase<StudentAllowedToInviteParams, boolean> {
    private readonly studentRepository: IStudentRepository
    private readonly mentoringInviteRepository: IMentoringInviteRepository

    constructor(studentRepository: IStudentRepository, mentoringRepository: IMentoringInviteRepository) {
        this.studentRepository = studentRepository
        this.mentoringInviteRepository = mentoringRepository
    }

    async execute(params: StudentAllowedToInviteParams): Promise<boolean> {

        const errors = await this.validateParams(params.idStudent);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const mentoringInviteAcceptedOrNull: MentoringInvite[] | null = await this.mentoringInviteRepository.listByStudentId(params.idStudent);

        if (!mentoringInviteAcceptedOrNull) return true;

        return mentoringInviteAcceptedOrNull.length == 0
    }

    private async validateParams(idStudent: string): Promise<Error[] | null> {
        const errors: Error[] = []

        const studentExists = await this.studentRepository.findById(idStudent)

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        return errors.length > 0 ? errors : null;
    }
}