// asyncExercises.js

// Utility function to simulate async task
function asyncTask(name, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${name} completed`);
      resolve(name);
    }, delay);
  });
}

/*
==================================================
1) SERIAL EXECUTION (One after another)
==================================================
*/

async function runSerial() {
  console.log("Serial Start");

  await asyncTask("Task 1", 1000);
  await asyncTask("Task 2", 1000);
  await asyncTask("Task 3", 1000);

  console.log("Serial End");
}

// runSerial();

/*
Output:
---------------------------------
Serial Start
Task 1 completed
Task 2 completed
Task 3 completed
Serial End
---------------------------------
*/


/*
==================================================
2) PARALLEL EXECUTION (All together)
==================================================
*/

async function runParallel() {
  console.log("Parallel Start");

  await Promise.all([
    asyncTask("Task 1", 1000),
    asyncTask("Task 2", 1000),
    asyncTask("Task 3", 1000)
  ]);

  console.log("Parallel End");
}

// runParallel();

/*
Output:
---------------------------------
Parallel Start
Task 1 completed
Task 2 completed
Task 3 completed
Parallel End
---------------------------------

*/


/*
==================================================
3) MIXED EXECUTION (Parallel + Serial)
==================================================
*/

async function runMixed() {
  console.log("Mixed Start");

  await asyncTask("Task 1", 1000);

  await Promise.all([
    asyncTask("Task 2", 1000),
    asyncTask("Task 3", 1000)
  ]);

  await asyncTask("Task 4", 1000);

  console.log("Mixed End");
}

// runMixed();

/*
Output:
---------------------------------
Mixed Start
Task 1 completed
Task 2 completed
Task 3 completed
Task 4 completed
Mixed End
---------------------------------
*/


/*
==================================================
4) PARALLEL WITH ERROR HANDLING
==================================================
*/

async function runParallelWithError() {
  console.log("Parallel Error Start");

  try {
    await Promise.all([
      asyncTask("Task 1", 1000),
      Promise.reject("Task 2 Failed"),
      asyncTask("Task 3", 1000)
    ]);
  } catch (err) {
    console.log("Error:", err);
  }

  console.log("Parallel Error End");
}

// runParallelWithError();

/*
Output:
---------------------------------
Parallel Error Start
Error: Task 2 Failed
Parallel Error End
---------------------------------
*/


/*
==================================================
5) PARALLEL USING Promise.allSettled
==================================================
*/

async function runAllSettled() {
  console.log("AllSettled Start");

  const results = await Promise.allSettled([
    asyncTask("Task 1", 1000),
    Promise.reject("Task 2 Failed"),
    asyncTask("Task 3", 1000)
  ]);

  console.log(results);
  console.log("AllSettled End");
}

// runAllSettled();

/*
Output:
---------------------------------
AllSettled Start
Task 1 completed
Task 3 completed
[
  { status: "fulfilled", value: "Task 1" },
  { status: "rejected", reason: "Task 2 Failed" },
  { status: "fulfilled", value: "Task 3" }
]
AllSettled End
---------------------------------
*/
