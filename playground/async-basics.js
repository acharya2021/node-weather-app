console.log("Starting app");

// demonstrating async

// a call back function is a function that gets passed as an argument to
// another function and executes after a certain event (like 2000ms passing)
setTimeout(() => {
    console.log("Inside of callback");
}, 2000);

setTimeout(() => {
    console.log("Second callback");
},0);

console.log("Finishing up");