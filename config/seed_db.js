const mongoose = require("mongoose");
const db = require("../models");
const tagEverything = require('mongoose-tag-everything');

console.log('SEEDING DATABASE');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nearmeans', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => { console.log('connected to mongoDB') });

const invTypes = [ 'offer','sale','rent','trade','free' ];
const userSeed = [
    {
        username: 'testuser1',
        displayname: 'Test User 1',
        email: 'user@test.com',
        password: '123qwe',
    },
    {
        username: 'testuser2',
        displayname: 'Test User 2',
        email: 'testuser2@gmail.com',
        password: '123qwe',
    },
    {
        username: 'bobtest',
        displayname: 'Bob',
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
        name: 'Ace Monster Toys',
        geo: { lat: 37.8447017, lng: -122.2768872 }
    },
    {
        name: 'Gray Area',
        geo: { lat: 37.754409, lng: -122.418305 }
    },
    {
        name: 'Urban Ore',
        geo: { lat: 37.8504319, lng: -122.2904059 }
    },
    {
        name: 'American Steel',
        geo: { lat: 37.8055269, lng: -122.2933526 }
    },
    {
        name: 'Bordello',
        geo: { lat: 37.7877751, lng: -122.2465616 }
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
        name: 'Treasure Island',
        geo: { lat: 37.8171501, lng: -122.370804 }
    },
    {
        name: 'San Jose Storage',
        geo: { lat: 37.320227, lng: -121.90953 }
    },
    {
        name: "Scott's Valley Storage",
        geo: { lat: 37.062661, lng: -122.002777 }
    },
    {
        name: 'Idea Fab Labs',
        geo: { lat: 36.959604, lng: -122.055784 }
    },
    {
        name: 'NoiseBridge',
        geo: { lat: 37.76242, lng: -122.419042 }
    },
    {
        name: 'RobotX Space',
        geo: { lat: 37.394986, lng: -121.978488 }
    },
    {
        name: 'PK Warehouse',
        geo: { lat: 37.6057747, lng: -122.0750007 }
    }
];
const partSeed = [
    {
        name: 'Camera',
        category: 'gear',
        tags: ['camera','photo']
    },
    {
        name: 'Chauvet MVP',
        category: 'gear',
        tags: ['led','panel','video']
    },
    {
        name: 'Chauvet Freedom Par',
        category: 'gear',
        tags: ['led','light','par']
    },
    {
        name: 'Chauvet SlimPar 56',
        category: 'gear',
        tags: ['led','light','par']
    },
    {
        name: 'Chauvet Scorpion',
        category: 'gear',
        tags: ['laser','lighting']
    },
    {
        name: 'Akai APC40',
        category: 'gear',
        tags: ['midi','controller','vj']
    },
    {
        name: 'GoPro Kit',
        category: 'gear',
        tags: ['camera','kit','gopro']
    },
    {
        name: 'Red Dragon X',
        category: 'gear',
        tags: ['camera','cinema','kit','video']
    },
    {
        name: 'Technics SL1200',
        category: 'gear',
        tags: ['turntable','dj','technics']
    },
    {
        name: 'LED Panel',
        category: 'gear',
        tags: ['led','panel','video']
    },
    {
        name: 'Epson 7900P',
        category: 'gear',
        tags: ['projector','epson']
    },
    {
        name: 'BenQ HT8060',
        category: 'gear',
        tags: ['projector','av','benq']
    },
    {
        name: 'Christie D4KLH60',
        category: 'gear',
        tags: ['projector','av','christie']
    },
    {
        name: 'Barco RLS-W12',
        category: 'gear',
        tags: ['projector','av','barco']
    },
    {
        name: 'Barco RLM-W6',
        category: 'gear',
        tags: ['projector','av','barco']
    },
    {
        name: 'Funktion One Resolution 5',
        category: 'gear',
        tags: ['speaker','loudspeaker','sound']
    },
    {
        name: 'Truss',
        category: 'gear',
        tags: ['truss']
    },
    {
        name: 'ESP32',
        category: 'Part',
        tags: ['wifi','esp','iot','microcontroller','bluetooth']
    },
    {
        name: 'ESP8266',
        category: 'Part',
        tags: ['wifi','esp','iot','microcontroller']
    },
    {
        name: 'Uno',
        category: 'Part',
        tags: ['arduino','uno']
    },
    {
        name: 'Huzzah',
        category: 'Part',
        tags: ['wifi','bluetooth','arduino']
    },
    {
        name: 'PixelPusher',
        category: 'Part',
        tags: ['led','controller']
    },
    {
        name: 'WS2812',
        category: 'Part',
        tags: ['led','addressable']
    },
    {
        name: 'APA102',
        category: 'Part',
        tags: ['led','addressable']
    }
];

const seedMe = async () => {
    try {
        console.log('FLUSHING EXISTING DATA');
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
            const user = users[Math.floor(Math.random()*users.length)];
            newLocation.user = user._id;
            await newLocation.save();
            user.locations.push(newLocation._id);
            console.log('MADE LOCATION', newLocation);
            return newLocation;
        }));
        users.forEach(user => user.save());
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
            const location = user.locations[Math.floor(Math.random() * user.locations.length)];
            const newInv = await new db.Inventory({
                item: item._id,
                userId: user._id,
                qty: Math.floor(Math.random() * 10),
                location: location._id,
                type: Math.floor(Math.random() * invTypes.length);
            });
            await newInv.save();
            console.log('INVENTORY ADDED', newInv);
            inventories.push(newInv);
            user.inventory.push(newInv);
            await user.save();
        }
        console.log('DONE CREATING INVENTORIES');
    } catch (e) {
        console.log(e);
    }
};

seedMe().then(() => {
    process.exit(1);
});
