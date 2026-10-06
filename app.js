const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const listing = require('./models/listing.js');
const path = require('path');
const dburl = "mongodb://localhost:27017/wonderlust"; 
const methodOverride = require('method-override');
const  ejsMate = require('ejs-mate');


async function main(){
    await mongoose.connect(dburl);
}
main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(5000, () => {
        console.log('Server is running on port 5000');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.get('/listings', async (req, res) => {
    const alllistings = await listing.find({}).sort({ _id: -1 });
    res.render("listings/index.ejs", { alllistings });
}); 

app.get('/listings/add', async (req, res) => {
    res.render("listings/new.ejs");
});


app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/show.ejs",{ Listing });
});

app.post('/listings/add_new', async (req, res) => {
    const newListing = new listing(req.body);
    await newListing.save();
    res.redirect('/listings');
});

app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit.ejs",{ Listing });
});

app.put('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, req.body);
    res.redirect(`/listings/${id}`);
});

app.delete('/listings/:id/delete', async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
});



