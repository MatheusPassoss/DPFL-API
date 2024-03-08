import { InvalidInviteStatusError } from "../exceptions/invalid-invite-status-error"
import { IEntity } from "../shared-global/IEntity"
import { crypto } from "../../../server"

interface MentoringInviteParams {
    id: string,
    idStudent: string,
    idMentor: string,
    createAt: Date
    updateAt: Date
}


export class MentoringInvite implements MentoringInviteParams, IEntity{

    public readonly id: string
    public readonly idMentor: string
    public readonly idStudent: string
    public readonly createAt: Date
    public updateAt: Date
    public status: "PEDDING" | "ACCEPTED" | "REFUSED" | "CANCELED"

    private constructor(idMentor: string, idStudent: string, id?:string, date?: Date) {
        this.id = crypto.randomUUID()
        this.idStudent = idStudent
        this.idMentor = idMentor
        this.createAt = date ? date : new Date()
        this.status = "PEDDING"
        this.updateAt = new Date()
    }

    static create(idMentor: string, idStudent: string, id?:string, date?: Date): MentoringInvite {
        return new MentoringInvite(idMentor, idStudent)
    }

    public acceptInvite() {
         if (this.status !== "PEDDING") {
            throw new InvalidInviteStatusError(this.status)
         }

         this.status = "ACCEPTED"
    }

    public refuseInvite() {
        if (this.status !== "PEDDING") {
           throw new InvalidInviteStatusError(this.status)
        }

        this.status = "REFUSED"
   }

   public cancelInvite() {
    if (this.status !== "PEDDING") {
       throw new InvalidInviteStatusError(this.status)
    }

    this.status = "CANCELED"
}

}

