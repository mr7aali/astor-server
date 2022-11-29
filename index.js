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
        const advertiseCollection = client.db('Astor').collection('advertiseIteam');

        app.get('/brand', async (req, res) => {
            const query = {};
            const options = await brandCollection.find(query).toArray();
            res.send(options);
        })
        app.get('/advertise', async (req, res) => {
            const query = {};
            const options = await advertiseCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/categorys/:id', async (req, res) => {

            const brandID = req.params.id;
          

            const query = { _id: ObjectId(brandID) };
            const singleBrand = await brandCollection.find(query).toArray();
            const NeddedBrand = singleBrand[0].brandName;
          
            const query2 = { brandName: NeddedBrand };
            const cursor = phoneCollection.find(query2);
            const phones = await cursor.toArray();
           
            res.send(phones);
        })





        app.post('/booking', async (req, res) => {
            const bookingsIteam = req.body;
            const result = await bookingCollection.insertOne(bookingsIteam);
            res.send(result)
        })






        app.get('/bookingfardin', async (req, res) => {
            const bookingsIteam = {};
            const result = await bookingCollection.find(bookingsIteam).project({ _id: 1 }).toArray();

            res.send(result)
        
        })




        app.post('/addadvertise', async (req, res) => {
            const add = req.body;
            const result = await advertiseCollection.insertOne(add);
            res.send(result)
        })
        app.delete('/deleteAddvertise', async (req, res) => {
            const tergetEmail = req.query.email;
            const tergetPrice = req.query.price;
           
            const query = { 
                sellerEmail: tergetEmail,
                resalePrice: tergetPrice
            };
            const result = await advertiseCollection.deleteOne(query);
           
            res.send(result);
        })


        app.post('/addproduct', async (req, res) => {
            const bookingsIteam = req.body;
            const result = await phoneCollection.insertOne(bookingsIteam);
            res.send(result)
        })

        app.get('/buyers', async (req, res) => {
            const query = { rol: 'buyer' }
            const buyers = await useringCollection.find(query).toArray();
            res.send(buyers);

        })
        app.get('/sellers', async (req, res) => {
            const query = { rol: 'seller' }
            const sellers = await useringCollection.find(query).toArray();
            res.send(sellers);
        })




        app.post('/user', async (req, res) => {
            const user = req.body;
            const emailClintSite = user?.Email;
            const query = { Email: emailClintSite };
            const isexitEmail = await useringCollection.find(query).toArray();

            const emailServerSite = isexitEmail[0]?.Email;
            if (emailClintSite === emailServerSite) {
                console.log("user exist");
            }

            //const result = await useringCollection.insertOne(user);
            else {
                const result = await useringCollection.insertOne(user);
                res.send(result)
            }

        })


        app.get('/userrol', async (req, res) => {
            const isRoler = req.query.email;
            const query = { Email: isRoler };
            const dbUser = await useringCollection.find(query).toArray();
            res.send(dbUser)
        })

        app.get('/booking', async (req, res) => {
            const isRoler = req.query.email;
            const query = { Email: isRoler };
            const booking = await bookingCollection.find(query).toArray();
            res.send(booking)
        })

        app.get('/sellerproduct', async (req, res) => {
            const isRoler = req.query.email;
            const query = { sellerEmail: isRoler };
            const booking = await phoneCollection.find(query).toArray();
            res.send(booking)
        })
        app.delete('/deleteBuyers', async (req, res) => {
            const terget = req.query.id;
            const query = { _id: ObjectId(terget) };
            const result = await useringCollection.deleteOne(query);
           
            res.send(result);
        })



        app.put('/updateproductstatus', async (req, res) => {
            const tergetEmail = req.query.email;
            const tPrice = req.query.price;
          
            const filter = {
                sellerEmail: tergetEmail,
                resalePrice: tPrice
            }
           
            const option = { upsert: false };
            const updateDoc = {
                $set: {
                    Bookingstatus: true,

                }
            }
            const result = await phoneCollection.updateOne(filter, updateDoc, option);
            res.send(result)
        })


        app.put('/verifyUser',async(req,res)=>{
            const tergetId=req.query.id;
            
            const filter={
                _id: ObjectId(tergetId) 
            }
            const option = { upsert: false };
            const updateDoc = {
                $set: {
                    verification : true,
                }
            }
            const result = await useringCollection.updateOne(filter, updateDoc, option);
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