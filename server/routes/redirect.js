var u = require('./utils');
var svc = require('./service');

var express = require('express');
var router = express.Router();

/**
 * Redirect the "shortUrl" to the long stored URL
 */
router.get('/:shortUrl', function (req, rsp, next) {
  svc.getByShort(req.params.shortUrl)
  .then((res) => {
    return rsp.redirect(res.orig);
  })
  .catch((e) => {
    console.error(`Failed to get by shortUrl '${req.params.shortUrl}'`);
    console.log((typeof e).toString)
    if (e instanceof u.NotFoundError) {
        rsp.status(404).json({error: `No record found for url: ${e.url}`})
    } else {
        rsp.status(500).json({error: `${e}`}) 
    }
  })
});

module.exports = router;
