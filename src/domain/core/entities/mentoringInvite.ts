export class MentoringInvite {

    readonly id: string
    private readonly idMentor: string
    private readonly idStudent: string
    private createAt: Date
    public lastUpdate: Date
    public status: "PEDDING" | "ACCEPT" | "REFUSED" | "CANCELED"

    private constructor(idMentor: string, idStudent: string, id:string, date?) {
        this.id = id
        this.idStudent = idMentor
        this.idMentor = idStudent
        this.createAt = date ? date : new Date()
        this.status = "PEDDING"
        this.lastUpdate = new Date()
    }

    static create(idMentor: string, idStudent: string, id:string, date?: Date): MentoringInvite {
        return new MentoringInvite(idMentor, idStudent, id)
    }


}

