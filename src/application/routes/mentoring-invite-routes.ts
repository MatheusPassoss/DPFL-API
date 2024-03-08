import { DoneFuncWithErrOrRes, FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { FastifyAdapter } from "../../infra/adapters/fastify-adapter"
import { MentorshipController } from "../controllers/mentorship-controller"
import { InMemoryMentoringInviteRepository } from "../../../tests/repositories/in-memory-mentoring-invite-repository"
import { InMemoryStudentRepository } from "../../../tests/repositories/in-memory-students-repository"
import { InMemoryMentorRepository } from "../../../tests/repositories/in-memory-mentor-repository"
import { InMemoryMentoringRepository } from "../../../tests/repositories/in-memory-mentoring-repository"



const MentoringInviteRoutes = (server: FastifyInstance) => {
  const inviteRepository = new InMemoryMentoringInviteRepository()
  const studentRepository = new InMemoryStudentRepository()
  const mentorRepository = new InMemoryMentorRepository()
  const mentoringRepository = new InMemoryMentoringRepository()

  const controller = new MentorshipController(mentoringRepository, inviteRepository, studentRepository, mentorRepository)
    
    // aqui é pra ler
    server.get("/invite/:StudentId", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply)
        
        const invites = await controller.listStudentInvitesById(fastifyAdapter)

        return invites
    })

    // enviar / crair o invite
    server.post("/invite/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply)

        const mentoring = await controller.sendInvite(fastifyAdapter)

        if (!mentoring) {
            return reply.code(500)
        }
        
        return mentoring
    })

    // aceitar
    server.put("/invite/accept/creatementoring", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply)

        const mentoring = await controller.acceptInvite(fastifyAdapter)

        if (!mentoring) {
            return reply.code(500)
        }
        
        return mentoring
    })


    // Recusar convite aaaaaaaaaaaaaaaa
    server.put("/invite/refuse", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply)

        const mentoring = await controller.refuseInvite(fastifyAdapter)

        if (!mentoring) {
            return reply.code(500)
        }
        
        return mentoring
    })

    // aqui é pra cancel o invite
    server.put("/invite/cancel", async (request: FastifyRequest, reply: FastifyReply) => {
        const fastifyAdapter = new FastifyAdapter(request, reply)

        const mentoring = await controller.cancelInvite(fastifyAdapter)

        if (!mentoring) {
            return reply.code(500)
        }
        
        return mentoring
    })


    server.delete("/aaaa", async (request: FastifyRequest, reply: FastifyReply) => {
        
    })
    }

export default MentoringInviteRoutes