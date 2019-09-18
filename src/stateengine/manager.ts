import {Node} from 'node';
import {Edge} from 'edge';

import {Pump} from 'nodetypes/pump';
import {ValveTerminator} from 'nodetypes/valveTerminator';
import {Pipe} from 'edgetypes/pipe';

/**
 * A Manager class that manages the energy flow in the game.
 * This is an *opinionated* class! That is to say, it encodes the game puzzle logic :D
 */
export class Manager {
  
  private nodes: {[index: string]: Node};
  private edges: {[index: string]: Edge};
  
  constructor() {
    this.createNodes();
    this.createEdges();
  }
  
  createNodes() {
    this.nodes = {
      pump: new Pump(
        new Transform({
          position: new Vector3(8, 1, 8)
        }),
        "off"
      ),
      term: new ValveTerminator(
        new Transform({
          position: new Vector3(12, 1, 8)
        }),
        "off"
      )
    };
  }
  
  createEdges() {
    this.edges = {
      pipe: new Pipe(
        new Transform({
          position: new Vector3(10, 1, 8),
          rotation: Quaternion.Euler(0, 0, 90),
          scale: new Vector3(0.2, 2, 0.2)
        }),
        this.nodes.pump,
        this.nodes.term
      )
    };
    
    this.nodes.pump.addOutgoing(this.edges.pipe);
    this.nodes.term.addIncoming(this.edges.pipe);
  }
}
