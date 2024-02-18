import { Mentor } from "../../entities/user/mentor";
import { IMentorRepository } from "../../repositories/User/IMentor-repository";
import { crypto } from "../../../../server";
import { InvalidNameError } from "../../exceptions/invalid-name-error";
import { InvalidCpfError } from "../../exceptions/invalid-cpf-error";
import { EntityNotSavedError } from "../../exceptions/entity-not-saved-error"
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { IUseCase } from "../../shared-global/IUse-case";


interface CreateMentorParams {

    id?: string
    name: string
    email: string
    cpf: string
    phone: string
    birthDate: Date
    address: {
        cep: string,
        city: string,
        state: string,
        road: string,
        number: string,
        complement?: string
    }

}

export class CreateMentorUseCase implements IUseCase<CreateMentorParams, Mentor>{
    private readonly repository: IMentorRepository;

    constructor(repository: IMentorRepository) {
        this.repository = repository;
    }

    async execute(params: CreateMentorParams): Promise<Mentor> {
        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }
        const id = crypto.randomUUID()
        const newMentor = Mentor.create(params, params.id ? params.id : id);

        const saved = await this.repository.save(newMentor);
        if (!saved) {
            throw new EntityNotSavedError()
        }

        return saved;
    }

    private validateParams(params: CreateMentorParams): Error[] | null {
        const errors: Error[] = [];

        if (!params.name || params.name.trim().length < 2 || params.name.trim().length > 255) {
            errors.push(new InvalidNameError(params.name));
        }

        if (!params.cpf || params.cpf.trim().length != 11) {
            errors.push(new InvalidCpfError(params.cpf));
        }


        return errors.length > 0 ? errors : null;
    }
}

 