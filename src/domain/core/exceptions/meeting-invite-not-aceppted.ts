

export class MeetingInviteNotAceppted extends Error {
    
    public readonly name = 'MeetingInviteNotAceppted'

    constructor() {
        super(`O convite para a reunião de Mentoria não foi aceito`)
    }
}
