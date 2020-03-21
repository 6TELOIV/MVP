import mongoose from 'mongoose';

const horoscopeSchema = new mongoose.Schema({
    
    sign: {
        type: mongoose.Number, 
        required: true,
        min: 1,
        max: 12
    },
    house: {
        type: mongoose.Number,
        required: true,
        min: 1,
        max: 12
    },
    moonPhase: {
        type: mongoose.Number, 
        required: true,
        min: 1,
        max: 8
    },
    quote: {
        type: String,
        required: true
    },
    quoteAuthor: {
        type: String,
        required: true
    },
    quoteSrc: {
        type: String,
        required: true,
        validate: /\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))/g
    }, 
    summary: {
        type: String,
        required: true
    }, 
    bestActivities: {
        type: String,
        required: true
    }, 
    moonThemes: {
        type: String,
        required: true
    }, 
    signThemes: {
        type: String,
        required: true
    }, 
    houseThemes: {
        type: String,
        required: true
    }



});

export default mongoose.model('horoscopes', horoscopeSchema);
