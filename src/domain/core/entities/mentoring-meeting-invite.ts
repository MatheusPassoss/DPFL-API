import { IEntity } from "../shared-global/IEntity"

export class MentoringMeetingInvite implements IEntity {

    public readonly id: string
    public readonly createAt: Date;
    public updateAt: Date;

    public readonly idStudent: string
    public readonly idMentor: string
    public date: Date

    public status: "PEDDING" | "REFUSED" | "CANCELED" | "ACCEPTED"

    constructor(id: string, idStudent: string, idMentor: string, date: Date) {

        this.id = id
        this.idMentor = idMentor
        this.idStudent = idStudent
        this.date = date
        this.status = "PEDDING"

    }

    static create(id: string, idStudent: string, idMentor: string, date: Date) {
        return new MentoringMeetingInvite(id, idStudent, idMentor, date)
    }


}