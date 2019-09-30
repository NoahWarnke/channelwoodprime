import {Treehouse} from '../scenery/treehouse';
import {PipeNode} from 'pipenode';
import {Graph} from 'graph';
import {Valve} from 'valve';
import {RealValve} from 'realvalve';
import {Gate} from 'gate';

/**
 * A builder that creates the pipe-based puzzle state and logic.
 */
export class PuzzleBuilder {
  
  public houses: {[index: string]: Treehouse};
  public windmillValve: Entity;
  
  constructor(houses: {[index: string]: Treehouse}, windmillValve: Entity) {
    this.houses = houses;
    this.windmillValve = windmillValve;
  }
  
  build(): Graph {
    // Create our graph.
    
    let graph = new Graph({
      lw: new PipeNode(true, true),
      wa: new PipeNode(false, false),
      ab1: new PipeNode(false, false),
      ab0: new PipeNode(false, false)
    });
    
    let valves = {
      w: new Valve('left', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      a: new Valve('left', graph.pipes.ab1, graph.pipes.wa, graph.pipes.ab0, false, true, false, graph),
      //new Valve('right', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      //new Valve('right', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      //new Valve('right', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      //new Valve('right', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      //new Valve('right', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
    };
    
    let realValves = {
      w: new RealValve(this.windmillValve, valves.w),
      a: new RealValve(this.houses.A.valves[4], valves.a)
    };
    
    let gates = {
      a: new Gate(this.houses.A.incomingBridges['ground'].module1, graph.pipes.wa, graph),
      b1: new Gate(this.houses.B1.incomingBridges['A'].module1, graph.pipes.ab1, graph),
    };
    
    return graph;
  }
}
