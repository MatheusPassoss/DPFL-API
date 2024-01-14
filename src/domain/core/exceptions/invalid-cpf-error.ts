
export class InvalidCpfError extends Error {
    
    public readonly name = 'InvalidCpfError'

    constructor (cpf: string) {
      super(`CPF inválido!: ${cpf}`)
    }

}