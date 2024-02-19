import { IEntity } from "../shared-global/IEntity"

interface StudentParams {
    name: string
    email: string
    idStudent: string
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
    
    private constructor(student: StudentParams, mentor: MentorParams) {

        this.idStudent = student.idStudent
        
        this.nameStudent = student.name
        this.emailStudent = student.email

        this.idMentor = mentor.id
        this.nameMentor = mentor.name
        this.emailMentor = mentor.email

        this.id = crypto.randomUUID()
        this.createAt = new Date()
        this.status = "PROGRESS"
        this.updateAt = new Date()
    }

    static create(student: StudentParams, mentor: MentorParams): Mentoring {
        return new Mentoring(student, mentor)
    }
    
}
