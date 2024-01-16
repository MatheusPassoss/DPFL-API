import { IMentoringRepository } from "../../repositories/IMentoring-repositorie";
import { IUseCase } from "../../shared-global/IUse-case";
import { IMentorRepository } from "../../repositories/IMentor-repositorie";
import { IStudentRepository } from "../../repositories/IStudent-repository";
import { InvalidParamError } from "../../exceptions/invalid-param-error";
import { EntityNotFound } from "../../exceptions/entity-not-found";
import { Mentoring } from "../../entities/metoring";

interface CompleteMentoringParams {
    id: string
    idStudent: string,
    idMentor: string,
}

export class CompleteMentoring implements IUseCase<CompleteMentoringParams, Mentoring> {
  

    repository: IMentoringRepository
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMentoringRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.repository = repository
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
    }

    async execute(params: CompleteMentoringParams) {

        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const filter: Partial<Mentoring> = {
            id: params.id,
            idStudent: params.idStudent,
            idMentor: params.idMentor
        }

        const update: Partial<Mentoring> = {
            status: "COMPLETED",
            updateAt: new Date(),
        }

        const completed = this.repository.findOneAndUpdate(filter, update)

        return completed

    }

    validateParams(params: CompleteMentoringParams) {

        const errors: Error[] = [];
        const mentoringExits = this.repository.findById(params.id)
        const mentorExits = this.mentorRepository.findById(params.idMentor)
        const studentExists = this.studentRepository.findById(params.idStudent)

        // const meetings = this.
        // TO-DO: validar a quantidade de encontros, se é igual, ou maior que 12 (tem que ser mínimo 12). 

        if (!mentoringExits) errors.push(new EntityNotFound("Mentoring"));

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;


    }

}