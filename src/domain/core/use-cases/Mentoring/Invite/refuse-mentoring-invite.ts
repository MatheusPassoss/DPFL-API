import { MentoringInvite } from "../../../entities/mentoring-invite";
import { EntityNotFound } from "../../../exceptions/entity-not-found";
import { IMentoringInviteRepository } from "../../../repositories/Mentoring/Invite/IMentoringInvite-repository";
import { InvalidParamError } from "../../../exceptions/invalid-param-error";
import { EntityNotUpdatedError } from "../../../exceptions/entity-not-updated-error";
import { IUseCase } from "../../../shared-global/IUse-case";



interface RefuseMentoringInviteParams {
    idMentoringInvite: string
    idMentor: string,
    idStudent: string
}

export class RefuseMentoringInvite implements IUseCase<RefuseMentoringInviteParams, MentoringInvite>{

    private readonly MentoringInviteRepository: IMentoringInviteRepository

    constructor(InviteRepository: IMentoringInviteRepository) {
        this.MentoringInviteRepository = InviteRepository
    }


    async execute(params: RefuseMentoringInviteParams): Promise<MentoringInvite> {
        const errors = await this.validateParams(params.idMentoringInvite)

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filterInvite: Partial<MentoringInvite> = {
            id: params.idMentoringInvite,
            idStudent: params.idStudent,
            status: "PEDDING"
        }

        const updateInvite: Partial<MentoringInvite> = {
            status: "REFUSED",
            updateAt: new Date()
        }

        const refused = await this.MentoringInviteRepository.findOneAndUpdate(filterInvite, updateInvite);
        
        if (!refused) {
            throw new EntityNotUpdatedError()
        }

        return refused;
    }

    private async validateParams(idMentoringInvite: string): Promise<Error[] | null> {
        const errors: Error[] = []

        const inviteExists = await this.MentoringInviteRepository.findById(idMentoringInvite)

        if (!inviteExists) {
            errors.push(new EntityNotFound("Mentoring Invite"))
        }

        return errors.length > 0 ? errors : null

    }

}