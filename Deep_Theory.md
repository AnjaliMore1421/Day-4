# Day 4 – Full Deep Content

## Deep Theory 

### 1)Event Loop
The Event Loop is a mechanism that allows JavaScript to perform non-blocking asynchronous operations despite being single-threaded.

- Executes code from the call stack
- Handles async operations via callback queues
- Continuously checks and moves tasks for execution

1. JavaScript Execution Model

JavaScript works on three main components:

- Call Stack → Executes synchronous code (LIFO)
- Web APIs → Handles async tasks (setTimeout, fetch, DOM events)
- Callback Queues → Stores async callbacks

2. Types of Queues

 a) Macro Task Queue (Callback Queue)
- setTimeout()
- setInterval()
- DOM events

 b) Micro Task Queue
- Promises (.then, .catch, .finally)
- MutationObserver

Priority Rule: 
Microtasks are executed before macrotasks.

 3. Working of Event Loop

Execution flow:

1. Run all synchronous code (Call Stack)
2. Process all Microtasks
3. Execute one Macrotask
4. Repeat

 4. Example :
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
Output:
Start
End
Promise
Timeout


 2) Microtask Queue vs Macrotask Queue

1. Microtask Queue
Microtasks are high-priority tasks executed immediately after the current synchronous code.

Examples:
- Promise.then()
- Promise.catch()

Key Points:
- Executed before macrotasks
- Fully drained before moving to next task
- Used for smaller, immediate async operations

2. Macrotask Queue (Callback Queue)
Macrotasks are lower-priority tasks executed after microtasks are completed.

Examples:
- setTimeout()
- setInterval()

Key Points:
- Executed after microtasks
- Only one macrotask is processed per cycle
- Used for scheduled or delayed operations

 Difference Between Microtask and Macrotask

| Feature            | Microtask Queue                | Macrotask Queue              |
|------------------|------------------------------|-----------------------------|
| Priority         | High                         | Low                         |
| Execution Time   | Before macrotasks            | After microtasks            |
| Execution Count  | All executed in one cycle    | One per event loop cycle    |
| Examples         | Promises                     | setTimeout, setInterval     |


 Example :

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask");
});

console.log("End");
Output:
Start
End
Microtask
Macrotask


 3) Promises & Internal State Transitions

 Promise :
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation.

 Promise States -

A Promise has three internal states:

1. Pending
   - Initial state
   - Operation is still in progress

2. Fulfilled (Resolved)
   - Operation completed successfully
   - Returns a value

3. Rejected
   - Operation failed
   - Returns an error


 State Transition Flow

Pending → Fulfilled
Pending → Rejected

- A Promise can move from **Pending → Fulfilled**  
- OR from **Pending → Rejected**  
- Once settled, the state is **final (immutable)**  

 Example :
const promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Operation Successful");
  } else {
    reject("Operation Failed");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error));

Output (if resolved):
Operation Successful

Output (if rejected):
Operation Failed

Internal Working
resolve() → moves Promise to Fulfilled
reject() → moves Promise to Rejected
.then() handles fulfilled state
.catch() handles rejected state
.finally() runs in both cases

Promise Chaining Example -
Promise.resolve(10)
  .then(num => num * 2)
  .then(num => num + 5)
  .then(result => console.log(result));
Output:
25


4) Async/Await Compilation Behavior

 async/await :
- `async/await` is syntactic sugar over Promises
- Makes asynchronous code look like synchronous code

 How async Works -
- An `async` function always returns a Promise
- If a value is returned → it is wrapped in `Promise.resolve()`

async function example() {
  return "Hello";
}

Equivalent to:

function example() {
  return Promise.resolve("Hello");
}

How await Works
await pauses execution of the async function
Waits for the Promise to resolve or reject
Does not block the entire program (only the async function)
Internal Compilation Behavior


Example
async function test() {
  console.log("Start");

  await Promise.resolve();

  console.log("After Await");
}

test();
console.log("End");
Output:
Start
End
After Await

Explanation
"Start" → synchronous execution
await → pauses function & moves remaining code to microtask queue
"End" → runs next (global execution)
"After Await" → runs from microtask queue

Equivalent Promise Version :
function test() {
  console.log("Start");

  Promise.resolve().then(() => {
    console.log("After Await");
  });
}

test();
console.log("End");

Error Handling :
async function test() {
  try {
    let result = await Promise.reject("Error");
  } catch (err) {
    console.log(err);
  }
}

5)Fetch API pipeline & error propagation.
 Fetch API :
The Fetch API is used to make HTTP requests and returns a Promise.
fetch(url)

Fetch Pipeline (Step-by-Step) -
1.Request Initiated
fetch() is called → returns a Promise
2.Network Request
Sent to server via Web APIs (browser)
3.Response Received
Promise resolves with a Response object
4.Data Parsing
Use .json(), .text(), etc. (also returns a Promise)
5.Final Data Handling
Process the parsed data

Example
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

Handling HTTP Errors Properly
fetch("https://api.example.com/data")
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error.message));

Error Propagation -
Errors thrown inside .then() are passed to .catch()
Rejected Promises automatically go to .catch()
Example of Error Flow
fetch("invalid-url")
  .then(res => res.json())
  .then(data => {
    throw new Error("Manual Error");
  })
  .catch(err => console.log("Caught:", err.message));

Async/Await Version
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log(error.message);
  }
}
