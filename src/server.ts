import 'dotenv/config'
import { fastify } from 'fastify';
import MentoringInviteRoutes from './application/routes/mentoring-invite-routes';
import { UserRoutes } from './application/routes/user-routes';
import { Teste } from './infra/queue/sqs-queue';
export const crypto = require('crypto');


export const server = fastify()
MentoringInviteRoutes(server)
UserRoutes(server)
Teste()

export const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION  
});
server.listen({ port: 3333}, (error, address) => {
    
    if (error) {
      console.error(error);
      process.exit(1);
    }

    console.log(`Servidor rodando: ${address}`);
    
})




