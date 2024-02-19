import { Schema, model } from "mongoose"

const userSchema = Schema({
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
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    rol: {
        type: String,
        uppercase: true,
        enum: ['STUDENT', 'TEACHER'],
        required: true
    }
}, {
    versionKey: false
})

export default model('user', userSchema)