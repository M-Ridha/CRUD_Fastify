// ESM
import Fastify from 'fastify'
import routes from './routes/user' 
import dbConnector from './helpers/dbConnect'
require ('dotenv').config()


//logger(info in clg)
const fastify = Fastify({
  logger: false
})

//Port
const Port = process.env.PORT || 8000



//dataBase
fastify.register(dbConnector)

//routes
fastify.register(routes) 

//server
fastify.listen({ port: Port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server is running on http://localhost:${Port}`)
})