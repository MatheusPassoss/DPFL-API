import { Mentor } from "../entities/user/mentor";
import { MentoringInvite } from "../entities/mentoring-invite";
import { Student } from "../entities/user/student";
import { MentorNotAllowedToInvite } from "../exceptions/mentor-not-allowed-to-invite";
import { StudentNotAllowedToInvite } from "../exceptions/student-not-allowed-to-invite";
import { InvalidInviteStatusError } from "../exceptions/invalid-invite-status-error";
import { Mentoring } from "../entities/metoring";

export class MentorshipService {

    createInvite(whoInvited: Mentor, whoReceived: Student) {

        if (whoInvited.role.persona !== "mentor") {
            throw new MentorNotAllowedToInvite()
        }

        if (whoReceived.role.persona !== "student") {

            console.log(whoReceived.role.persona)
            throw new StudentNotAllowedToInvite()
        }

        const Invite = MentoringInvite.create(whoInvited.id, whoReceived.id);

        return Invite
    }


    acceptInviteAndCreateMentorship(invite: MentoringInvite, mentor: Mentor, student: Student) {

        if (invite.status === "PEDDING") {
            invite.acceptInvite()
        } else {
            throw new InvalidInviteStatusError(invite.status)
        }

        const Mentorship = this.createMentorship(invite, mentor, student)

        return Mentorship
    }

    refuseInvite() {

    }

    cancelInvite() {

    }

    private createMentorship(acceptedInvite: MentoringInvite, mentor: Mentor, student: Student) {

        if (acceptedInvite.status !== "ACCEPTED") {
            throw new InvalidInviteStatusError(acceptedInvite.status)
        }

        const mentorship = Mentoring.create({
            idStudent: student.id,
            email: student.email,
            name: student.name
        }, 
        {
            id: mentor.id,
            email: mentor.email,
            name: mentor.name
        })

        return mentorship
    }

    completeMentorship() {

    }

    pauseMentorship() {

    }

    cancelMentorship() {

    }

}