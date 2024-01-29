
export class MentorNotAllowedToMentoring extends Error {

    public readonly name = 'MentorNotAllowedToMentoring'

    constructor () {
      super(`O Mentor especificado não está hábil para uma nova Mentoria por já possuir uma Mentoria em curso.`)
    }

}