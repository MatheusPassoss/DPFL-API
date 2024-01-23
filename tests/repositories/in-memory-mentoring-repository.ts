import { Mentoring } from "../../src/domain/core/entities/metoring";
import { IMentoringRepository } from "../../src/domain/core/repositories/Mentoring/IMentoring-repositorie";


export class InMemoryMentoringRepository implements IMentoringRepository {

    public mentorings: Mentoring[] = []

    async findById(id: string): Promise<Mentoring | null> {
        const mentoring = await this.mentorings.find(mentoring => mentoring.id == id)

        if (mentoring) {
            return mentoring
        }

        return null
    }

    async findOne(filter: Partial<Mentoring>): Promise<Mentoring | null> {
        const filtred = await this.mentorings.find(mentoring => mentoring.id == filter.id && mentoring.idMentor == filter.idMentor && mentoring.idStudent == filter.idStudent)
        if (filtred) return filtred;
        return null
    }


    async findOneAndUpdate(filter: Partial<Mentoring>, updatePartial: Partial<Mentoring>): Promise<Mentoring | null> {

        const mentoring = await this.mentorings.find(mentoring => mentoring.id == filter.id && mentoring.idMentor == filter.idMentor && mentoring.idStudent == filter.idStudent)
        if (mentoring) {
            if (updatePartial.status) {
                mentoring.status = updatePartial.status;
            }

            if (updatePartial.updateAt) {
                mentoring.updateAt = updatePartial.updateAt
            }

            return mentoring
        }

        return null
    }

    save(entity: Mentoring): Mentoring {

        if (entity) {
            this.mentorings.push(entity)
        }
        
        return entity
    }

    update: (entity: Partial<Mentoring>) => Promise<Mentoring | null>;
    updateMany: (filter: Partial<Mentoring>) => Promise<Mentoring[] | null>;
    findByEmail: (email: string) => Promise<Mentoring | null>;
    findByMentorId: (studentId: string) => Promise<Mentoring[] | null>;
    findByStudentId: (studentId: string) => Promise<Mentoring[] | null>;
}