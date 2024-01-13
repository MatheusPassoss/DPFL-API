interface StudentParams {
    name: string
    email: string
    id: string
}

interface MentorParams {
    name: string
    email: string
    id: string
}


export class Mentoria {

    studentId: string
    nameStudent: string
    emailStudent: string

    mentorId: string
    nameMentor: string
    emailMentor: string

    idMentoria: string
    createDate: Date
    status: "pedding"

    // começa como pendente, ai depois que o aluno aceitar, fazer um put pra atualizar o status

    private constructor(mentor: MentorParams, student: StudentParams, id: string, date?: Date) {

        this.studentId = student.id
        this.nameStudent = student.name
        this.emailStudent = student.email

        this.mentorId = mentor.id
        this.nameMentor = mentor.name
        this.emailMentor = mentor.email

        this.idMentoria = id
        this.createDate = date ? date : new Date()
    }

    static create(mentor: MentorParams, student: StudentParams, id: string, date?: Date): Mentoria {
        return new Mentoria(student, mentor, id)
    }
    
}