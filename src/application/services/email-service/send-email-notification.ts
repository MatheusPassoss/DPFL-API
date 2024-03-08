import SES from "aws-sdk/clients/ses"
import { Student } from "../../../domain/core/entities/user/student"
import { AWS } from "../../../server"
import { Mentor } from "../../../domain/core/entities/user/mentor"
import { genMailContent } from "../../../utils/generate-email-content"
import { Mentoring } from "../../../domain/core/entities/metoring"

interface SendEmailProps {
  whoReceive: string[],
  title: string,
  content: string
}

export class SendEmailNotificationService {
  private mail: SES

  constructor() {
    this.mail = new AWS.SES({
      region: "us-east-1",
    })
  }

  private async sendEmail({ whoReceive, title, content }: SendEmailProps) {
    return this.mail.sendEmail({
      Destination: {
        ToAddresses: whoReceive,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: content,
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: title,
        },
      },
      Source: "Matheus Passos <matheuspassos.work@gmail.com>",
    }).promise();
  }




  async inviteSended(student: Student, mentor: Mentor) {

    const studentEmailBody = genMailContent(student, mentor, "student")
    const mentorEmailBody = genMailContent(student, mentor, "mentor")

    await this.sendEmail({
      whoReceive: [`${student.name} <${student.email}>`],
      title: "Novo convite de Mentoria!",
      content: studentEmailBody,
    });

    await this.sendEmail({
      whoReceive: [`${mentor.name} <${mentor.email}>`],
      title: "Seu convite de Mentoria foi enviado!",
      content: mentorEmailBody,
    });
  }



 
  async inviteAccepted(student: Student, mentor: Mentor, mentorship: Mentoring) {

    // const studentEmailBody = genMailContent(student, mentor, "student")
    // const mentorEmailBody = genMailContent(student, mentor, "mentor")

    console.log("Pendenteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
   await this.sendEmail({
      whoReceive: [`${student.name} <${student.email}>`],
      title: "Mentoria iniciada!",
      content: `Você aceitou o convite de ${mentor.name} e a Mentoria foi iniciada!`,
    });

     await this.sendEmail({
      whoReceive: [`${mentor.name} <${mentor.email}>`],
      title: "Mentoria iniciada!",
      content: `O aluno ${student.name} aceitou seu convite e a Mentoria foi iniciada! <br>
      
        Dados da mentoria: 

        <br>
        Mentor:
        ${mentorship.nameMentor}
        ${mentorship.emailMentor}
        <br>
        Aluno: 
        ${mentorship.nameStudent}
        ${mentorship.emailMentor}
      
      `,
    });
 

  }

  async inviteRefused(student: Student, mentor: Mentor) {

    const studentEmailBody = ""
    const mentorEmailBody = `Olá, ${mentor.name}! O aluno ${student.name} recusou seu convite de Mentoria. Não se preocupe, você ainda pode convidar outros alunos.`

    // await this.sendEmail({
    //   whoReceive: [`${student.name} <${student.email}>`],
    //   title: "Convite recusado!",
    //   content: studentEmailBody,
    // });

    await this.sendEmail({
      whoReceive: [`${mentor.name} <${mentor.email}>`],
      title: "Convite recusado!",
      content: mentorEmailBody,
    });
  }




  async inviteCanceled(student: Student, mentor: Mentor) {
    const studentEmailBody = ""
    const mentorEmailBody = ""

    await this.sendEmail({
      whoReceive: [`${student.name} <${student.email}>`],
      title: "Novo convite de Mentoria!",
      content: studentEmailBody,
    });

    await this.sendEmail({
      whoReceive: [`${mentor.name} <${mentor.email}>`],
      title: "Seu convite de Mentoria foi enviado!",
      content: mentorEmailBody,
    });
  }


}


