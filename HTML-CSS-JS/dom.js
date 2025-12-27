// // 1.Tag Selector (Tag)
// let a = document.getElementsByTagName("h1");
// // return array (HTMlCollection)
// console.log(a[1]);
// tags

// // 2. Id selector (id)
// let b = document.getElementById("b");
// // return a single value and first value
// console.log(b);

// // 3. class selector (classes)
// let c = document.getElementsByClassName("c");
// // return array (HTMlCollection)
// console.log(c[1]);

// // 4.querySelector(tag, id, class);
// let d = document.querySelector(".c");
// // return single value and first value
// console.log(d);

// // 5. QuerySelectorAll (tag, id, class)
// let e = document.querySelectorAll(".c");
// // return array (Nodelist);
// console.log(e[0]);

// // read and write operation
// // read
// console.log(b.textContent);

// // write
// b.textContent = "Heelo written from js";

// // Classes add/remove/toggle

// let dd = document.querySelector(".a");
// console.log(dd);
// dd.classList.add("qwer");
// dd.classList.remove("d");
// dd.classList.toggle("er");

// // Styles
// dd.style.backgroundColor = "red";
// dd.style.width = "100px";
// dd.style.color = "green";

// // Create Element
// let heading3 = document.createElement("h3"); <h3></h3>
// heading3.textContent = "Heading 3";<h3>Heading 3</h3>
// document.body.appendChild(heading3);

// let arr = ["as", "dfdf", "erew", "rtrt"];
// let list = document.createElement("ul");
// let li1 = document.createElement("li");
// li1.textContent = arr[0];
// let li2 = document.createElement("li");
// li2.textContent = arr[1];
// let li3 = document.createElement("li");
// li3.textContent = arr[2];
// let li4 = document.createElement("li");
// li4.textContent = arr[3];
// list.appendChild(li1);
// list.appendChild(li2);
// list.appendChild(li3);
// list.appendChild(li4);
// for (let i = 0; i < arr.length; i++) {
//   let li = document.createElement("li");
//   li.textContent = arr[i];
//   list.appendChild(li);
// }

// let hide = document.querySelector(".hide");
// let btn = document.querySelector("button");
// let input = document.querySelector("input");
// console.log(input);

// console.log(hide, btn);
// btn.addEventListener("click", () => {
//   hide.classList.toggle("hide");
//   console.log(input.value);
//   if (input.value.trim() !== "") {
//     list.classList.remove("hide");
//     document.body.appendChild(list);
//   } else {
//     list.classList.add("hide");
//   }
// });

const person = {
  nameLast: "Smith",
};
let greet = function (parameter) {
  console.log(`${parameter} is the `, this.nameLast);
};

const greetPerson = greet.bind(person);
greetPerson("Hello");

function introduce(parameter, parameter2) {
  console.log(`${parameter} ${parameter2} I am `, this.nameLast);
}

introduce.call(person, "hi", "there");

introduce.apply(person, ["hi", "there"]);

var a = 10;
console.log(window.a);

function add() {
  let a = 30;
  console.log(this.a + a);
}

add();
