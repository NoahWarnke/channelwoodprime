import {PipeNode} from 'pipenode';

export class Graph {
  public pipes: {[index: string]: PipeNode};
  
  public subscribed: Function[];
  
  constructor(pipes: {[index: string]: PipeNode}) {
    this.pipes = pipes;
    this.subscribed = [];
  }
  
  public updatePressures() {
    // For each pipe, if it connects to a fixed pressured pipe, it has pressure.
    
    // Find all fixed pressured pipes.
    let sources: PipeNode[] = [];
    for (let pipeKey in this.pipes) {
      let pipe = this.pipes[pipeKey];
      if (pipe.fixed && pipe.pressure) {
        sources.push(pipe);
      }
    }
    
    // Set all non-fixed pipes to pressure false.
    for (let pipeKey in this.pipes) {
      let pipe = this.pipes[pipeKey];
      if (!pipe.fixed) {
        pipe.pressure = false;
      }
    }
    
    // For each source, find all pipes it connects wtih, and set their pressures to true.
    for (let pipeKey in sources) {
      this.markAllConnectedNodesPressured(sources[pipeKey], []);
    }
    
    for (let pipeKey in this.pipes) {
      let pipe = this.pipes[pipeKey];
      log (pipeKey + ': ' + pipe.pressure);
    }
    
    this.updateSubscribed();
  }
  
  public markAllConnectedNodesPressured(node: PipeNode, visitedNodes: PipeNode[]): void {
    visitedNodes.push(node);
    
    if (node.node0 && visitedNodes.indexOf(node.node0) === -1) {
      node.node0.pressure = true;
      this.markAllConnectedNodesPressured(node.node0, visitedNodes);
    }
    if (node.node1 && visitedNodes.indexOf(node.node1) === -1) {
      node.node1.pressure = true;
      this.markAllConnectedNodesPressured(node.node1, visitedNodes);
    }
  }
  
  /**
   * Subscribe a callback function to state changes of the graph.
   */
  public subscribe(func: Function) {
    this.subscribed.push(func);
  }
  
  /**
   * Call the subscribed callbacks.
   */
  public updateSubscribed() {
    for (let subscriber of this.subscribed) {
      subscriber();
    }
  }
}
