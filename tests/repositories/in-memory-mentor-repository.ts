import { Mentor } from "../../src/domain/core/entities/user/mentor";
import { EntityNotFound } from "../../src/domain/core/exceptions/entity-not-found";
import { InvalidDataError } from "../../src/domain/core/exceptions/invalid-data-error";
import { IMentorRepository } from "../../src/domain/core/repositories/User/IMentor-repository";


export class InMemoryMentorRepository implements IMentorRepository {
    public mentors: Mentor[] = [

        {
            id: "89852778-6118-428c-8e49-138e71643faf",
            name: "Digão",
            email: "digão@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "80052778-6118-123c-8e49-138e71643faf",
            name: "Renato",
            email: "renato@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "85952000-6118-123c-8e49-138e71643faf",
            name: "Sassine",
            email: "sassine@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        },

        {
            id: "70152000-6118-123c-8e49-138e71643fa",
            name: "Vilson",
            email: "vilson@example.com",
            cpf: "98765432111",
            phone: "11 987654322",
            birthDate: new Date(),
            address: {
                cep: "12345",
                city: "Cidade3",
                state: "Estado3",
                road: "Rua3",
                number: "789",
            },
            createAt: new Date(),
            updateAt: new Date()
        }

    ]

    async findById(id: string): Promise<Mentor | null> {
        const mentor = await this.mentors.find(mentor => mentor.id == id)
     
        if (mentor) {
            return mentor
        }

        console.log(mentor)

        return null
    }


    async save(mentor: Mentor): Promise<Mentor> {

        if (!mentor) {
            throw new InvalidDataError()
        }

        this.mentors.push(mentor)

        return mentor
    }


    async findByEmail(email: string): Promise<Mentor> {

        const mentor = await this.mentors.find(mentor => mentor.email == email)
        if (!mentor) {
            throw new EntityNotFound("Mentor")
        }

        return mentor

    }


    update!: (entity: Partial<Mentor>) => Promise<Mentor>;
    findByStudent!: (emailStudent: string) => Promise<Mentor>;
    listMentors!: () => Promise<Mentor[]>;
    listWithoutStudent!: () => Promise<Mentor[]>;
}