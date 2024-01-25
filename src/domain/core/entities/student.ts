export interface StudentData {
  name: string,
  email: string,
  cpf: string,
  phone: string,
  birthDate: Date,
  address: {
      cep: string,
      city: string,
      state: string,
      road: string,
      number: string,
}
}

export class Student implements StudentData {
  
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  birthDate: Date
  address: {
      cep: string
      city: string
      state: string
      road: string
      number: string
  }

  private constructor(student: StudentData, id: string) {
    this.id = id
    this.name = student.name;
    this.email = student.email;
    this.cpf = student.cpf;
    this.phone = student.phone
    this.birthDate = student.birthDate
    this.address = student.address
  }

  static create(student: StudentData, id: string): Student {
    return new Student(student, id)
  }

}