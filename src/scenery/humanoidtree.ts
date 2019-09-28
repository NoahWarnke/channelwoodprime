
export class HumanoidTree {
  
  static trunks: GLTFShape[] = [
    new GLTFShape('models/trees/humanoidtree_1.gltf'),
    new GLTFShape('models/trees/humanoidtree_2.gltf'),
    new GLTFShape('models/trees/humanoidtree_3.gltf'),
    new GLTFShape('models/trees/humanoidtree_4.gltf'),
    new GLTFShape('models/trees/humanoidtree_5.gltf'),
    new GLTFShape('models/trees/humanoidtree_6.gltf'),
    new GLTFShape('models/trees/humanoidtree_7.gltf'),
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
