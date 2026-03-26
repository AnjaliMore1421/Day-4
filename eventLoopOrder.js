// eventLoopOrder.js

/*
==================================================
Inspect Event Loop Order using setTimeout, Promises, async/await
==================================================
*/

console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

async function asyncFunc() {
  console.log("Async Start");

  await Promise.resolve();

  console.log("Async After Await");
}

asyncFunc();

console.log("End");

/*
==================== OUTPUT ====================

Start
Async Start
End
Promise
Async After Await
setTimeout

================================================
*/


