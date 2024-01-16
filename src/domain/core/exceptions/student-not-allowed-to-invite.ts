
export class StudentNotAllowedToInvite extends Error {

    public readonly name = 'StudentNotAllowedToInvite'

    constructor () {
      super(`O Aluno especificado não está hábil para novos convites.`)
    }

}