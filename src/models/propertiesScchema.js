const express = require("express")
const { boolean } = require("joi")
const mongoose = require("mongoose")
const { Schema } = mongoose

const propertySchema = new Schema({
    title: {
        type: String,
        required: true
    }, type: {
        type: String,
        required: true
    }, amount: {
        type: Number,
        required: true
    }, rooms: {
        type: Number,
        required: true
    }, bathrooms: {
        type: Number,
        required: true
    }, height: {
        type: Number,
        required: true
    }, location: {
        type: String,
        required: true
    }, image_url: {
        type: String,
        required: true
    }, featured: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const property = mongoose.model("property", propertySchema)

module.exports = property