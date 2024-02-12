import 'dotenv/config'
import { FastifyReply, FastifyRequest, fastify } from 'fastify';
import MentoringInviteRoutes from './application/routes/mentoring-invite-routes';
import { FastifyAdapter } from './infra/adapters/fastify-adapter';
import { MentoringInviteController } from './application/controllers/mentoring-invite-controller';

export const crypto = require('crypto');



export const server = fastify()
server.get("/teste", (request, reply) => {
  reply.send("AAAAAAAAAAAAAAAAAA");
});

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



server.listen({
    port: 3333
}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em: ${address}`);
    
    })




