
interface AdressProps {
    cep: string
    city: string
    state: string
    street: string
    number: string
}


export class Adress {

    readonly cep: string
    readonly city: string
    readonly state: string
    readonly street: string
    readonly number: string

    constructor({
        cep,
        city,
        number,
        state,
        street }: AdressProps) {
        
       this.cep = cep;
       this.city = city;
       this.number = number;
       this.state = state
       this.street = street
    }

}