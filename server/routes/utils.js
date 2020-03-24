// Errors
function InUseError(url) {
  this.url = url;
}

function NotFoundError(url) {
  this.url = url;
}

// Time helpers
function now() {
  return new Date();
}

function yesterday() {
  var d = new Date();
  d.setDate(d.getDate() - 1); 
  return d; 
}

// Promise Helpers
function pSuccess(res) {
  return new Promise((resolve, reject) => resolve(res));
}

function pError(e) {
  return new Promise((resolve, reject) => reject(e));
}

module.exports.InUseError = InUseError
module.exports.NotFoundError = NotFoundError
module.exports.now = now
module.exports.yesterday = yesterday
module.exports.pSuccess = pSuccess
module.exports.pError = pError

// module.exports = {
//   // Errors
//   InUseError(url) {
//     this.url = url;
//   },

//   NotFoundError(url) {
//     this.url = url;
//   },

//   // Time helpers
//   now() {
//     return new Date();
//   },

//   yesterday() {
//     var d = new Date();
//     d.setDate(d.getDate() - 1);
//     return d;
//   },

//   // Promise Helpers
//   pSuccess(res) {
//     return new Promise((resolve, reject) => resolve(res));
//   },

//   pError(e) {
//     return new Promise((resolve, reject) => reject(e));
//   }
// }