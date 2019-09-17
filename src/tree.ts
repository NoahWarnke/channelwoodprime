
export class Tree {
  constructor(transform: Transform) {
    
    
    let tree = new Entity();
    tree.addComponent(transform);
    
    let trunk = new Entity();
    trunk.addComponent(new Transform({
      scale: new Vector3(0.5, 1, 0.5)
    }))
    let trunkShape = new CylinderShape();
    trunkShape.radiusTop = 0.5;
    trunk.addComponent(trunkShape);
    let trunkColor = new Material();
    trunkColor.albedoColor = new Color3(0.4, 0.3, 0);
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
    branches.addComponent(branchesColor);
    branches.setParent(tree);
    
    engine.addEntity(tree);
  }
}
