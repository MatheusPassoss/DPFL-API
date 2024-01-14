export interface IRepository<Entity> {
    findByEmail: (email: string) => Promise<Entity>
    findById: (id: string) => Promise<Entity>
    save: (e: Entity) => Promise<Entity>
    update: (e: Partial<Entity>) => Promise<Entity>
    // delete: (id: string) => Promise<void>
}   