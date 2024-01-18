import { MentoringMeeting } from "../../../entities/MentoringMeeting";
import { IRepository } from "../../../shared-global/IRepository";


export interface IMeetingRepository extends IRepository<MentoringMeeting> {
    findOne: (filter: Partial<MentoringMeeting>) => Promise<MentoringMeeting>
    findOneAndUpdate: (filter: Partial<MentoringMeeting>, updatePartial: Partial<MentoringMeeting>) => Promise<MentoringMeeting>
    findMany: (filter: Partial<MentoringMeeting>) => Promise<MentoringMeeting[]>
}