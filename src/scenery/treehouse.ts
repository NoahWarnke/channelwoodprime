
export class Treehouse {
  
  public centerPos: Vector3;
  
  constructor(transform: Transform, railingLayout: number[]) {
    let root = new Entity();
    root.addComponent(transform);
    this.centerPos = transform.position;
    
    let house = new Entity();
    house.addComponent(new GLTFShape('models/treehouse.glb'));
    house.setParent(root);
    
    // Load the pipes
    let pipeModels = [
      new GLTFShape('models/pipe_edge_straight.glb'),
      new GLTFShape('models/pipe_edge_gap.glb'),
      new GLTFShape('models/pipe_edge_short_l.glb'),
      new GLTFShape('models/pipe_edge_short_r.glb'),
      new GLTFShape('models/pipe_edge_w_valve_a.glb'),
    ]
    for (let i = 0; i < 6; i++) {
      let pipe = new Entity();
      pipe.addComponent(pipeModels[railingLayout[i]]);
      pipe.addComponent(new Transform({
        rotation: Quaternion.Euler(0, -i * 60 + 180, 0)
      }));
      pipe.setParent(root);
    }
    
    engine.addEntity(root);
  }
  
  public getSocketPos(num: number) {
    num = (Math.max(0, Math.min(num, 5)) / 3 - 0.5) * Math.PI;
    return this.centerPos.add(new Vector3(Math.cos(num), 0, Math.sin(num)).scale(3.464));
  }
}
