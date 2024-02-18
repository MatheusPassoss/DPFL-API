import { Mentor } from "../entities/mentor";
import { MentoringInvite } from "../entities/mentoring-invite";
import { Mentoring } from "../entities/metoring";
import { Student } from "../entities/student";
import { MentorNotAllowedToInvite } from "../exceptions/mentor-not-allowed-to-invite";
import { StudentNotAllowedToInvite } from "../exceptions/student-not-allowed-to-invite";




export class MentorshipInviteService {

 
    constructor(private readonly student: Student, private readonly mentor: Mentor) {

    }

    async execute(): Promise<MentoringInvite> {
        
        const newMentoringInvite = MentoringInvite.create(this.mentor.id, this.student.id);

        return newMentoringInvite 
    }


} 