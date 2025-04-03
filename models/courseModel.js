import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    enrolledUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

export default model('Course', courseSchema);