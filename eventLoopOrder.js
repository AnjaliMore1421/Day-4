// eventLoopOrder.js

/*
==================================================
Inspect Event Loop Order using setTimeout, Promises, async/await
==================================================
*/

console.log("Start"); 
// Runs first → synchronous code

setTimeout(() => {
  console.log("setTimeout");
}, 0); 
// Macrotask → runs after current stack & microtasks

Promise.resolve().then(() => {
  console.log("Promise");
}); 
// Microtask → runs after current synchronous code but before macrotasks

async function asyncFunc() {
  console.log("Async Start"); 
  // Runs synchronously when async function is called

  await Promise.resolve(); 
  // Pauses function here, schedules rest in microtask queue

  console.log("Async After Await"); 
  // Runs after all current synchronous code
}

asyncFunc(); // Calls async function

console.log("End"); 
// Runs next → synchronous code

/*
==================== OUTPUT ====================

Start           // Synchronous
Async Start     // Synchronous inside async function
End             // Remaining synchronous code
Promise         // Microtask from Promise
Async After Await // Microtask from async/await
setTimeout      // Macrotask from setTimeout

================================================
*/

