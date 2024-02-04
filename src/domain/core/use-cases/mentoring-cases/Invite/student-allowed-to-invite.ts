import { IStudentRepository } from "../../../repositories/User/IStudent-repository";
import { IUseCase } from "../../../shared-global/IUse-case";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { IMentoringRepository } from "../../../repositories/Mentoring/IMentoring-repository";
import { Mentoring } from "../../../entities/metoring";
import { MentoringInvite } from "../../../entities/mentoring-invite";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
 

interface StudentAllowedToInviteParams {
    idStudent: string
}


export class StudentAllowedToInvite implements IUseCase<StudentAllowedToInviteParams, boolean> {
    private readonly studentRepository: IStudentRepository
    private readonly mentoringInviteRepository: IMentoringInviteRepository
    private readonly mentoringRepository: IMentoringRepository

    constructor(studentRepository: IStudentRepository, mentoringInviteRepository: IMentoringInviteRepository, mentoringRepository: IMentoringRepository) {
        this.studentRepository = studentRepository
        this.mentoringInviteRepository = mentoringInviteRepository
        this.mentoringRepository = mentoringRepository
    }

    async execute(params: StudentAllowedToInviteParams): Promise<boolean> {

        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterMentoringInviteAccepted: Partial<MentoringInvite> = {
            idStudent: params.idStudent,
            status: "ACCEPTED"
        }

        const filterMentoringInProgress: Partial<Mentoring> = {
            idStudent: params.idStudent,
            status: "PROGRESS"
        }




        const mentoringInviteAcceptedOrNull: MentoringInvite | null = await this.mentoringInviteRepository.findAcceptedInvite(filterMentoringInviteAccepted)  

        const mentoringInProgressOrNull: Mentoring | null = await this.mentoringRepository.findOne(filterMentoringInProgress);

        return mentoringInProgressOrNull === null && mentoringInviteAcceptedOrNull === null
    }

    private async validateParams(params: StudentAllowedToInviteParams): Promise<Error[] | null> {
        const errors: Error[] = []
        const studentExists = await this.studentRepository.findById(params.idStudent)

        if (!studentExists) {
            errors.push(new EntityNotFound("Student"))
        }

        return errors.length > 0 ? errors : null;
    }
}


