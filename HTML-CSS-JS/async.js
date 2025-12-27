// setTimeout(() => {
//   console.log("Hello from SetTimeout");
// }, 0);
// // 1. Callback Function
// // 2. Timer
// setTimeout(() => {
//   console.log("Hello fromdsfsdfdsf SetTimeout");
// }, 10000);

// callback hell
// nested function
// identify:pyramid type structure
// setTimeout(() => {
//   console.log("Function 1");
//   setTimeout(() => {
//     console.log("Function 2");
//     setTimeout(() => {
//       console.log("Function 3");
//       setTimeout(() => {
//         console.log("Function 4");
//       }, 2000);
//     }, 2000);
//   }, 2000);
// }, 2000);

// Promises
// 3 States
// Pending
// Fulfilled
// rejected
// let myResultPromise = new Promise((res, rej) => {
//   let marks = 45;
//   if (marks > 70) {
//     res("Now My father will give me treat");
//   } else {
//     rej("Now i got maar");
//   }
// });
// .then and .catch
// Error handling
// Chaining process(Sydefacte)
// myResultPromise
//   .then((msg) => {
//     console.log("resolve cases", msg);
//   })
//   .catch((err) => {
//     console.log("reject cases", err);
//   });
// console.log("Hello world");

// Async and await
// We have to write async keyword before function
// No inbuilt error handling
// for resolve cases output will come inside try
// error cases will be handle by catch

// const promiseHandler = async () => {
//   try {
//     console.log("inside try");

//     const response = await myResultPromise;
//     console.log("async", response);
//     console.log("hello inside async");
//   } catch (err) {
//     console.log("async", err);
//   } finally {
//     console.log("it will run in all cases");
//   }
// };

// promiseHandler();
//Fetch an api
const apiHandler = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    console.log(response);
    const data = await response.json();
    console.log(data);
    const table = document.querySelector("table");
    const tablebody = document.querySelector("#a");
    table.classList.remove("hidden");
    let tr = document.createElement("tr");
    // tr.innerHTML = `<td>${data[0].name}</td>
    // <td>${data[0].username}</td>`;
    // tablebody.appendChild(tr);
    data.forEach((asd) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${asd.name}</td>
      <td>${asd.username}</td>`;
      tablebody.appendChild(tr);
    });
  } catch (err) {
    console.log(err);
  }
};
console.log("Checking api");

apiHandler();
