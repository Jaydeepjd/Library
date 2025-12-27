const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./module/replaceTemplate");

// // blocking code
// // synchronous code

// // 1 Read file in a Synchronous manner
// // File path , encryption
// const fsDataRead = fs.readFileSync("./txt/start.txt", "utf-8");
// console.log("data read from file is ", fsDataRead);

// console.log("hello");

// // write file
// // 3/ 1.path 2. content ,encryption
// fs.writeFileSync("./txt/finyyyal.txt", "I  using fsreadsync", "utf-8");

// // Non-Blocking Code
// // Asynchrornous way
// // 1Read file
// // 3argument
// // 1.path 2.encyrption 3. callbackback function(err,data)
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.log("have some error");
//   console.log(data);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err1, data1) => {
//     if (err1) return console.log("have some error");
//     console.log(data1);
//   });
// });

// // Write file async
// //  1.path 2.content 3.encyrption 4. callbackback function(err)
// fs.writeFile(
//   "./txt/final.txt",
//   "Hello from Non blocking code",
//   "utf-8",
//   (err) => {
//     if (err) return console.log("have some error", err);
//     console.log("Filee Written Succesfully");
//   }
// );

// // http stauts code
// // 1xx: 100-199: Information
// // 2xx: 200-299: SUccess
// // 3xx: 300-399: Redirection
// // 4xx: 400-499:Client error
// // 5xx: 500-599: Server error

// 1. Server creation
// callback function
// req,res

const overview = fs.readFileSync("./templates/overview.html", "utf-8");
const product = fs.readFileSync("./templates/product.html", "utf-8");
const card = fs.readFileSync("./templates/card.html", "utf-8");
const productData = fs.readFileSync("./dev-data/index.json", "utf-8");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = JSON.parse(productData)
      .map((prod) => replaceTemplate(card, prod))
      .join(" ");
    let output = overview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const products = JSON.parse(productData)[query.ID];
    // console.log(products);
    let output = replaceTemplate(product, products);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(productData);
  } else {
    res.end("URL not found");
  }
  //   res.end("My first node server created succefully");
});

// 2.Server start
// port no , Ip addres, callback functiomn
server.listen(9000, "127.0.0.1", () => {
  console.log("Server started on port no 9000");
});
