
export class InvalidInviteStatusError extends Error {

    public readonly name = 'InvalidInviteStatusError'

    constructor (status: string) {
      super(`Você só pode cancelar um convite de Mentoria pendente. O status do convite é: ${status}`)
    }

}