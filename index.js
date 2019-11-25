require('dotenv').config();
const express   = require('express');
const morgan    = require('morgan');
const mongoose  = require('mongoose');
const cors      = require('cors');

const app = express();

// Database setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nearmeans', {
    useNewUrlParser: true,
    useCreateIndex: true
}, () => { console.log('connected to mongoDB') });

// App middlewares setup
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const routes = require('./routes');
app.use(routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
