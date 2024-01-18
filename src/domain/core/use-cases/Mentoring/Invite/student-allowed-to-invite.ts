import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repositorie";
import { Mentoring } from "../../../entities/metoring";
 

interface StudentAllowedToInviteParams {
    idStudent: string
}


export class StudentAllowedToInvite implements IUseCase<StudentAllowedToInviteParams, boolean> {
    private readonly studentRepository: IStudentRepository
    private readonly mentoringRepository: IMentoringRepository

    constructor(studentRepository: IStudentRepository, mentoringRepository: IMentoringRepository) {
        this.studentRepository = studentRepository
        this.mentoringRepository = mentoringRepository
    }

    async execute(params: StudentAllowedToInviteParams): Promise<boolean> {

        const errors = await this.validateParams(params.idStudent);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<Mentoring> = {
            idStudent: params.idStudent,
            status: "PROGRESS"
        }

        const mentoringInProgressOrNull: Mentoring | null = await this.mentoringRepository.findOne(filter);

        return mentoringInProgressOrNull == null
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