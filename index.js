const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


//pass      Thzl1NGlAvdi3pww
//user    astor


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lopokh6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const brandCollection = client.db('Astor').collection('brand');
        const phoneCollection = client.db('Astor').collection('catagories');
        const bookingCollection = client.db('Astor').collection('Booking');
        const useringCollection = client.db('Astor').collection('Users');
    
        app.get('/brand', async (req, res) => {
            const query = {};
            const options = await brandCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/categorys/:id', async (req, res) => {

            const brandID = req.params.id;
            // console.log(brandID);

            const query = { _id: ObjectId(brandID) };
            const singleBrand = await brandCollection.find(query).toArray();
            const NeddedBrand = singleBrand[0].brandName;

            //console.log(NeddedBrand)
            const query2 = { brandName: NeddedBrand };
            const cursor = phoneCollection.find(query2);
            const phones = await cursor.toArray();
            //  console.log(phones)
            res.send(phones);
        })
        app.post('/booking', async (req, res) => {
            const bookingsIteam = req.body;
            const result = await bookingCollection.insertOne(bookingsIteam);
            res.send(result)
        }) 
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await useringCollection.insertOne(user);
            res.send(result)
        }) 

    }
    finally {

    }
}

run().catch(err => console.error(err));








app.get('/', async (req, res) => {
    res.send('PuranMobile Is running');
})

app.listen(port, () => console.log('ha old phohne id runnning'));