
export class InvitationAlreadyAccepted extends Error {
    
    public readonly name = 'InvitationAlreadyAccepted'

    constructor () {
      super(`Já há um convite de Mentoria aceito associado ao estudante:`)
    }

}