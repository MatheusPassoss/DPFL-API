export class InvalidDataError extends Error {
    
    public readonly name = 'InvalidDataError'

    constructor () {
      super(`Dados inválidos!`)
    }

}