const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/registration',  {useNewUrlParser: true, useUnifiedTopology: true});

const schema = new mongoose.Schema ({
    name: { type: String, required: true },
    event: { type: String, required: true },
    city: { type: String, required: true }
});
 
module.exports = mongoose.model('Event', schema);