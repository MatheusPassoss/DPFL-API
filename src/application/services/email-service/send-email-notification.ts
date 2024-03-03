import SES from "aws-sdk/clients/ses"
import { Student } from "../../../domain/core/entities/user/student"
import { AWS } from "../../../server"


export class SendEmailNotificationService {
    private mail: SES
    
    constructor() {
        this.mail = new AWS.SES({
            region: "us-east-1",
        })
    }

    async inviteAccepted(student: Student) {
      await this.mail.sendEmail({
        Destination: {
          ToAddresses: [
            `Matheus Passos <matheuspassos.work@gmail.com>`,
          ],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `Olá, ${student.name}! Você recebeu um novo convite de Mentoria!`,
            },
            Text: {
              Charset: "UTF-8",
              Data: ``,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Novo convite de Mentoria!",
          },
        },
        Source: "Matheus Passos <matheuspassos.work@gmail.com>",
      },
    ).promise()
    }

    async inviteRefused() {

    }

    async inviteCanceled() {

    }

    async inviteSended(student: Student) {
      const teste = await this.mail.sendEmail({
        Destination: {
          ToAddresses: [
            `Matheus Passos <matheuspassos.work@gmail.com>`,
          ],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `Olá, ${student.name}! Você recebeu um novo convite de Mentoria!`,
            },
            Text: {
              Charset: "UTF-8",
              Data: ``,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Novo convite de Mentoria!",
          },
        },
        Source: "Matheus Passos <matheuspassos.work@gmail.com>",
      },
    ).promise()

    return teste
    }

}


