import mongoose, { Mongoose } from 'mongoose';

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
        type: Mongoogse.Number,
        required: true,
        min: 1,
        max: 12
    },
    sign: {
        type: Mongoose.Number, 
        required: true,
        min: 1,
        max: 12
    }

});

export default mongoose.model('users', userSchema);
