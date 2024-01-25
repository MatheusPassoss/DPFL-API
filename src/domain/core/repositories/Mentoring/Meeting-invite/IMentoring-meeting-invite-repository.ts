
import { MentoringMeetingInvite } from "../../../entities/mentoring-meeting-invite";
import { IRepository } from "../../../shared-global/IRepository";


export interface IMeetingInviteRepository extends IRepository<MentoringMeetingInvite> {
    findOne: (filter: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    findOneAndUpdate: (filter: Partial<MentoringMeetingInvite>, updatePartial: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    
}