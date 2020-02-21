export class Point {
  public x: number;
  public y: number;
  public r: number;
  public result: boolean;

  constructor(x: number, y: number, r: number, result?: boolean) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.result = result;
  }
}
