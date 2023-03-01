const { ObjectId } = require('@fastify/mongodb')

async function routes (fastify, options) {
  
  const collection = fastify.mongo.db.collection('db_fastify')

  //getAll Users
  fastify.get('/users', async (request, reply) => {
    try {
      const result = await collection.find().toArray()
      if (result.length === 0) {
        reply.status(404).send({ message: 'No documents found' })
      } else {
        reply.send(result)
      }
    
    } catch (error) {
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  })


  //get User By Id
  fastify.get('/users/:id', async (request, reply) => {
    try {
      const result = await collection.findOne({ _id: new ObjectId(request.params.id)})
      if (!result) {
        reply.status(404).send({ message: 'Invalid value' })
      } else {
        reply.send(result)
      }
    
    } catch (error) {
      reply.status(500).send({ message: 'Internal Server Error' })
    }
  })

  
  //Add New User
  fastify.post('/AddUsers', async (req, res) => {
    try {
      const {name , lastName , email} = req.body
     
      const result = await collection.insert({ name, lastName, email}) 
      
       return result
    
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })


  //Find User By Id And Update
  fastify.put('/UpdateUser/:id', async (req, res) => {
    try {
      const {name , lastName , email} = req.body

      const result = await collection.updateOne ({_id : new ObjectId(req.params.id)},{
        $set : {...req.body} },{upsert : true}
      )      
      
      return result
    
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })

  //Find User By Id And Delete
  fastify.delete('/deleteUser/:id' , async (req,res) => {
    try {
      await collection.deleteOne({_id : new ObjectId(req.params.id)})

      res.status(201).send({message : "user deleted successfully"})
 
    } catch (error) {
      res.status(500).send({message:'Internal Server Error'})
    }
  })



}

module.exports = routes