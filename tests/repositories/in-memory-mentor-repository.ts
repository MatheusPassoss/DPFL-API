import { Mentor } from "../../src/domain/core/entities/mentor";
import { IMentorRepository } from "../../src/domain/core/repositories/User/IMentor-repositorie";


export class InMemoryMentorRepository implements IMentorRepository {
    public mentors: Mentor[] = []

    async findById(id: string): Promise<Mentor | null> {
       const mentor = await this.mentors.find(mentor => mentor.id == id)
       
       if (mentor) {
        return mentor
       }

       return null
    } 


    save(mentor: Mentor): Mentor {

        this.mentors.push(mentor)

        return mentor
    }



    update: (entity: Partial<Mentor>) => Promise<Mentor | null>;






    findByEmail: (email: string) => Promise<Mentor | null>;
    findByStudent: (emailStudent: string) => Promise<Mentor | null>;
    listMentors: () => Promise<Mentor[] | null>;
    listWithoutStudent: () => Promise<Mentor[] | null>;
}