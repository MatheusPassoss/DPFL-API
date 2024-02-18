
interface RoleProps {
    persona: "student" | "mentor" | "admin"
    idPermissionToken: string | "default"
    status: "active" | "not-active"
}


export class Role {

    readonly persona: string
    readonly idPermissionToken: string
    readonly status: string

    constructor({idPermissionToken, persona, status}: RoleProps) {
        this.persona = persona
        this.idPermissionToken = idPermissionToken
        this.status = status
    }

}