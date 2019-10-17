
export class HumanoidTree {
  
  static trunks: GLTFShape[] = [
    new GLTFShape('models/trees/humanoidtree1_v2.glb'),
    new GLTFShape('models/trees/humanoidtree2_v2.glb'),
    new GLTFShape('models/trees/humanoidtree3_v2.glb'),
    new GLTFShape('models/trees/humanoidtree4_v2.glb'),
    new GLTFShape('models/trees/humanoidtree5_v2.glb'),
    new GLTFShape('models/trees/humanoidtree6_v2.glb'),
    new GLTFShape('models/trees/humanoidtree7_v2.glb'),
  ];
  
  static heights: number[] = [
    3.5, 3, 4.2, 4.2, 4, 3.4, 3.6
  ];
  
  static leaves: GLTFShape = new GLTFShape('models/trees/foliage1.glb');
  
  constructor(transform: Transform, model: number) {
    
    let trunk = new Entity();
    trunk.addComponent(transform);
    trunk.addComponent(HumanoidTree.trunks[model]);
    
    let leaves = new Entity();
    leaves.addComponent(HumanoidTree.leaves);
    leaves.addComponent(new Transform({
      position: new Vector3(0, HumanoidTree.heights[model], 0),
      scale: new Vector3(0.15, 0.4, 0.15)
    }));
    leaves.setParent(trunk);
    
    engine.addEntity(trunk);
  }
}
