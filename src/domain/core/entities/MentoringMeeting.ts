import { IEntity } from "../shared-global/IEntity"


interface MentoringMeetingParams {
  idStudent: string,
  idMentor: string
  date: Date
}

export class MentoringMeeting implements IEntity {

    id: string
    createAt: Date
    updateAt: Date
    idStudent: string
    idMentor: string
    date: Date
     
}