import Konva from "konva";
import { TreeAlgorithm } from "../../tree-algorithm";
import { BaseShape, Circle } from "../../../components";
import { TreeNode } from "../../tree-algorithm/tree-node";

export class BinarySearchTree extends TreeAlgorithm {
  serialize(): string {
    throw new Error("Method not implemented.");
  }
  deserialize(value: string): void {
    throw new Error("Method not implemented.");
  }
  constructor(layer: Konva.Layer) {
    super(layer, ["Insert", "Init", "Search", "Delete"]);
  }

  insertNode = (
    root: TreeNode | null,
    value: number,
    shape: BaseShape,
    depth: number = 0,
    x: number = 400,
    y: number = 50,
    offset: number = 200
  ): TreeNode => {
    if (root === null) {
      shape.setPosition(x, y);
      return new TreeNode(value, shape);
    }

    if (value < root.data) {
      const leftChild = this.insertNode(
        root.left,
        value,
        shape,
        depth + 1,
        x - offset,
        y + 50,
        offset / 2
      );
      root.left = leftChild;
      root.leftArrow = this.createArrow(root.shape, leftChild.shape);
    } else {
      const rightChild = this.insertNode(
        root.right,
        value,
        shape,
        depth + 1,
        x + offset,
        y + 50,
        offset / 2
      );
      root.right = rightChild;
      root.rightArrow = this.createArrow(root.shape, rightChild.shape);
    }

    return root;
  };

  insert = (value: number) => {
    const newShape = new Circle(value);
    newShape.addTo(this._layer);
    this.root = this.insertNode(this.root, value, newShape);
  };

  deleteNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteNode(root.left, value);
      if (root.left === null && root.leftArrow) {
        root.leftArrow.destroy();
        root.leftArrow = null;
      }
    } else if (value > root.data) {
      root.right = this.deleteNode(root.right, value);
      if (root.right === null && root.rightArrow) {
        root.rightArrow.destroy();
        root.rightArrow = null;
      }
    } else {
      // Node to be deleted found
      // Case 1: Leaf node
      if (root.left === null && root.right === null) {
        return null;
      }

      // Case 2: Single child
      if (root.left === null) {
        if (root.rightArrow) root.rightArrow.destroy();
        return root.right;
      } else if (root.right === null) {
        if (root.leftArrow) root.leftArrow.destroy();
        return root.left;
      }

      // Case 3: Two children
      if (root.left && root.right) {
        // Find the inorder successor
        const temp = this.minValueNode(root);
        console.log("Inorder successorkejwhfkjw", temp.data);
        //swap the data with inorder successor
        root.data = temp.data;
        // Delete the inorder successor
        root.right = this.deleteNode(root.right, temp.data);
      }
      root.shape.destroy();
    }

    return root;
  };

  delete = (value: number) => {
    this.root = this.deleteNode(this.root, value);
    this.updatePositions(this.root, 400, 50, 200); // Update positions after deletion
  };

  minValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  };

  searchNode = (root: TreeNode | null, value: number): TreeNode | null => {
    if (root === null || root.data === value) return root;

    if (value < root.data) return this.searchNode(root.left, value);
    return this.searchNode(root.right, value);
  };

  search = (value: number): boolean => {
    return this.searchNode(this.root, value) !== null;
  };

  initData = (values: number[]) => {
    this.root = null;
    this._layer.destroyChildren();
    values.forEach((value) => this.insert(value));
    this.updatePositions(this.root, 400, 50, 200); // Update positions after initialization
  };

  updatePositions = (
    root: TreeNode | null,
    x: number,
    y: number,
    offset: number
  ) => {
    if (root === null) return;
    root.shape.setPosition(x, y);
    if (root.left)
      this.updatePositions(root.left, x - offset, y + 50, offset / 2);
    if (root.right)
      this.updatePositions(root.right, x + offset, y + 50, offset / 2);
  };

  algorithm = async () => {
    // Implement the main algorithm to demonstrate BST operations
  };

  
}
