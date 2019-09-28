
export class Tree {
  
  static shapes: {[index: string]: GLTFShape} = {
    trunk2: new GLTFShape('models/trees/trunk2_v2.glb'),
    trunk3: new GLTFShape('models/trees/trunk3_v2.glb'),
    trunk4: new GLTFShape('models/trees/trunk4_v2.glb'),
    trunk5: new GLTFShape('models/trees/trunk5_v2.glb'),
    forearm: new GLTFShape('models/trees/forearm_v2.glb'),
    upperarm: new GLTFShape('models/trees/upperarm_v2.glb')
  }
  
  constructor(trunkName: string, transform: Transform, treehousePositions: Vector3[]) {
    log (trunkName);
    let treeCenter = transform.position.clone();
    treeCenter.y -= 36;
    
    let tree = new Entity();
    tree.addComponent(transform);
    tree.addComponent(Tree.shapes[trunkName]);
    
    for (var i = 0; i < treehousePositions.length; i++) {
      
      let offset = treehousePositions[i].subtract(treeCenter);
      
      let angle = Math.atan2(offset.z, offset.x);
      log(angle);
      
      let upper = new Entity();
      upper.addComponent(Tree.shapes.upperarm);
      upper.addComponent(new Transform({
        position: new Vector3(0, i * 5 - 30, 0),
        rotation: Quaternion.Euler(0, angle, 0)
      }));
      upper.setParent(tree);
      
      let fore = new Entity();
      fore.addComponent(Tree.shapes.forearm);
      fore.addComponent(new Transform({
        position: new Vector3(Math.cos(angle / 180 * Math.PI) * 10, i * 5 - 30, Math.sin(angle / 180 * Math.PI) * 10),
        rotation: Quaternion.Euler(0, angle, 0)
      }));
      fore.setParent(tree);
    }
    engine.addEntity(tree);
  }
}
