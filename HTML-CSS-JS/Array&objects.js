let sid = [10, 2, 3, 4, 5];
// How to acces array values
console.log(sid[3]);
// How to update any array values
sid[0] = 45;
console.log(sid);
// insert element at the end
sid.push(234);
sid.push("wer");
console.log(sid);

// Delete last item
sid.pop();
console.log(sid);

// insert value at index 0
sid.unshift(23);
sid.unshift(78879457);
console.log(sid);

// remove element form index 0
sid.shift();
console.log(sid);
console.log(sid.length);

// -----Objects (key and value pair);
let objsss = {
  s: "sid",
  age: 20,
  thw: [3, 2, 3, 23],
  data: {
    first: "Siddharth",
    last: "Sharma",
  },
};

console.log(objsss);
// Chaining procees
// how to read a partiucular data vale
console.log(objsss.data.first);

// how to insert
objsss.data.art = "rest";
console.log(objsss);

// update any data
objsss.age = 70;

console.log(objsss);

// for loop
// intialize a value; condition;inc/dec
for (let a = 0; a < sid.length; a++) {
  sid[a] = a * sid[a];
  console.log(a, sid[a]);
}
console.log(sid);
let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// map to iterate through every element of array
//Return a new array
// callback function with few arguments 1.value ,2.index
let arr1 = arr.map((val, index) => {
  return val * index;
});
console.log(arr, arr1);

// filter
// for Coditions
let arr2 = arr.filter((val, index) => {
  return val % 2 === 1;
});
console.log(arr2);

// reduce
// just give a single value
let val2 = arr.reduce((acc, asd, index) => {
  console.log(acc);

  return acc + asd;
}, 199);
console.log(val2);

let marks = 60;
// conditional; statement
if (marks > 80) {
  console.log("I will get A party");
} else if (marks > 70) {
  console.log("i will get a bike");
} else if (marks > 60) {
  console.log("i will get a purse");
} else {
  console.log("Now i will get slap");
}
