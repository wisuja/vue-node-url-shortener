const mongoose = require('../database');

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  slug: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

module.exports = mongoose.model('UrlPair', schema);
