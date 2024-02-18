import { Student } from "../../domain/core/entities/student";
import { IMentorRepository } from "../../domain/core/repositories/User/IMentor-repository";
import { IStudentRepository } from "../../domain/core/repositories/User/IStudent-repository";
import { CreateMentorUseCase } from "../../domain/core/use-cases/User/create-mentor";
import { CreateStudentUseCase } from "../../domain/core/use-cases/User/create-student";
import { IHttpContext } from "../../port/http/IHttpContext";


export class UserController {

    private readonly studentRepo: IStudentRepository
    private readonly mentorRepo: IMentorRepository

    constructor(studentRepo: IStudentRepository, mentorRepo: IMentorRepository) {
        this.studentRepo = studentRepo
        this.mentorRepo = mentorRepo
    }

    async createStudent(http: IHttpContext) {

        const req = http.getRequest()

        const studentParams = req.body.user

        const student = await new CreateStudentUseCase(this.studentRepo).execute(studentParams)
      
        return student
    }   

    async updateStudent(http: IHttpContext) {
        const req = http.getRequest()
    }

    async deleteStudent(http: IHttpContext) {
        const req = http.getRequest()
    }
    
    async createMentor(http: IHttpContext) {
        const req = http.getRequest()

        const mentorParams = req.body.user

        const mentor = await new CreateMentorUseCase(this.mentorRepo).execute(mentorParams)

        return mentor
    }

    async updateMentor(http: IHttpContext) {
        const req = http.getRequest()
    }

    async deleteMentor(http: IHttpContext) {
        const req = http.getRequest()
    }

    async listStudentByModule(http: IHttpContext) {
        const req = http.getRequest()
    } 

    async listStudentsWithoutMentor(http: IHttpContext) {
        const req = http.getRequest()

        
    }
    
    async getStudentByMentor(http: IHttpContext) {
        const req = http.getRequest()

        const { mentorEmail } = req.query

    }

    async getMentorByMentored(http: IHttpContext) {
        const req = http.getRequest()

        const { studentEmail } = req.query


    }

    async getStudentById(http: IHttpContext) {
        const req = http.getRequest()
        const { id } = req.query

        const student = await this.studentRepo.findById(id)

        return student
    }

    async getMentorById(http: IHttpContext) {
        const req = http.getRequest()
        const { id } = req.query

        const mentor = await this.mentorRepo.findById(id)

        return mentor
    }

    async getStudentByEmail(http: IHttpContext) {
        const req = http.getRequest()
       
        const { email } = req.query

        const student = await this.studentRepo.findByEmail(email)
        
        return student
    }   

    async getMentorByEmail(http: IHttpContext) {
        const req = http.getRequest()

        const { email } = req.query

        const mentor = await this.mentorRepo.findByEmail(email)

        return mentor
    }
}