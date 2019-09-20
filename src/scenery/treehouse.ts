
export class Treehouse {
  
  constructor(transform: Transform, railingLayout: number[]) {
    let root = new Entity();
    root.addComponent(transform);
    
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
        rotation: Quaternion.Euler(0, i * 60, 0)
      }));
      pipe.setParent(root);
    }
    
    engine.addEntity(root);
  }
}
