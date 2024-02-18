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

export class Student implements StudentData {
  
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  birthDate: Date
  address: Adress
  role: Role


  private constructor(student: StudentData, id: string) {
    this.id = id
    this.name = student.name;
    this.email = student.email;
    this.cpf = student.cpf;
    this.phone = student.phone
    this.birthDate = student.birthDate
    this.address = student.address
    this.role = student.role
  }

  static create(student: StudentData, id: string): Student {
    return new Student(student, id)
  }

}

// usar a api do via cep:   `https://viacep.com.br/ws/${cep}/json/`

// exemplo do Json que retorna: 

// {
//   "cep": "05858-000",
//   "logradouro": "Estrada de Itapecerica",
//   "complemento": "de 4180 a 6300 - lado par",
//   "bairro": "Jardim Vista Linda",
//   "localidade": "São Paulo",
//   "uf": "SP",
//   "ibge": "3550308",
//   "gia": "1004",
//   "ddd": "11",
//   "siafi": "7107"
// }