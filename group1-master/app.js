const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Business = require('./models/business');
const Review = require('./models/review');

mongoose.connect('mongodb+srv://kelvin:Rmt7hs0e38G8aQFo@cluster0.yp4jn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//mongodb://127.0.0.1:27017/yelp-clone
//MONGO_URI=mongodb+srv://kelvin:Rmt7hs0e38G8aQFo@cluster0.yp4jn.mongodb.net/DearSunbaePlatform?retryWrites=true&w=majority
//mongodb+srv://kelvin:<password>@cluster0.yp4jn.mongodb.net/?retryWrites=true&w=majority
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/business', async(req, res) => {
    const business = await Business.find({});
    console.log(business);
    res.render('businesses/index', { business });
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})