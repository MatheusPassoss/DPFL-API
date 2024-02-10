import fastify from "fastify"

const server = fastify()

server.post("/invite/create", () => {

})

server.put("/invite/accept/:idInvite", async (request, reply) => {
    
}
    
)


server.get("/invite", () => {
    
})

server.delete("/", () => {
    
})

server.listen({
    port: 3000
})