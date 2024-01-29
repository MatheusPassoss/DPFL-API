
import { MentoringMeetingInvite } from "../../../entities/mentoring-meeting-invite";
import { IRepository } from "../../../shared-global/IRepository";


export interface IMeetingInviteRepository extends IRepository<MentoringMeetingInvite> {
    findOne: (filter: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    findOneAndUpdate: (filter: Partial<MentoringMeetingInvite>, update: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite>
    acceptInvite: (filter: Partial<MentoringMeetingInvite>, update: Partial<MentoringMeetingInvite>) => Promise<MentoringMeetingInvite | null> 
}