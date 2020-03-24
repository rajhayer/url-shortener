
var u = require('./utils');

/////////////////////////////////////////////////////////////////////////////////////////////////
// Config 
//   TBD - load from file
var config = require('../config.json')

/////////////////////////////////////////////////////////////////////////////////////////////////
// DB Layer
var loki = require('lokijs');
var uuid = require('uuid');

const db = new loki('short-db.json')
const shorts = db.addCollection('shorts');

// Add some hard-coded data
shorts.insert(
  {
    short: "jim",
    orig: "http://www.my.site/long/url/jim",
    stats: {
      createdOn: u.yesterday,
      expiresOn: u.yesterday,
      accessed: {
        last: u.now(),
        total: 1111
      }
    }
  }
);

shorts.insert(
  {
    short: "bob",
    orig: "http://www.my.site/long/url/bob",
    stats: {
      createdOn: u.yesterday,
      expiresOn: u.yesterday,
      accessed: {
        last: u.now(),
        total: 88
      }
    }
  }
);

// Abstract the Database to make it easier to swap out the internals
class ShortenDbWrapper {
  constructor() {
    this.db = new loki('short-db.json')
    this.shorts = db.addCollection('shorts');
  }

  getByShort = (short) => {
    const arr = this.shorts.find({ short: short });
    // Not found === undefined
    if (arr.size == 0) {
      return undefined;
    } else {
      return arr[0];
    }
  }

  add = (newRec) => {
    this.shorts.insert(newRec);
  }

  removeExpired = () => {
    this.shorts.chain()
      .find({ 'stats.expiresOn': { '$gte': u.now } })
      .remove()
  }

  all = () => this.shorts.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Service Layer

function nextShortId(size = 8) {
  return uuid.v4().substr(0, size);
}

const nextId = nextShortId();

// TODO: periodically garbage collect the expired records. Can do this asynchronously
class ShortenService {

  constructor() {
    this.db = new ShortenDbWrapper()
  }

  cleanup = () => u.pSuccess(this.db.removeExpired())

  getAll = () => {
    return svc.cleanup()
      .then(res => {
        return u.pSuccess(this.db.all())
      })
  }

  getByShort = (shortUrl) => {
    return svc.cleanup()
      .then(res => {
        const rec = this.db.getByShort(shortUrl);
        if (!rec) {
          return u.pError(new u.NotFoundError(shortUrl));
        } else {
          return u.pSuccess(rec);
        }
      })
  }

  shorten = (create) => {
    return svc.cleanup()
      .then(res => {
        // Get the next id
        var nextId;
        // If user has requested a specific record then try to get it. Fail if it already exists.
        const desired = create.desired;
        if (desired) {
          console.log("res", this.db.getByShort(desired))
          if (this.db.getByShort(desired)) {
            console.log("IN USE: " + desired)
            return u.pError(new u.InUseError(desired));
          }
          nextId = desired;
        } else {
          // Unlikely but possible that random next id is already in-use so retry in that case
          // TODO: May need to bump up the size since a it's possible in a large scale deployment that MOST of a certain size are taken.
          do {
            nextId = nextShortId();
          } while (this.db.getByShort(nextId));
        }

        const now = new Date();
        const newRec = {
          orig: create.url,
          short: nextId,
          stats: {
            createdOn: now,
            expiresOn: new Date(now.getTime() + config.expiresInMin * 60 * 1000)
          }
        };
        this.db.add(newRec);

        // Even though Loki is sync, the service should be async to support swapping out to an async DB later.
        return u.pSuccess(newRec);
      });
  }
}

const svc = new ShortenService();
module.exports = svc;
