import { IMentoringRepository } from "../../repositories/Mentoring/IMentoring-repositorie"
import { InvalidParamError } from "../../exceptions/invalid-param-error"
import { Mentoring } from "../../entities/metoring"
import { EntityNotSavedError } from "../../exceptions/entity-not-saved-error"
import { crypto } from "../../../.."
import { IStudentRepository } from "../../repositories/User/IStudent-repository"
import { IMentorRepository } from "../../repositories/User/IMentor-repositorie"
import { EntityNotFound } from "../../exceptions/entity-not-found"
import { IUseCase } from "../../shared-global/IUse-case"


interface CreateMentoringParams {
    mentorId: string,
    studentId: string,
    date?: Date
}

export class CreateMentoring implements IUseCase<CreateMentoringParams, Mentoring> {
    private readonly repository: IMentoringRepository;
    private readonly studentRepository: IStudentRepository;
    private readonly mentorRepository: IMentorRepository;

    constructor(repository: IMentoringRepository, studentRepository: IStudentRepository, mentorRepository: IMentorRepository) {
        this.repository = repository;
        this.studentRepository = studentRepository
        this.mentorRepository = mentorRepository
    }

    async execute(params: CreateMentoringParams): Promise<Mentoring> {
        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }
        
        const id = crypto.randomUUID();
        const studentParams = await this.mentorRepository.findById(params.mentorId)
        const mentorParams = await this.studentRepository.findById(params.studentId)

        const newMentoring = Mentoring.create({
            name: mentorParams.name,
            email: mentorParams.email,
            id: mentorParams.id
        }, 
        {
            name: studentParams.name,
            email: studentParams.email,
            id: studentParams.id
        }, id);

        const saved = await this.repository.save(newMentoring);
        if (!saved) {
            throw new EntityNotSavedError();
        }

        return saved;
    }

    private validateParams(params: CreateMentoringParams) {
        const errors: Error[] = [];

        const mentorExits = this.mentorRepository.findById(params.mentorId)
        const studentExists = this.studentRepository.findById(params.studentId)

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;
    }
}

