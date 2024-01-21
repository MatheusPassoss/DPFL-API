export interface IRepository<Entity> {
    findByEmail: (email: string) => Promise<Entity | null>
    findById: (id: string) => Promise<Entity | null>
    save: (entity: Entity) => Entity
    update: (entity: Partial<Entity>) => Promise<Entity | null>
    // delete: (id: string) => Promise<void>
}   