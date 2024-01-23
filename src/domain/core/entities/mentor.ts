export interface MentorData {
  name: string,
  email: string,
  cpf: string,
  phone: string,
  bithDate: string | Date,
  address: {
      cep: string,
      city: string,
      state: string,
      road: string,
      number: string,

}
}
  
  export class Mentor implements MentorData {
  
    id: string
    name: string
    email: string
    cpf: string
    phone: string
    bithDate: string | Date
    address: {
        cep: string
        city: string
        state: string
        road: string
        number: string
    }
    private constructor(mentor: MentorData, id: string) {
      this.id = id
      this.name = mentor.name;
      this.email = mentor.email;
      this.cpf = mentor.cpf;
      this.bithDate = mentor.bithDate;
      this.phone = mentor.phone;
      this.address = mentor.address;
    }
  
    static create(mentor: MentorData, id: string): Mentor {
      return new Mentor(mentor, id)
    }
  
  }