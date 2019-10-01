import {Treehouse} from '../scenery/treehouse';
import {PipeNode} from 'pipenode';
import {Graph} from 'graph';
import {Valve} from 'valve';
import {RealValve} from 'realvalve';
import {Gate} from 'gate';
import {PipePath} from '../scenery/pipepath';

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
      ab0c: new PipeNode(false, false),
      cd1: new PipeNode(false, false),
      d1e: new PipeNode(false, false),
      d1g: new PipeNode(false, false), // tricksy
      cd0e: new PipeNode(false, false),
      efhi: new PipeNode(false, false),
      ii: new PipeNode(false, false), // tricksy
      ijkm: new PipeNode(false, false),
      mm: new PipeNode(false, false), // internal to M
      mn: new PipeNode(false, false) // Also internal to M, but heading towards N
    });
    
    let valves = {
      w: new Valve('left', undefined, graph.pipes.lw, graph.pipes.wa, false, true, false, graph),
      a: new Valve('left', graph.pipes.ab1, graph.pipes.wa, graph.pipes.ab0c, false, true, false, graph),
      c: new Valve('right', graph.pipes.cd0e, graph.pipes.ab0c, graph.pipes.cd1, false, true, false, graph),
      d1: new Valve('left', graph.pipes.d1g, graph.pipes.cd1, graph.pipes.d1e, false, true, false, graph),
      e: new Valve('right', graph.pipes.d1e, graph.pipes.efhi, graph.pipes.cd0e, true, false, true, graph),
      i: new Valve('left', graph.pipes.ijkm, graph.pipes.efhi, graph.pipes.ii, false, true, false, graph),
      m: new Valve('right', graph.pipes.mm, graph.pipes.ijkm, graph.pipes.mn, false, true, false, graph)
    };
    
    let realValves = {
      w: new RealValve(this.windmillValve, valves.w),
      a: new RealValve(this.houses.A.valves[4], valves.a),
      c: new RealValve(this.houses.C.valves[2], valves.c),
      d1: new RealValve(this.houses.D1.valves[5], valves.d1),
      e: new RealValve(this.houses.E.valves[5], valves.e),
      i: new RealValve(this.houses.I.valves[4], valves.i),
      m: new RealValve(this.houses.M.valves[5], valves.m)
    };
    
    let gates = {
      a: new Gate(this.houses.A.incomingBridges['ground'].module1, graph.pipes.wa, graph),
      b1: new Gate(this.houses.B1.incomingBridges['A'].module0, graph.pipes.ab1, graph),
      b0: new Gate(this.houses.B0.outgoingBridges['C'].module0, graph.pipes.ab0c, graph),
      d0: new Gate(this.houses.D0.incomingBridges['C'].module0, graph.pipes.cd0e, graph),
      e: new Gate(this.houses.E.incomingBridges['D1'].module1, graph.pipes.d1e, graph),
      g: new Gate(this.houses.G.incomingBridges['F'].module1, graph.pipes.d1g, graph),
      h: new Gate(this.houses.H.incomingBridges['F'].module0, graph.pipes.efhi, graph),
      i: new Gate(this.houses.I.outgoingBridges['L'].module0, graph.pipes.ii, graph),
      j: new Gate(this.houses.J.incomingBridges['I'].module1, graph.pipes.ijkm, graph),
      lm: new Gate(this.houses.M.incomingBridges['L'].module1, graph.pipes.mm, graph),
      m: new Gate(this.houses.M.outgoingBridges['N'].module0, graph.pipes.mn, graph)
    };
    
    // loose pipe
    let d1gPipe = new PipePath(
      [
        new Vector3(41.93, 23.05, 27.356),
        new Vector3(43.842, 30.037, 23.842)
        
      ],
      false,
      true
    )
    
    return graph;
  }
}
