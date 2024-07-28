import Konva from "konva";
import { TreeAlgorithm } from "../../tree-algorithm";
import { BaseShape, Circle, Column } from "../../../components";
import { TreeNode } from "../../tree-algorithm/tree-node";
export class AVLTree extends TreeAlgorithm {
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init", "Search", "Delete"]);
  }

  // Helper method to get the height of a node
  height(node: TreeNode | null): number {
    return node ? node.height : 0;
  }

  // Helper method to get the balance factor of a node
  getBalanceFactor(node: TreeNode | null): number {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  // Right rotate
  rightRotate(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

    // Update arrows
    if (y.leftArrow) y.leftArrow.destroy();
    if (x.rightArrow) x.rightArrow.destroy();
    if (T2) x.rightArrow = this.createArrow(x.shape, T2.shape);
    y.leftArrow = this.createArrow(y.shape, x.shape);

    return x;
  }

  // Left rotate
  leftRotate(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

    // Update arrows
    if (x.rightArrow) x.rightArrow.destroy();
    if (y.leftArrow) y.leftArrow.destroy();
    if (T2) x.rightArrow = this.createArrow(x.shape, T2.shape);
    y.leftArrow = this.createArrow(y.shape, x.shape);

    return y;
  }

  // Insert node into AVL tree
  insertNode(root: TreeNode | null, value: number, shape: BaseShape): TreeNode {
    if (root === null) return new TreeNode(value, shape);

    if (value < root.data) {
      root.left = this.insertNode(root.left, value, shape);
      root.leftArrow = this.createArrow(root.shape, root.left.shape);
    } else if (value > root.data) {
      root.right = this.insertNode(root.right, value, shape);
      root.rightArrow = this.createArrow(root.shape, root.right.shape);
    } else {
      return root; // Duplicate values not allowed
    }

    // Update height of this ancestor node
    root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

    // Get the balance factor of this ancestor node to check whether this node became unbalanced
    const balance = this.getBalanceFactor(root);

    // If the node becomes unbalanced, then there are 4 cases

    // Left Left Case
    if (balance > 1 && value < root.left!.data) return this.rightRotate(root);

    // Right Right Case
    if (balance < -1 && value > root.right!.data) return this.leftRotate(root);

    // Left Right Case
    if (balance > 1 && value > root.left!.data) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }

    // Right Left Case
    if (balance < -1 && value < root.right!.data) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  insert = (value: number) => {
    const newShape =
      this.type === "circle" ? new Circle(value) : new Column(value);
    newShape.addTo(this._layer);
    this.root = this.insertNode(this.root, value, newShape);
  };

  // Search node
  searchNode(root: TreeNode | null, value: number): TreeNode | null {
    if (root === null || root.data === value) return root;

    if (value < root.data) return this.searchNode(root.left, value);
    return this.searchNode(root.right, value);
  }

  search = (value: number): boolean => {
    return this.searchNode(this.root, value) !== null;
  };

  // Delete node
  deleteNode(root: TreeNode | null, value: number): TreeNode | null {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (root.left === null || root.right === null) {
        const temp = root.left ? root.left : root.right;
        if (temp === null) {
          root = null;
        } else {
          root = temp;
        }
      } else {
        const temp = this.minValueNode(root.right);
        root.data = temp.data;
        root.shape = temp.shape;
        root.right = this.deleteNode(root.right, temp.data);
      }
    }

    if (root === null) return root;

    root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

    const balance = this.getBalanceFactor(root);

    if (balance > 1 && this.getBalanceFactor(root.left) >= 0)
      return this.rightRotate(root);
    if (balance > 1 && this.getBalanceFactor(root.left) < 0) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }
    if (balance < -1 && this.getBalanceFactor(root.right) <= 0)
      return this.leftRotate(root);
    if (balance < -1 && this.getBalanceFactor(root.right) > 0) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  delete = (value: number) => {
    this.root = this.deleteNode(this.root, value);
  };

  minValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  };

  initData = (values: number[]) => {
    this.root = null;
    this._layer.destroyChildren();
    values.forEach((value) => this.insert(value));
  };

  algorithm = async () => {
    // Implement the main algorithm to demonstrate AVL tree operations
  };
}
