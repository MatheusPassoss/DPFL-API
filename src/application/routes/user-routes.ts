import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { UserController } from "../controllers/user-controller"
import { InMemoryStudentRepository } from "../../../tests/repositories/in-memory-students-repository"
import { InMemoryMentorRepository } from "../../../tests/repositories/in-memory-mentor-repository"
import { FastifyAdapter } from "../../infra/adapters/fastify-adapter"

export const UserRoutes = async (server: FastifyInstance) => {

    const studentRepo = new InMemoryStudentRepository
    const mentorRepo = new InMemoryMentorRepository
    const controller = new UserController(studentRepo, mentorRepo)

    server.get("/user/mentor/:id", async (req: FastifyRequest, rep: FastifyReply) => {
        const adapter = new FastifyAdapter(req, rep)

        const mentor = await controller.getMentorById(adapter)

        return mentor
    })
    
    server.get("/user/student/:id", async (req: FastifyRequest, rep: FastifyReply) => {
        const adapter = new FastifyAdapter(req, rep)

        const student = await controller.getStudentById(adapter)

        return student 
    })

    server.post("/user/student/create", async (req: FastifyRequest, rep: FastifyReply) => {
        
        const adapter = new FastifyAdapter(req, rep)

        const student = await controller.createStudent(adapter)

        if (!student || !student.name) {

            rep.code(400).send("Errouuu")
        }

        rep.code(201).send(student)
        
    })

    server.put("/user/student/update/:id", async (req: FastifyRequest, rep: FastifyReply) => {
        
        const adapter = new FastifyAdapter(req, rep)
        
        const updatedStudent = controller.updateMentor(adapter)

        if (!updatedStudent) {
            rep.code(400).send("Erro")
        }

        return updatedStudent

    })

    server.post("/user/mentor/create", async (req: FastifyRequest, rep: FastifyReply) => {
        
        const adapter = new FastifyAdapter(req, rep)

        const mentor = await controller.createMentor(adapter)

        if (!mentor) {
            rep.code(400).send("Error")
        }

        rep.code(201).send(mentor)
    })

    server.put("/user/mentor/update/:id", async (req: FastifyRequest, rep: FastifyReply) => {
        
        const adapter = new FastifyAdapter(req, rep)
        
        const updated = await controller.updateMentor(adapter)

        return updated
    })


}