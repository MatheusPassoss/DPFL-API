import { IEntity } from "../../shared-global/IEntity"
import { Adress } from "./adress-value-object"
import { Role } from "./role-value-object"

export interface MentorData {
  name: string,
  email: string,
  cpf: string,
  phone: string,
  birthDate: Date,
  address: Adress,
  role: Role,
}
  
  export class Mentor implements IEntity {
  
    id: string
    name: string
    email: string
    cpf: string
    phone: string
    birthDate: Date
    address: Adress
    role: Role
    createAt: Date;
    updateAt: Date;


    private constructor(mentor: MentorData, id: string) {
      this.id = id
      this.name = mentor.name;
      this.email = mentor.email;
      this.cpf = mentor.cpf;
      this.birthDate = mentor.birthDate;
      this.phone = mentor.phone;
      this.address = mentor.address;
      this.role = mentor.role;
      this.createAt = new Date();
      this.updateAt = new Date();
    }
  
   static create(params: MentorData, id: string): Mentor {
     const mentor = new Mentor(params, id)
     return mentor
   }

   
  
  }