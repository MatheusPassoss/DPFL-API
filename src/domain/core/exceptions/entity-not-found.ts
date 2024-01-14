

export class EntityNotFound extends Error {
    
    public readonly entity: string

    constructor(entity: string) {
        super(`Entidade não encontrada: ${entity}`)

        this.entity = `${entity}NotFound`
    }
}