import { IEntity } from "../shared-global/IEntity"

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


export class Mentoring implements IEntity{

    idStudent: string
    nameStudent: string
    emailStudent: string

    idMentor: string
    nameMentor: string
    emailMentor: string

    id: string
    createAt: Date
    updateAt: Date
    public status: "PROGRESS" | "STOPPED" | "CANCELED" | "COMPLETED"
    
    private constructor(mentor: MentorParams, student: StudentParams, id: string, date?: Date) {

        this.idStudent = student.id
        this.nameStudent = student.name
        this.emailStudent = student.email

        this.idMentor = mentor.id
        this.nameMentor = mentor.name
        this.emailMentor = mentor.email

        this.id = id
        this.createAt = date ? date : new Date()
        this.status = "PROGRESS"
    }

    static create(mentor: MentorParams, student: StudentParams, id: string, date?: Date): Mentoring {
        return new Mentoring(student, mentor, id)
    }
    
}