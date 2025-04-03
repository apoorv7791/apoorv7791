import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
},);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

//
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.password;
        return returnedObject;
    }
});

const User = model('User', userSchema);
export default User;
export const findById = (id) => User.findById(id);
export const findByIdAndUpdate = (id, update, options) => User.findByIdAndUpdate(id, update, options);
export const findByIdAndDelete = (id) => User.findByIdAndDelete(id);

// Add a function to save a new user and log the result
export const saveUser = async (userData) => {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        console.log('User saved:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};