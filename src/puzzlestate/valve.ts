import {Graph} from 'graph';
import {PipeNode} from 'pipenode';

// Constructos and removes Edges between Nodes (pipes) depending on state.
export class Valve {
  
  public state: string;
  
  public left: PipeNode;
  public center: PipeNode;
  public right: PipeNode;
  
  public leftIn: boolean;
  public centerIn: boolean;
  public rightIn: boolean;
  
  public graph: Graph;
  
  public constructor (startState: string, left: PipeNode, center: PipeNode, right: PipeNode, leftIn: boolean, centerIn: boolean, rightIn: boolean, graph: Graph) {
    this.left = left;
    this.center = center;
    this.right = right;
    
    this.leftIn = leftIn;
    this.centerIn = centerIn;
    this.rightIn = rightIn;
    
    this.graph = graph;
    
    this.setState(startState);
  }
  
  public setState(state: string) {
    if (this.state === state) {
      return;
    }
    
    this.state = state;
    
    // Undo all connections.
    if (this.left) {
      this.left['node' + (this.leftIn ? '1' : '0')] = undefined;
    }
    if (this.center) {
      this.center['node' + (this.centerIn ? '1' : '0')] = undefined;
    }
    if (this.right) {
      this.right['node' + (this.rightIn ? '1' : '0')] = undefined;
    }
    
    // Redo.
    if (this.state === 'left') {
      if (this.left) {
        this.left['node' + (this.leftIn ? '1' : '0')] = this.center;
      }
      if (this.center) {
        this.center['node' + (this.centerIn ? '1' : '0')] = this.left;
      }
    } else if (this.state === 'right') {
      if (this.right) {
        this.right['node' + (this.rightIn ? '1' : '0')] = this.center;
      }
      if (this.center) {
        this.center['node' + (this.centerIn ? '1' : '0')] = this.right;
      }
    }
    
    // Trigger graph update.
    this.graph.updatePressures();
  }
}
