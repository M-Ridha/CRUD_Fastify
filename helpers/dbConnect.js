
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector(fastify, options) {
  try {
    await fastify.register(fastifyMongo, {
      url: 'mongodb://localhost:27017/db_fastify',
      useNewUrlParser: true
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
    process.exit(1)
  }
}

export default fastifyPlugin(dbConnector)