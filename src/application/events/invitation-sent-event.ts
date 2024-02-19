import { MentoringInvite } from "../../domain/core/entities/mentoring-invite";
import { SendEmailNotificationService } from "../services/email-service/send-email-notification";


export class InvitationSentEvent {

    constructor(sendEmailService: SendEmailNotificationService, invite: MentoringInvite) {

    }

    execute() {

    }

}