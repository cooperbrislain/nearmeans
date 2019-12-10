const mongoose = require("mongoose");
const db = require("../models");

console.log('SEEDING DATABASE');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nearmeans', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => { console.log('connected to mongoDB') });

const userSeed = {
    email: 'user@test.com',
    password: '123qwe',
};
const locationSeed = [
    {
        name: 'home',
        geo: {
            lat: 37,
            lng: -122
        },
        city: 'oakland',
        state: 'ca',
        country: 'us',
        zip: '94602',
        address: '3225 Beaumont Ave'
    },
    {
        name: 'storage unit',
        geo: {
            lat: 50,
            lng: 50
        },
        city: 'oakland',
        state: 'ca',
        country: 'us',
        zip: '94602',
        address: ''
    },
    {
        name: 'warehouse',
        geo: {
            lat: 50,
            lng: 50
        },
        zip: '94602'
    }
];

const partSeed = [
    {
        name: 'ESP32',
    },
    {
        name: 'ESP8266',
    },
    {
        name: 'Uno',
    },
    {
        name: 'Huzzah',
    },
    {
        name: 'PixelPusher',
    },
    {
        name: 'WS2812',
    },
    {
        name: 'APA102',
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
        const locations = await Promise.all(locationSeed.map(async location => {
            const newLocation = await new db.Location(location);
            return newLocation;
        }));
        console.log('LOCATIONS', locations);
        await Promise.all(partSeed.map(async part => {
            const newPart = await new db.Part(part);
            await newPart.save();
            const location = locations[Math.floor(Math.random()*locations.length)];
            const newInv = await new db.Inventory({
                item: newPart._id,
                userId: newUser._id,
                qty: 1,
                location: location});
            console.log('NEW ITEM', newInv);
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
