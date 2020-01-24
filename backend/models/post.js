const mongoose = require('mongoose');

const schema = mongoose.Schema({
title: {type: String, required:true} ,//uperacse S in mngoos
content: {type: String, required:true}
});

module.exports  = mongoose.model('Post',schema);

