import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    code: {
      type: String, 
      required: true
    },
    name: {
      type: String, 
      required: true
    },
    coordinates: {
      latitude: mongoose.Number, 
      longitude: mongoose.Number
    },
    address: String

});

export default mongoose.model('users', userSchema);
