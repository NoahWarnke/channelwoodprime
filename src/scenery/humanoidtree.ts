
export class HumanoidTree {
  
  static trunks: GLTFShape[] = [
    new GLTFShape('models/trees/humanoidtree1_v2.glb'),
    new GLTFShape('models/trees/humanoidtree2_v2.glb'),
    new GLTFShape('models/trees/humanoidtree3_v2.glb'),
    new GLTFShape('models/trees/humanoidtree4_v2.glb'),
    new GLTFShape('models/trees/humanoidtree5_v2.glb'),
    new GLTFShape('models/trees/humanoidtree6_v2.glb'),
    new GLTFShape('models/trees/humanoidtree7_v2.glb'),
  ]
  
  static leaves: GLTFShape = new GLTFShape('models/tree/foliage1.glb');
  
  constructor(transform: Transform, model: number) {
    
    let trunk = new Entity;
    trunk.addComponent(transform);
    trunk.addComponent(HumanoidTree.trunks[model]);
    
    /*
    let leaves = new Entity;
    leaves.addComponent(HumanoidTree.leaves);
    leaves.addComponent(new Transform({
      position: new Vector3(0, 10, 0)
    }));
    leaves.setParent(trunk);
    */
    
    engine.addEntity(trunk);
  }
}
