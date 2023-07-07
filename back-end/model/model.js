const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required:[true,'Name field is required']
    },
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password:{
        type: String,
        required: [true, 'password field is required']
    },
    token: { type: String }
});

const AdminLoginSchema = new Schema({
    username : {
        type:String,
        required: [true, 'username field is required']
    },
    password:{
        type: String,
        required: [true, 'password field is required']
    }
    },
    {
        collection:'admin'
    });

const ProductSchema = new Schema({});

const User = mongoose.model('users',UserSchema);
const AdminLogin = mongoose.model('admin',AdminLoginSchema);
const Products = mongoose.model('products',ProductSchema);

module.exports = {
    User,
    AdminLogin,
    Products
};
