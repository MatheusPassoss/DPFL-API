import { InMemoryMentorRepository } from "./in-memory-mentor-repository"
import { MentoringMeeting } from "../../src/domain/core/entities/mentoring-meeting"
import { IMeetingRepository } from "../../src/domain/core/repositories/Mentoring/Meeting/IMentoring-meeting-repository"
import { InvalidDataError } from "../../src/domain/core/exceptions/invalid-data-error";


export class InMemoryMentoryngMeetingRepository implements IMeetingRepository {

    meetings: MentoringMeeting[] = [
           
       {
        id: "1e535ad-2671-473f-9a0b-2061071a0a786",
        createAt: new Date,
        updateAt: new Date,
        idStudent: "1edaaaaad-2671-473f-9a0b-206771a0a786",
        idMentor: "1ebbbbad-2671-473f-9a0b-206771a0a786",
        date: new Date(),
        status: "NOT-CONFIRMED" 
       }

    ]


    update!: (entity: Partial<MentoringMeeting>) => Promise<MentoringMeeting | null>;

    findByEmail!: (email: string) => Promise<MentoringMeeting | null>;

    
    findMany!: (filter: Partial<MentoringMeeting>) => Promise<MentoringMeeting[] | null>;
    
    
    findOneAndUpdate!: (filter: Partial<MentoringMeeting>, updatePartial: Partial<MentoringMeeting>) => Promise<MentoringMeeting | null>;
    
    async findOne(filter: Partial<MentoringMeeting>): Promise<MentoringMeeting | null> {

        const meeting = await this.meetings.find(meeting => meeting.idMentor === filter.idMentor && meeting.idStudent === filter.idStudent && meeting.date === filter.date)
        
        if (!meeting) {
            return null
        }

        return meeting
    }



    async save(entity: MentoringMeeting): Promise<MentoringMeeting | null> {
        
        if (!entity) {
            throw new InvalidDataError()
        }
        
        this.meetings.push(entity)
        
        return entity
    }
    
    
    async findById (id: string): Promise<MentoringMeeting | null> {

        if (!id) {
            throw new InvalidDataError()
        }

        const Meeting = await this.meetings.find(meeting => meeting.id === id)

        if (!Meeting) {
            return null
        }

        return Meeting
    }

}