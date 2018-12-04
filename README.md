# Benchmark

What is the overhead of requesting a value from a resolved promise?

# Motivation

For a static value that is retrieved asynchronously subsequent calls return the same known value:  what is the 
performance cost once it can be furnished as an already resolved promise?

For example a static data-point retrieved from some data-source is always retrieved as a promise.  The first
retrieval will incur asynchronous penalty as the value is unknown.  What about subsequent retrievals?  We're still 
using promises in an asynchronous call, but what's the cost?

# Running

```
npm install
node index.js
```

# Results

```
donePromise x 186,285 ops/sec ±39.04% (17 runs sampled)
value x 220,988 ops/sec ±19.03% (11 runs sampled)
fn x 80,614 ops/sec ±137.75% (10 runs sampled)
fastest :: value,donePromise,fn

donePromise x 39,003 ops/sec ±173.98% (16 runs sampled)
value x 116,206 ops/sec ±103.88% (10 runs sampled)
fn x 128,695 ops/sec ±88.12% (11 runs sampled)
fastest :: fn,value,donePromise

donePromise x 171,476 ops/sec ±31.84% (13 runs sampled)
value x 183,915 ops/sec ±43.85% (11 runs sampled)
fn x 30,836 ops/sec ±192.23% (9 runs sampled)
fastest :: donePromise,value,fn
```

Retrieval from a resulved promise is almost as fast as retrieval of the value sans *Promise* wrapper.

Note that all tests are asynchronous calls--even when the value could be returned synchronously.  This is to mimic
the fact that resolved promises can only be used in asynchronous call handlers.