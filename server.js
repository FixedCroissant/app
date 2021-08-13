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
    app.get("/", (req, res) => {
      db.collection("listingsAndReviews")
        //.find({ _id: "10047964" })
        .aggregate([{ $match: { minimum_nights: "2" } }])
        .toArray()
        .then(results => {
          //console.log(results)
          //Render our view.
          res.render("index.ejs", { listing: results });
        })
        .catch(error => console.error(error));
    });

    //Edit
    app.get("/edit/:reservationID", (req, res) => {
      //Params are found within: req.params
      //console.log(req.params);

      collection
        .find({ _id: req.params.reservationID })
        .toArray()
        .then((results) => {
          res.render("edit.ejs", { data:{listing: results,item:req.params.reservationID} });
        });
    });

    //Update Record.
    app.post('/update/:id',(req,res)=>{
      //see my params.
      //console.log(req.params);
      
      //lets see what's being sent over.
      //console.log(req.body);
      
      collection.findOneAndUpdate({ _id: req.params.id },{$set:{name: req.body.name}})
        .then(result=>{res.redirect('/')
        }).catch(error=>console.error(error))
    });
  });

    //Save new item
    app.post("/room", (req, res) => {
      //Insert an item to the collection of data.
      collection
        .insertOne(req.body)
        .then(result => res.redirect('/'))
        .catch(error => console.log(error));

      console.log(req.body);
    });
  



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