const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors())
app.use(express.json())





app.get('/', (req, res) => {
    res.send('Edtech University Appliaction is Running')
})


const uri = `mongodb+srv://${process.env.EDTECH_USER}:${process.env.EDTECH_PASS}@cluster0.ceweuof.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const usersCollection = client.db('EdTechApplication').collection('allUsers')
        const collagesCollection = client.db('EdTechApplication').collection('Collages')
        const addmissionCollection = client.db('EdTechApplication').collection('all-addmissions')



        // Get All Users From Client
        app.post('/all-users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })




        // Get Collages Collection
        app.get('/all-collages', async (req, res) => {
            const result = await collagesCollection.find().toArray()
            res.send(result)
        })

        app.get('/all-collages/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: new ObjectId(id) }

            const result = await collagesCollection.find(query).toArray()
            res.send(result)
        })




        // Geeting all Addmission Form
        app.post('/addmission', async (req, res) => {
            const addmissions = req.body
            const result = await addmissionCollection.insertOne(addmissions)
            res.send(result)
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`Edtech University Application is Running on port ${port}`);
})