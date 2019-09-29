
export class Treehouse {
  
  static pipeShapes: {[index: string]: GLTFShape} = {
    full: new GLTFShape('models/pipes/pipe_edge_straight.glb'),       // full pipe
    gap: new GLTFShape('models/pipes/pipe_edge_gap.glb'),             // gap with 1/4 both sides
    shortl: new GLTFShape('models/pipes/pipe_edge_short_l.glb'),      // just 1/4 left pipe
    shortr: new GLTFShape('models/pipes/pipe_edge_short_r.glb'),      // just 1/4 right pipe
    medl: new GLTFShape('models/pipes/pipe_edge_med_l.glb'),          // just 3/4 left pipe
    medr: new GLTFShape('models/pipes/pipe_edge_med_r.glb'),          // just 3/4 right pipe
    valvel: new GLTFShape('models/pipes/pipe_edge_w_valve_a.glb'),// full pipe with left valve
    valver: new GLTFShape('models/pipes/pipe_edge_w_valve_b.glb'),// full pipe with right valve
  };
  
  static railShapes: {[index: string] : GLTFShape} = {
    full: new GLTFShape('models/treehouses/fenceLong.glb'),
    gap: new GLTFShape('models/treehouses/fenceShort.glb')
  };
  
  static houseShapes: {[index: string] : GLTFShape} = {
    house: new GLTFShape('models/treehouses/treehouse.glb'),
    plat: new GLTFShape('models/treehouses/platformOnly.glb')
  };
  
  public centerPos: Vector3;
  
  constructor(transform: Transform, pipeLayout: string[], railLayout: string[], whichHouse: string) {
    
    // Holder for all the treehosue models.
    let root = new Entity();
    root.addComponent(transform);
    this.centerPos = transform.position;
    
    // The actual house.
    let house = new Entity();
    house.addComponent(Treehouse.houseShapes[whichHouse]);
    house.addComponent(new Transform({
      rotation:  Quaternion.Euler(0, 30, 0)
    }));
    house.setParent(root);
    
    // Treehand. Easier to attach it here than to the tree.
    /*
    let hand = new Entity();
    hand.addComponent(new GLTFShape('models/trees/hand_v2.glb'));
    hand.addComponent(new Transform({
      //rotation:  Quaternion.Euler(0, 30, 0)
    }));
    hand.setParent(root);
    */
    
    // Load the pipes
    for (let i = 0; i < 6; i++) {
      let pipeShape = Treehouse.pipeShapes[pipeLayout[i]];
      if (pipeShape === undefined) {
        continue;
      }
      let pipe = new Entity();
      pipe.addComponent(pipeShape);
      pipe.addComponent(new Transform({
        rotation: Quaternion.Euler(0, i * -60 + 90, 0)
      }));
      pipe.setParent(root);
    }
    
    // Load the railings.
    for (let i = 0; i < 6; i++) {
      let railShape = Treehouse.railShapes[railLayout[i]];
      if (railShape === undefined) {
        continue;
      }
      
      let rail = new Entity();
      rail.addComponent(railShape);
      rail.addComponent(new Transform({
        rotation: Quaternion.Euler(0, i * -60 + 90, 0)
      }));
      rail.setParent(root);
    }
    
    
    engine.addEntity(root);
  }
  
  /**
   * Get the angle of a socket with the given index (0-5)
   */
  public static getSocketAngle(num: number) {
    num = Math.max(0, Math.min(num, 5)); // Check.
    return num * Math.PI / 3;
  }
  
  public getSocketPos(num: number) {
    let angle = Treehouse.getSocketAngle(num);
    return this.centerPos.add(new Vector3(Math.cos(angle), 0, Math.sin(angle)).scale(3.464));
  }
  
  public getPos() {
    return this.centerPos;
  }
  
  public static reachFromPos(pos: Vector3, socket: number, distance: number, altitude: number): Vector3 {
    let angle = Treehouse.getSocketAngle(socket);
    
    return new Vector3(
      pos.x + Math.cos(angle) * distance,
      altitude,
      pos.z + Math.sin(angle) * distance
    );
  }
  
  public reach(socket: number, distance: number, altitude: number): Vector3 {
    return Treehouse.reachFromPos(this.centerPos, socket, distance, altitude);
  }
  
  public intersect(socket: number, otherHouse: Treehouse, otherSocket: number, altitude: number): Vector3 {
    let a0 = this.centerPos; // x1, y1
    let a1 = otherHouse.centerPos; // x3, y3
    let b0 = this.getSocketPos(socket); // x2, y2
    let b1 = otherHouse.getSocketPos(otherSocket); // x4, y4
    
    let det = (a0.x - b0.x) * (a1.z - b1.z) - (a0.z - b0.z) * (a1.x - b1.x);
    
    // Parallel.
    if (det === 0) {
      return undefined;
    }
    
    let u = -((a0.x - b0.x) * (a0.z - a1.z) - (a0.z - b0.z) * (a0.x - a1.x)) / det;
    
    return new Vector3(
      a1.x + u * (b1.x - a1.x),
      altitude,
      a1.z + u * (b1.z - a1.z)
    );
  }
}
