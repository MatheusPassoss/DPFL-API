import { Role } from "../entities/user/role-value-object"
import { Adress } from "../value-objects/adress-value-object"

export interface IEntity {
    id: string
    createAt: Date
    updateAt: Date
 }