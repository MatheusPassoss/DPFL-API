import SES from "aws-sdk/clients/ses"
import { Student } from "../../../domain/core/entities/user/student"


export class SendEmailNotificationService {
    private mail: SES
    
    constructor() {
        this.mail = new SES({
            region: "us-east-1",
        })
    }

    async execute(student: Student) {

        await this.mail.sendEmail({
            Destination: {
              ToAddresses: [
                "Matheus Passos <matheuspassos.work@gmail.com>",
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

}


