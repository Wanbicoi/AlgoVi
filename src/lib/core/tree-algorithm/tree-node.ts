import { BaseShape } from "../../components";

export class TreeNode {
  data: number;
  height: number;
  left: TreeNode | null;
  right: TreeNode | null;
  shape: BaseShape;
  leftArrow: BaseShape | null;
  rightArrow: BaseShape | null;

  constructor(
    data: number,
    shape: BaseShape,
    left: TreeNode | null = null,
    right: TreeNode | null = null
  ) {
    this.data = data;
    this.height = 1;
    this.shape = shape;
    this.left = left;
    this.right = right;
    this.leftArrow = null;
    this.rightArrow = null;
  }
}
