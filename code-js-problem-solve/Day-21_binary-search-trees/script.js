class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value === this.value) return;

    if (value < this.value) {
      if (this.left === null) {
        this.left = new BSTNode(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BSTNode(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

const myBST = new BSTNode(50);
myBST.insert(40);
myBST.insert(60);
myBST.insert(45);
myBST.insert(35);
myBST.insert(55);
myBST.insert(100);
myBST.insert(1);

console.log(myBST);
