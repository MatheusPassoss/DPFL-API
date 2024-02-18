

export class Adress {

    private readonly state: string
    private readonly  city: string
    private readonly street: string
    private readonly  cep: string

    constructor(state: string, city: string, street: string, cep: string) {
      
        this.city = city;
        this.state = state
        this.street = street
        this.cep = cep
    }

    static create(value: string) {

    }

    private validateFormat() {

    }

    private validateLenght() {
        
    }
}