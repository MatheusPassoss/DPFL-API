 
export class EntityNotSavedError extends Error {
    
    public readonly name = 'EntityNotSavedError'

    constructor () {
      super(`Entidade não salva verifique a conexão com o banco de dados`)
    }

}