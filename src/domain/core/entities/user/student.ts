import { IEntity } from "../../shared-global/IEntity"
import { Adress } from "./adress-value-object"
import { Role } from "./role-value-object"

export interface StudentData {
  name: string,
  email: string,
  cpf: string,
  phone: string,
  birthDate: Date,
  address: Adress,
  role: Role,
}

export class Student implements IEntity {
  
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


  private constructor(student: StudentData, id: string) {
    this.id = id
    this.name = student.name;
    this.email = student.email;
    this.cpf = student.cpf;
    this.phone = student.phone
    this.birthDate = student.birthDate
    this.address = student.address
    this.role = student.role
    this.createAt = new Date()
    this.updateAt = new Date()
  }

  static create(student: StudentData, id: string): Student {
    return new Student(student, id)
  }

}