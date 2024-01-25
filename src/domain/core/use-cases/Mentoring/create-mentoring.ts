import { IMentoringRepository } from "../../repositories/Mentoring/IMentoring-repository"
import { InvalidParamError } from "../../exceptions/invalid-param-error"
import { Mentoring } from "../../entities/metoring"
import { EntityNotSavedError } from "../../exceptions/entity-not-saved-error"
import { crypto } from "../../../.."
import { IStudentRepository } from "../../repositories/User/IStudent-repository"
import { IMentorRepository } from "../../repositories/User/IMentor-repository"
import { EntityNotFound } from "../../exceptions/entity-not-found"
import { IUseCase } from "../../shared-global/IUse-case"


interface CreateMentoringParams {
    idStudent: string,
    idMentor: string,
    date?: Date | string
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
        const errors = await this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const id = crypto.randomUUID();
        const student = await this.studentRepository.findById(params.idStudent)
        const mentor = await this.mentorRepository.findById(params.idMentor)

        if (!mentor) throw new EntityNotFound("Mentor")

        if (!student)throw new EntityNotFound("Student")

        const studentParams = {
            name: student.name,
            email: student.email,
            idStudent: student.id
        }

        const mentorParams = {
            name: mentor.name,
            email: mentor.email,
            id: mentor.id
        }

        const newMentoring = Mentoring.create(studentParams, mentorParams, id, new Date());

        const saved = await this.repository.save(newMentoring);

        if (!saved) {
            throw new EntityNotSavedError();
        }

        return saved;

    }

    private async validateParams(params: CreateMentoringParams): Promise<Error[] | null>  {
        const errors: Error[] = [];

        const mentorExits = await this.mentorRepository.findById(params.idStudent)
        const studentExists = await this.studentRepository.findById(params.idMentor)

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;
    }
}

