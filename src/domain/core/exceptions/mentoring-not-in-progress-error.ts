
export class MentoringNotInProgress extends Error {

    public readonly name = 'MentoringNotInProgress'

    constructor () {
      super(`Não há uma Mentoria em progresso, entre o aluno e o Mentor!`)
    }

}