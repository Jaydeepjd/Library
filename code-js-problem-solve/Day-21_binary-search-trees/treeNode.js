class TreeNode {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  add(name) {
    const node = new TreeNode(name);
    this.children.push(node);
    return node;
  }

  search() {
    
  }
}

const myTree = new TreeNode("media");
const imageNode = myTree.add("images");
imageNode.add("birthday").add("cake.png");
imageNode.add("wallpaper").add("nature.png");

myTree.add("music");

console.log(myTree);
