import mongoose from 'mongoose';
import crypto from 'crypto';

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        required:[true, 'Session must belongs to a user']
    },
    token:{
        type: String,
        required: [true, 'Session must has a Token']
    },
    state:{
        type: Boolean,
        default: true
    }
});

sessionSchema.pre('save', function(next){

    this.token = crypto.createHash('sha256').update(this.token).digest('hex');
    next();
})



const Session = mongoose.model('Session', sessionSchema);

export default Session;