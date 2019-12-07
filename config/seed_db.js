const mongoose = require("mongoose");
const db = require("../models");

console.log('SEEDING DATABASE');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nearmeans', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => { console.log('connected to mongoDB') });

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

const seedMe = async () => {
    try {
        // flush existing data
        await db.Inventory.deleteMany({});
        await db.User.deleteMany({});
        await db.Part.deleteMany({});
        console.log('DELETED STUFF');
        const newUser = await new db.User(userSeed);
        await newUser.save();
        console.log('MADE USER');
        await Promise.all(partSeed.map(async part => {
            const newPart = await new db.Part({name: part.name});
            await newPart.save();
            console.log(`New Part: ${newPart._id}`);
            const newInv = await new db.Inventory({
                item: newPart._id,
                userId: newUser._id,
                qty: 1,
                location: part.location});
            await newInv.save();
            console.log(`Added ${newInv._id} to Inventory`);
            newUser.inventory.push(newInv);
        }));
        await newUser.save();
        console.log(`User ${newUser._id} saved`);
    } catch (e) {
        console.log(e);
    }
};

seedMe().then(() => {
    process.exit(1);
});
