import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const companySchema = Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    products: {
        type: String,
    },
    exportMarkets: {
        type: String,
    },
    location: {
        type: String,
    },
    frontImage: {
        type: String,
    },
    bgImage: {
        type: String
    }
});

const Company = mongoose.model('Company', companySchema);
companySchema.index({ name: 'text', description: 'text', products: 'text' });

export default Company;
