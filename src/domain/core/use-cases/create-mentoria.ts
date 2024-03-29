import { IMentoriaRepository } from "../repositories/IMentoria-repositorie"
import { InvalidParamError } from "../exceptions/invalid-param-error"
import { Mentoria } from "../entities/mentoria"
import { EntityNotSavedError } from "../exceptions/entity-not-saved-error"
import { InvalidNameError } from "../exceptions/invalid-name-error"
import { crypto } from "../../.."
import { IStudentRepository } from "../repositories/IStudent-repository"
import { IMentorRepository } from "../repositories/IMentor-repositorie"
import { EntityNotFound } from "../exceptions/entity-not-found"
import { IUseCase } from "../shared-global/IUse-case"


interface CreateMentoriaParams {
    mentorId: string,
    studentId: string,
    date?: Date
}

export class CreateMentoria implements IUseCase<CreateMentoriaParams, Mentoria> {
    private readonly repository: IMentoriaRepository;
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMentoriaRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.repository = repository;
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
    }

    async execute(params: CreateMentoriaParams): Promise<Mentoria> {
        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }
        
        const id = crypto.randomUUID();
        const studentParams = await this.mentorRepository.findById(params.mentorId)
        const mentorParams = await this.studentRepository.findById(params.studentId)

        const newMentoria = Mentoria.create({
            name: mentorParams.name,
            email: mentorParams.email,
            id: mentorParams.id
        }, 
        {
            name: studentParams.name,
            email: studentParams.email,
            id: studentParams.id
        }, id);

        const saved = await this.repository.save(newMentoria);
        if (!saved) {
            throw new EntityNotSavedError();
        }

        return saved;
    }

    private validateParams(params: CreateMentoriaParams) {
        const errors: Error[] = [];

        const mentorExits = this.mentorRepository.findById(params.mentorId)
        const studentExists = this.studentRepository.findById(params.studentId)

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;
    }
}

