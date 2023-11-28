import mongoose from 'mongoose';
import crypto from 'crypto';

const sessionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        required:[true, 'Session must belongs to a user']
    },
    tokenId:{
        type: String,
        required: [true, 'Session must has a Token']
    },
    valid:{
        type: Boolean,
        default: true
    }
});

sessionSchema.methods.toJson = function(){

    const session = this;
    const sessionObject = this.toobject();
    delete sessionObject.__v;
}

const Session = mongoose.model('Session', sessionSchema);

export default Session;