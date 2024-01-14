
export class MentorNotAllowedToInvite extends Error {

    public readonly name = 'MentorNotAllowedToInvite'

    constructor () {
      super(`O Mentor especificado não está hábil para novos convites.`)
    }

}