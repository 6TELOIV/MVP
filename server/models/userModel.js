import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
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
    },
    googleTokens: {
        type: {}
    }

});

userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function (plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
}

userSchema.pre('save', function(next) {
    if (!this.password) {
        console.log('models/userModel.js =======NO PASSWORD PROVIDED=======');
        next();
    } else {
        console.log('models/userModel.js hashPassword in pre save');
        this.password = this.hashPassword(this.password);
        next();
    }
})

export default mongoose.model('users', userSchema);
