const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    inventory: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
    }],
    location: {
        longitude: Number,
        latitude: Number
    }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        try {        
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch(e){
            next(e);
        }
    }
    next();
}); 

UserSchema.methods.comparePassword = async function(candidatePassword, callback) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        callback(null, isMatch);
    } catch(e) {
        callback(e);
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
