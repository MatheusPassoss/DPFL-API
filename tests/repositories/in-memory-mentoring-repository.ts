import { Mentoring } from "../../src/domain/core/entities/metoring";
import { EntityNotFound } from "../../src/domain/core/exceptions/entity-not-found";
import { InvalidDataError } from "../../src/domain/core/exceptions/invalid-data-error";
import { IMentoringRepository } from "../../src/domain/core/repositories/Mentoring/IMentoring-repository";


export class InMemoryMentoringRepository implements IMentoringRepository {

    public mentorings: Mentoring[] = [

        {
            idStudent: "21ed35ad-2671-473f-9a0b-206771a0a786",
            nameStudent: "Thomas",
            emailStudent: "thomas@example.com",

            idMentor: "89852778-6118-428c-8e49-138e71643faf",
            nameMentor: "Digão",
            emailMentor: "digão@example.com",

            id: "e4eff12e-fd8c-44b4-9f0a-f684cc42e953",
            createAt: new Date(),
            updateAt: new Date(),
            status: "PROGRESS"
        }


    ]

    async findById(id: string): Promise<Mentoring | null> {
        const mentoring = await this.mentorings.find(mentoring => mentoring.id == id)

        if (!mentoring) {
            return null
        }

        return mentoring

    }

    async findOne(filter: Partial<Mentoring>): Promise<Mentoring | null> {
        const filtred = await this.mentorings.find(mentoring => mentoring.id == filter.id && mentoring.idMentor == filter.idMentor && mentoring.idStudent == filter.idStudent)

        if (!filtred) {
            return null
        }

        return filtred;
    }


    async findOneAndUpdate(filter: Partial<Mentoring>, updatePartial: Partial<Mentoring>): Promise<Mentoring | null> {

        const mentoring = await this.mentorings.find(mentoring => mentoring.id == filter.id && mentoring.idMentor == filter.idMentor && mentoring.idStudent == filter.idStudent)
        if (!mentoring) {
            return null
        }

        if (updatePartial.status) {
            mentoring.status = updatePartial.status;
        }

        if (updatePartial.updateAt) {
            mentoring.updateAt = updatePartial.updateAt
        }


        return mentoring

    }

    async save(entity: Mentoring): Promise<Mentoring | null> {

        if (!entity) {
            throw new InvalidDataError()
        }

        this.mentorings.push(entity)

        return entity
    }

    update: (entity: Partial<Mentoring>) => Promise<Mentoring | null>;
    updateMany: (filter: Partial<Mentoring>) => Promise<Mentoring[]>;
    findByEmail: (email: string) => Promise<Mentoring | null>;
    findByMentorId: (studentId: string) => Promise<Mentoring[]>;
    findByStudentId: (studentId: string) => Promise<Mentoring[]>;
}