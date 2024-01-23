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

    async execute(params: CreateMentoringParams): Promise<Mentoring | null> {
        const errors = this.validateParams(params);

        if (errors) {
            throw new InvalidParamError(errors);
        }

        const id = crypto.randomUUID();
        const student = await this.mentorRepository.findById(params.idStudent)
        const mentor = await this.studentRepository.findById(params.idMentor)

        if (mentor && student) {
            console.log("entrou na função")

            console.log(student)
            console.log(mentor)

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

            console.log(newMentoring)
            const saved = await this.repository.save(newMentoring);
            if (!saved) {
                throw new EntityNotSavedError();
            }

            return saved;

        }

        return null
    }

    private validateParams(params: CreateMentoringParams) {
        const errors: Error[] = [];

        const mentorExits = this.mentorRepository.findById(params.idStudent)
        const studentExists = this.studentRepository.findById(params.idMentor)

        if (!mentorExits) errors.push(new EntityNotFound("Mentor"));

        if (!studentExists) errors.push(new EntityNotFound("Student"));

        return errors.length > 0 ? errors : null;
    }
}

