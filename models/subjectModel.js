import { Schema, model } from 'mongoose';

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lessoons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
}, { timestamps: true });

const Subject = model('Subject', subjectSchema);
export default Subject;
