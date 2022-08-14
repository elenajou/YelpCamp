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
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20 + 10);
        const camp = new Campground({ 
            author: '62f708e4f10ca506f6add9f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatum quibusdam incidunt sapiente deleniti, possimus animi numquam perferendis a nam, libero vel commodi assumenda natus minus provident, neque quisquam voluptates.'
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})