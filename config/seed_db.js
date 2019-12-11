const mongoose = require("mongoose");
const db = require("../models");

console.log('SEEDING DATABASE');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nearmeans', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => { console.log('connected to mongoDB') });

const userSeed = [
    {
        email: 'user@test.com',
        password: '123qwe',
    },
    {
        email: 'testuser2@gmail.com',
        password: '123qwe',
    },
    {
        email: 'bob@test.com',
        password: '123qwe',
    }
];
const locationSeed = [
    {
        name: 'Home',
        geo: { lat: 37.8264422, lng: -122.2224594 },
        address: { street: '5430 Park Blvd', city: 'Oakland', state: 'CA', zip: '94602', country: 'US' }
    },
    {
        name: 'Box Truck',
        geo: { lat: 37.8372726, lng: -122.3079147 }
    },
    {
        name: 'Bunker',
        geo: { lat: 37.9087365, lng: -122.2109076 }
    },
    {
        name: 'Warehouse',
        geo: { lat: 37.766756, lng: -122.216748 }
    },
    {
        name: 'Sudo Room',
        geo: { lat: 37.8349986, lng: -122.2641544 }
    },
    {
        name: 'AMT',
        geo: { lat: 37.8447017, lng: -122.2768872 }
    },
    {
        name: 'U-Store It',
        geo: { lat: 37.730409, lng: -122.179953 }
    },
    {
        name: 'Locker',
        geo: { lat: 37.8130905, lng: -122.2607019 }
    },
    {
        name: 'Van',
        geo: { lat: 37.8171501, lng: -122.370804 }
    },
];

const partSeed = [
    {
        name: 'Camera',
    },
    {
        name: 'Chauvet MVP',
    },
    {
        name: 'LED Panel',
    },
    {
        name: 'Epson 7900P',
    },
    {
        name: 'Projector',
    },
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
        console.log('FLUSHING DB');
        await db.Inventory.deleteMany({});
        await db.User.deleteMany({});
        await db.Part.deleteMany({});
        await db.Location.deleteMany({});
        console.log('DONE FLUSHING');
        console.log('CREATING USERS');
        const users = await Promise.all(userSeed.map(async user => {
            const newUser = await new db.User(user);
            await newUser.save();
            console.log('MADE USER', newUser);
            return newUser;
        }));
        console.log('DONE CREATING USERS');
        console.log('CREATING LOCATIONS');
        const locations = await Promise.all(locationSeed.map(async location => {
            const newLocation = await new db.Location(location);
            await newLocation.save();
            console.log('MADE LOCATION', newLocation);
            return newLocation;
        }));
        console.log('DONE CREATING LOCATIONS');
        console.log('CREATING PARTS');
        const parts = await Promise.all(partSeed.map(async part => {
            const newPart = await new db.Part(part);
            await newPart.save();
            console.log('MADE PART', newPart);
            return newPart;
        }));
        console.log('DONE CREATING PARTS');
        console.log('CREATING INVENTORIES');
        let inventories = [];
        for (let i=0;i<100;i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const item = parts[Math.floor(Math.random() * parts.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const newInv = await new db.Inventory({
                item: item._id,
                userId: user._id,
                qty: Math.random() * 10,
                location: location._id,
            });
            await newInv.save();
            console.log('INVENTORY ADDED', newInv);
            inventories.push(newInv);
            user.inventory.push(newInv);
            user.save();
        }
        console.log('DONE CREATING INVENTORIES');
    } catch (e) {
        console.log(e);
    }
};

seedMe().then(() => {
    process.exit(1);
});
