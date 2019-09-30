

export class PipeNode {
  
  public pressure: boolean;
  public fixed: boolean;
  
  // The other Pipes that are connected at the ends.
  public node0: PipeNode;
  public node1: PipeNode;
  
  constructor(fixed: boolean, pressure: boolean) {
    this.pressure = pressure;
    this.fixed = fixed;
  }
}
