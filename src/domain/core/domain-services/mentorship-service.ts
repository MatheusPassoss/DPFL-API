import { Mentor } from "../entities/user/mentor";
import { MentoringInvite } from "../entities/mentoring-invite";
import { Student } from "../entities/user/student";
import { MentorNotAllowedToInvite } from "../exceptions/mentor-not-allowed-to-invite";
import { StudentNotAllowedToInvite } from "../exceptions/student-not-allowed-to-invite";

export class MentorshipService {

    createInvite(whoInvited: Mentor, whoReceived: Student) {
        
        if (whoInvited.role.persona != "mentor") {
            throw new MentorNotAllowedToInvite()
        }

        if (whoReceived.role.persona != "student") {
            throw new StudentNotAllowedToInvite()
        }

        const Invite = MentoringInvite.create(whoInvited.id, whoReceived.id);

        return Invite 
    }


    acceptInvite() {

    }

    refuseInvite() {

    }

    cancelInvite() {

    }

    createMentorship() {

    }

    completeMentorship() {

    }

    pauseMentorship() {

    }

    cancelMentorship() {

    }

}