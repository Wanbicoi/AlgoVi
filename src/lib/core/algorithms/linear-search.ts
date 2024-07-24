import { ArrayAlgorithm } from "../array-algorithm";

export class linearSearch extends ArrayAlgorithm {
  async run(number: number = 2) {
    let n = this.data.length;
    for (let i = 0; i < n; i++) {
      await this.checkPause();
      await this.highlight(i);
      if (this.data[i].value === number) {
        await this.checkPause();
        await this.highlight(i);
        return i;
      }
      await this.checkPause();
      await this.unhighlight(i);
    }
    return -1;
  }
}
