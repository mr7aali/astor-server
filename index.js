const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    res.send('PuranMobile Is running');
})

app.listen(port,()=>console.log('ha old phohne id runnning'));