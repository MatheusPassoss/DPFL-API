import 'dotenv/config'

export const crypto = require('crypto');

import { fastify } from 'fastify';

export const server = fastify()

server.listen({
    port: "3333"
})