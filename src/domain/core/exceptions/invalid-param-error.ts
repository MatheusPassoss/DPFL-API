
export class InvalidParamError extends Error {
    
    public readonly name = 'InvalidParamError'

    constructor (erros: Error[]) {
      super(`Dados inválidos: ${erros} `)
    }

}