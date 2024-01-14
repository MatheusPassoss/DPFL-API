export class MentoringInvite {

    readonly id: string
    private readonly idMentor: string
    public readonly idStudent: string
    private createAt: Date
    public updateAt: Date
    public status: "PEDDING" | "ACCEPT" | "REFUSED" | "CANCELED"

    private constructor(idMentor: string, idStudent: string, id:string, date?) {
        this.id = id
        this.idStudent = idStudent
        this.idMentor = idMentor
        this.createAt = date ? date : new Date()
        this.status = "PEDDING"
        this.updateAt = new Date()
    }

    static create(idMentor: string, idStudent: string, id:string, date?: Date): MentoringInvite {
        return new MentoringInvite(idMentor, idStudent, id)
    }


}

