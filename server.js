const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
//View engine.
app.set('view engine', 'ejs');

//Body parser here
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))


//start up the server.
app.listen(3000, function() {
    console.log('listening on 3000')
  })


//MongoDB connection...

//MongoDB Client...
MongoClient.connect(connectionString,{ useUnifiedTopology: true },(err, client) => {
    // ... do something here
    if(err) return console.log(err)
    console.log("Connected to Database")
    //Set Database.
    const db = client.db('sample_airbnb')
    //Set Collection
    const collection = db.collection('listingsAndReviews')

    //Get
    app.get('/', (req,res)=>{
        db.collection('listingsAndReviews').find({_id:"10047964"}).toArray()
            .then(results => {
                    //console.log(results)
                    //Render our view.
                    res.render('index.ejs', {listing: results})
                })
            .catch(error => console.error(error))
        })






  })


//Handlers  
//Convert to ES6

//Get just 1 listing from the sample information for airBNB.
/*app.get('/', (req,res)=>{
     //res.send('Hello World.')

    //res.sendFile(__dirname + '/index.html')
});

//Routes
app.post('/quotes', (req, res) => {
    console.log(req.body)
})*/