import { Mentor } from "../entities/user/mentor";
import { MentoringInvite } from "../entities/mentoring-invite";
import { Student } from "../entities/user/student";



interface AcceptInvitesParams {
    idStudent: string
    idMentor: string
}

export class MentorshipInviteService {

 
    constructor(private readonly student: Student, private readonly mentor: Mentor) {

    }

   create(): MentoringInvite {
        
        const newMentoringInvite = MentoringInvite.create(this.mentor.id, this.student.id);

        return newMentoringInvite 
    }

} 