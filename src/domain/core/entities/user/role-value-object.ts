
interface RoleProps {
    persona: "student" | "mentor" | "admin"
    idPermissionToken: string | "default"
    status: "active" | "not-active"
}


export class Role {

    readonly persona: "student" | "mentor" | "admin"
    readonly idPermissionToken: string | "default"
    readonly status: "active" | "not-active"

    constructor({idPermissionToken, persona, status}: RoleProps) {
        this.persona = persona
        this.idPermissionToken = idPermissionToken
        this.status = status
    }

}