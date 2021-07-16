import mongoose from "mongoose";

const Schema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: String,
    active: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('User', Schema)