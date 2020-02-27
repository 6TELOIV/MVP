import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    house: {
        type: mongoose.Number,
        required: true,
        min: 1,
        max: 12
    },
    sign: {
        type: mongoose.Number, 
        required: true,
        min: 1,
        max: 12
    }

});

export default mongoose.model('users', userSchema);
