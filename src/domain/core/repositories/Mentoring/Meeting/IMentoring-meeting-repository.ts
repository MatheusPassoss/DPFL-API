import { MentoringMeeting } from "../../../entities/mentoring-meeting";
import { IRepository } from "../../../shared-global/IRepository";


export interface IMeetingRepository extends IRepository<MentoringMeeting> {
    findOne: (filter: Partial<MentoringMeeting>) => Promise<MentoringMeeting | null>
    findOneAndUpdate: (filter: Partial<MentoringMeeting>, updatePartial: Partial<MentoringMeeting>) => Promise<MentoringMeeting | null>
    findMany: (filter: Partial<MentoringMeeting>) => Promise<MentoringMeeting[] | null>
}