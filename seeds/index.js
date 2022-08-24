const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/YelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20 + 10);
        const camp = new Campground({ 
            author: '62f708e4f10ca506f6add9f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:  { 
                type: "Point", 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dijbj8vrg/image/upload/v1660801166/YelpCamp/vsu8ivvukzinmrzyicpo.jpg',
                  filename: 'YelpCamp/vsu8ivvukzinmrzyicpo'
                },
                {
                  url: 'https://res.cloudinary.com/dijbj8vrg/image/upload/v1660801166/YelpCamp/yhq5abeftlmxqhib0faf.jpg',
                  filename: 'YelpCamp/yhq5abeftlmxqhib0faf'
                }
              ],
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})