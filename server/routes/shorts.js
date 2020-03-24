var u = require('./utils');
var svc = require('./service');
var express = require('express');
var router = express.Router();

// Prepare internal record for the public API
forApi = (rec, req) => {
  const protocol = req.protocol;
  const host = req.headers.host;
  return {
    shortUrl: `${protocol}://${host}/${rec.short}`,
    origUrl: rec.orig,
    stats: rec.stats
  }
}

// Create new
router.post('/', function (req, rsp, next) {
  console.info("Adding new short url using: ", JSON.stringify(req.body))
  svc.shorten(req.body)
    .then((res) => rsp.json(forApi(res, req)))
    .catch((e) => {
      if (e instanceof u.InUseError) {
        console.info(`Unable to add a new short url for using the 'desired' value (${e.url}) since it's already used.`, {e})
        rsp.status(409).json({ error: `Desired URL is already in-use. url: ${e.url}` })
      } else {
        console.error("Failed to add a new short url.", { e })
        rsp.status(500).json({ error: `${e}` })
      }
    })
});

// Get by short url
router.get('/:shortUrl', function (req, rsp, next) {
  console.info("Getting details for short url: ", req.params.shortUrl)
  svc.getByShort(req.params.shortUrl)
    .then((res) => rsp.json(forApi(res, req)))
    .catch((e) => {
      console.error(`Failed to get by shortUrl '${req.params.shortUrl}'`);
      if (e instanceof u.NotFoundError) {
        rsp.status(404).json({ error: `No record found for url: ${e.url}` })
      } else {
        rsp.status(500).json({ error: `${e}` })
      }
    })
});

// Get all (TBD for current user)
router.get('/', function (req, rsp, next) {
  console.info("Getting all short url details.")
  svc.getAll()
    .then((res) => rsp.json(res.map(i => forApi(i, req))))
    .catch((e) => {
      console.error(`Failed to get all short url details.`, {e});
      rsp.status(500).json({ error: `${e}` })
    })
});

module.exports = router;
