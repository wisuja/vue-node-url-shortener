const { v4: uuid } = require('uuid');
const mongoose = require('../database');
const UrlPair = require('../models/UrlPair');

exports.Show = (req, res) => {
  let { slug } = req.params;

  UrlPair.findOne({ slug: slug })
    .exec()
    .then((result) => {
      if (result.length == 0)
        return res.status(404).json({
          message: 'Not Found.',
        });

      return res.json({
        url: result.url,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

exports.Create = (req, res) => {
  let { url, custom_url } = req.body;

  if (url == '')
    return res.status(400).json({
      message: 'Url is required',
    });

  UrlPair.find({ url: url })
    .exec()
    .then((result) => {
      if (result.length > 0)
        return res.status(400).json({
          message: 'URL already existed.',
        });

      let new_url = '';
      if (custom_url != '') new_url = custom_url;

      if (new_url == '')
        new_url = uuid()
          .substring(0, 15)
          .replace(/[^a-zA-Z0-9]/g, '');

      const urlPair = new UrlPair({
        _id: mongoose.Types.ObjectId(),
        url: url,
        slug: new_url,
      });

      urlPair.save().then((result) => {
        return res.json({
          data: result,
          message: 'Success!',
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};
