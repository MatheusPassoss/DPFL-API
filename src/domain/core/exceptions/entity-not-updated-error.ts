 
export class EntityNotUpdatedError extends Error {
    
    public readonly name = 'EntityNotUpdatedError'

    constructor () {
      super(`Entidade não atualizada salva verifique a conexão com o banco de dados`)
    }

}