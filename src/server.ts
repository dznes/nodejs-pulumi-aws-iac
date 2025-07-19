import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const server = fastify()

server.register(fastifyCors, {
  origin: '*',
})

server.get('/env', () => {
  return { env: JSON.stringify(process.env, null, 2) }
})

server.get('/health', () => {
  return 'OK'
})

server.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('HTTP server running!')
})