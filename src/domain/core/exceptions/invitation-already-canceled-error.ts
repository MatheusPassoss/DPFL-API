
export class InvitationAlreadyCanceled extends Error {
    
    public readonly name = 'InvitationAlreadyCanceled'

    constructor () {
      super(`O convite já foi cancelado!`)
    }

}