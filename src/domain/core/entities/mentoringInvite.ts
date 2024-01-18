export class MentoringInvite {

    public readonly id: string
    public readonly idMentor: string
    public readonly idStudent: string
    private creatAt: Date
    public updateAt: Date
    public status: "PEDDING" | "ACCEPTED" | "REFUSED" | "CANCELED"

    private constructor(idMentor: string, idStudent: string, id:string, date?: Date) {
        this.id = id
        this.idStudent = idStudent
        this.idMentor = idMentor
        this.creatAt = date ? date : new Date()
        this.status = "PEDDING"
        this.updateAt = new Date()
    }

    static create(idMentor: string, idStudent: string, id:string, date?: Date): MentoringInvite {
        return new MentoringInvite(idMentor, idStudent, id)
    }


}

