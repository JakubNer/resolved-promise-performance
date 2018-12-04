const Benchmark = require('benchmark')

let fn = function () {
  var a = 3
  return a+2
};
let value = fn();
let donePromise = Promise.resolve(value);

const cb = function(cb){
  cb(null, true)
}
let suite = new Benchmark.Suite()
suite
.add('donePromise', {
  defer: true,
  fn: function(deferred) {
    deferred.resolve(donePromise);
  }})
.add('value', {
  defer: true,
  fn: function(deferred) {
    deferred.resolve(value);
  }})
.add('fn', {
  defer: true,
  fn: function(deferred) {
    deferred.resolve(fn());
  }})

  // add listeners
  .on('cycle', event => console.log("%s", event.target))
  .on('complete', function(){
    console.log('fastest :: ' + this.filter('fastest').map('name'))
  })
  .on('error', error => console.error(error))
  .run({ 'async': true })