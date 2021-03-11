const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const pitchSchema =  new Schema ({
title:{type: String},
content: {type: String},
img: {type: String},
user: {type: String},
file: {data: Buffer, contentType: String}
})

const Pitch = mongoose.model("Pitch", pitchSchema);

module.exports = Pitch;