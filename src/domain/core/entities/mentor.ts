export interface MentorData {
    name: string
    email: string
    cpf: string
  
  }
  
  export class Mentor implements MentorData {
    id: string
    name: string
    email: string
    cpf: string
  
    private constructor(mentor: MentorData, id: string) {
      this.id = id
      this.name = mentor.name;
      this.email = mentor.email;
      this.cpf = mentor.cpf;
    }
  
    static create(mentor: MentorData, id: string): Mentor {
      return new Mentor(mentor, id)
    }
  
  }