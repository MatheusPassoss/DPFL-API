

export class DateInUse extends Error {
    
    public readonly name = 'InvalidNameError'

    constructor(date: string | Date) {
        super(`Já foi enviado um convite para a data estabelecida: ${date}`)
    }
}