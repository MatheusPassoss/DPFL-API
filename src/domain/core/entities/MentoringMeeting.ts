import { IEntity } from "../shared-global/IEntity"

export class MentoringMeeting implements IEntity {

  public id: string
  public createAt: Date
  public updateAt: Date
  public readonly idStudent: string
  public readonly idMentor: string
  public date: Date
  public status: "PEDDING" | "CONFIRMED" | "CANCELED"

  constructor(date: Date, idMentor: string, idStudent: string, id: string) {

    this.id = id
    this.date = date
    this.idMentor = idMentor
    this.idStudent = idStudent
    this.createAt = new Date()
    this.updateAt = new Date()
    this.status = "CONFIRMED"
  }

  static create(date: Date, idMentor: string, idStudent: string, id: string): MentoringMeeting {
    return new MentoringMeeting(date, idMentor, idStudent, id)
  }

}