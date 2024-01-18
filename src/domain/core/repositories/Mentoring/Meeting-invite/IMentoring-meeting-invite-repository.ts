
import { MentoringMeetingInvite } from "../../../entities/MentoringMeetingInvite";
import { IRepository } from "../../../shared-global/IRepository";


export interface IMeetingInviteRepository extends IRepository<MentoringMeetingInvite> {
    findOne: (filter: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    findOneAndUpdate: (filter: Partial<MentoringMeetingInvite>, updatePartial: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    
}