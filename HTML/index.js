console.log(a);
// hoisting

var a = 10;
a = 4564;
console.log(a);

// Es6 let and const
// console.log(b);
// temporal dead zone
// referenceError
let b = 210;
b = 30;
console.log(b);

// {
//   let a = 20;
//   console.log(a);
// }

// const c = 2230;
// // c = 230;
// // typeError
// console.log(c);

// // function and function types
// as();
// // 1. Named Function
// function as() {
//   console.log("Hello");
//   console.log("world");
// }

// as();
// // a();
// // 2.function Expression
// let a = function () {
//   console.log("Function is declared by Functio nExpression");
// };

// a();

// // 3. Arrow function (Es6)
// let ass = () => {
//   console.log("Arrow");
//   console.log("function");
// };

// ass();

// // 4.Callback function /5.IIFE (immediately invoked function expression)

// (() => {
//   console.log("Iife");
//   console.log("Callback");
// })();

// () => {
//       console.log("Iife");
//       console.log("Callback");
//     }

let addTwoValues = (parameter1, parameter2) => {
  let num1 = parameter1;
  let num2 = parameter2;
  console.log(num1 + num2);
};

addTwoValues(30, 20);
addTwoValues(89, 90);
