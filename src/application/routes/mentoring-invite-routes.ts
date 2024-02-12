import { DoneFuncWithErrOrRes, FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import { FastifyAdapter } from "../../infra/adapters/fastify-adapter"
import { MentoringInviteController } from "../controllers/mentoring-invite-controller"

// https://fastify.dev/docs/latest/Reference/Server/#register

const MentoringInviteRoutes = (server: FastifyInstance, opts: any, done: DoneFuncWithErrOrRes) => {

server.post("/invite/create", () => {

})

server.put("/invite/accept", async (request: FastifyRequest, reply: FastifyReply) => {
    const fastifyAdapter = new FastifyAdapter(request, reply)

    const accepted = new MentoringInviteController().acceptInvite(fastifyAdapter)

    if (!accepted) {
        return reply.code(500)
    }
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({accepted})
})

server.get("/invite", (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send("funciona!")
})

server.delete("/", () => {
    
})

done()
}

export default MentoringInviteRoutes