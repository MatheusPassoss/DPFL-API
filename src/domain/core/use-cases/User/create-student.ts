import { Student } from "../../entities/Student";
import { IStudentRepository } from "../../repositories/User/IStudent-repository";
import { crypto } from "../../../..";
import { InvalidNameError } from "../../exceptions/invalid-name-error";
import { InvalidCpfError } from "../../exceptions/invalid-cpf-error";
import { EntityNotSavedError } from "../../exceptions/entity-not-saved-error"
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { IUseCase } from "../../shared-global/IUse-case";


interface CreateStudentParams {


    name: string
    email: string
    cpf: string
    phone: string
    bithDate: Date | string
    address: {
        cep: string,
        city: string,
        state: string,
        road: string,
        number: string,
        complement?: string
    }

    
}

export class CreateStudentUseCase implements IUseCase<CreateStudentParams, Student>{
    private readonly repository: IStudentRepository;

    constructor(repository: IStudentRepository) {
        this.repository = repository;
    }

    async execute(params: CreateStudentParams): Promise<Student> {
        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }
        const id = crypto.randomUUID()
        const newStudent = Student.create(params, id);

        const saved = await this.repository.save(newStudent);
        if (!saved) {
            throw new EntityNotSavedError()
        }

        return saved;
    }

    private validateParams(params: CreateStudentParams) {
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

 