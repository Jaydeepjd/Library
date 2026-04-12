# 1️⃣ Print All Node Names in the Tree (Depth-First Order)

```js
function printTreeNodeNames(node, depth = 0) {
  console.log("  ".repeat(depth) + node.name);

  for (const child of node.children) {
    printTreeNodeNames(child, depth + 1);
  }
}

printTreeNodeNames(mediaTree);
```

---

# 2️⃣ Count the Total Number of Nodes in the Tree

```js
function countTreeNodes(node) {
  let count = 1;

  for (const child of node.children) {
    count += countTreeNodes(child);
  }
  return count;
}

console.log(countTreeNodes(mediaTree));
```

---

# 3️⃣ Print Only Leaf Nodes

```js
function printLeafNodes(node) {
  if (!node.children.length) console.log(node.name);
  for (const child of node.children) {
    printLeafNodes(child);
  }
}

printLeafNodes(mediaTree);
```

---

# 4️⃣ DOM: Print All Tag Names Inside `document.documentElement` (DFS)

```js
function printTreeNodeNames(node, depth = 0) {
  console.log("  ".repeat(depth) + node.localName);

  for (const child of node.children) {
    printTreeNodeNames(child, depth + 1);
  }
}

printTreeNodeNames(document.documentElement);

```

---

# 5️⃣ DOM: Count Total Number of Elements Inside `document.body`

```js
function countTreeNodes(node) {
  let count = 1;

  for (const child of node.children) {
    count += countTreeNodes(child);
  }
  return count;
}

console.log(countTreeNodes(document.documentElement));
```