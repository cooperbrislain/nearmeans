const mongoose = require("mongoose");
const db = require("../models");
// This file empties the Books collection and inserts the books below
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nearmeans"
);
const userSeed = {
    email: 'test@user.com',
    password: '123qwe',
    location: { lat: 37.773972, lng: -122.431297 }
};
const partSeed = [
    {
        name: 'ESP32',
        location: { lat: 37, lng: -122 }
    },
    {
        name: 'ESP8266',
        location: { lat: 36, lng: -123 }
    },
    {
        name: 'Uno',
        location: { lat: 33, lng: -124 }
    },
    {
        name: 'Huzzah',
        location: { lat: 37.5708, lng: -122.3303 }
    },
    {
        name: 'PixelPusher',
        location: { lat: 37.8434318, lng: -122.297078 }
    },
    {
        name: 'WS2812',
        location: { lat: 37.855, lng: -122.482 }
    },
    {
        name: 'APA102',
        location: { lat: 37.605, lng: -122.405 }
    }
];
let newUser;

db.User
    .remove({})
    .then(() => {
        newUser = new db.User(userSeed);
        newUser.save();
    })
    .then(data => {
        console.log(data);
        console.log(`userId: ${newUser._id}`);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
db.Part
    .remove({})
    .then(() => {
        partSeed.map((part) => {
            const newPart = new db.Part({ name: part.name });
            newPart.save();
            const newInv = new db.Inventory({ item: newPart._id, qty: 1, location: part.location, userId: newUser._id });
            newInv.save();
        })
    })
    .then(data => {
        console.log(data);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

