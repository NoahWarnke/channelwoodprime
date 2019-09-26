
export class Tree {
  constructor(transform: Transform, treehousePositions: Vector3[]) {
    
    let treeCenter = transform.position.clone();
    treeCenter.y -= 36;
    
    let tree = new Entity();
    tree.addComponent(transform);
    tree.addComponent(new GLTFShape('models/trees/CPtree_v1-alpha.glb'));
    
    for (var i = 0; i < treehousePositions.length; i++) {
      
      let offset = treehousePositions[i].subtract(treeCenter);
      
      let angle = Math.atan2(offset.z, offset.x);
      log(angle);
      
      let upper = new Entity();
      upper.addComponent(new GLTFShape('models/trees/upperarm1.glb'));
      upper.addComponent(new Transform({
        position: new Vector3(0, i * 5 - 30, 0),
        rotation: Quaternion.Euler(0, angle, 0)
      }));
      upper.setParent(tree);
      
      let fore = new Entity();
      fore.addComponent(new GLTFShape('models/trees/forearm1.glb'));
      fore.addComponent(new Transform({
        position: new Vector3(Math.cos(angle / 180 * Math.PI) * 10, i * 5 - 30, Math.sin(angle / 180 * Math.PI) * 10),
        rotation: Quaternion.Euler(0, angle, 0)
      }));
      fore.setParent(tree);
    }
    
    
    /*
    let trunk = new Entity();
    trunk.addComponent(new Transform({
      scale: new Vector3(0.5, 1, 0.5)
    }))
    let trunkShape = new CylinderShape();
    trunkShape.radiusTop = 0.5;
    trunk.addComponent(trunkShape);
    let trunkColor = new Material();
    trunkColor.albedoColor = new Color3(0.4, 0.3, 0);
    trunkColor.roughness = 1.0;
    trunk.addComponent(trunkColor);
    trunk.setParent(tree);
    
    let branches = new Entity();
    branches.addComponent(new CylinderShape());
    branches.addComponent(new Transform({
      position: new Vector3(0, 0.85, 0),
      scale: new Vector3(1, 0.15, 1)
    }));
    let branchesColor = new Material();
    branchesColor.albedoColor = new Color3(0, 0.4, 0.1);
    branchesColor.roughness = 1.0;
    branches.addComponent(branchesColor);
    branches.setParent(tree);
    */
    
    engine.addEntity(tree);
  }
}
