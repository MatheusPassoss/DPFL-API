export interface StudentData {
  name: string
  email: string
  cpf: string

}

export class Student implements StudentData {
  id: string
  name: string
  email: string
  cpf: string

  private constructor(student: StudentData, id: string) {
    this.id = id
    this.name = student.name;
    this.email = student.email;
    this.cpf = student.cpf;
  }

  static create(student: StudentData, id: string): Student {
    return new Student(student, id)
  }

}