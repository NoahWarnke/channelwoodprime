
export class Tree {
  
  static shapes: {[index: string]: GLTFShape} = {
    trunk2: new GLTFShape('models/trees/trunk2_v2.glb'),
    trunk3: new GLTFShape('models/trees/trunk3_v2.glb'),
    trunk4: new GLTFShape('models/trees/trunk4_v2.glb'),
    trunk5: new GLTFShape('models/trees/trunk5_v2.glb'),
    forearm: new GLTFShape('models/trees/forearm_v2.glb'),
    upperarm: new GLTFShape('models/trees/upperarm_v2.glb')
  }
  
  constructor(trunkName: string, transform: Transform, treehousePositions: {centerPos: Vector3, treehousePos: Vector3}[]) {
    
    let treeCenter = transform.position.clone();
    treeCenter.y -= 36;
    
    let tree = new Entity();
    tree.addComponent(transform);
    tree.addComponent(Tree.shapes[trunkName]);
    
    for (var i = 0; i < treehousePositions.length; i++) {
      this.addBranch(treehousePositions[i].centerPos, treehousePositions[i].treehousePos);
    }
    
    engine.addEntity(tree);
  }
  
  public addBranch(start: Vector3, end: Vector3) {
    
    // Distance.
    let offset = end.clone().subtract(start);
    let dist = offset.length();
    
    if (dist > 17) {
      log ('Invalid tree arm! ' + dist);
      return;
    }
    
    // xz angle:
    let xza = Math.atan2(offset.z, offset.x);
    
    // xy angle
    let xya = Math.atan2(offset.y, Math.sqrt(offset.x * offset.x + offset.z * offset.z));
    
    
    log ("xza: " +  xza * 180 / Math.PI);
    log ("xya: " + xya * 180 / Math.PI);
    
    // Angle
    let a = Math.acos(dist / 17) // two arm pieces, each 8.5m long, are the hypotenuse of two triangles
    log ("a: " + a * 180 / Math.PI);
    
    // Pivot point around which elbow point rotates
    let elbowPt = new Vector3(Math.cos(xza) * Math.cos(xya - a), Math.sin(xya - a), Math.sin(xza) * Math.cos(xya - a));
    elbowPt.scaleInPlace(8.5);
    elbowPt.addInPlace(start);
    
    log (elbowPt);
    
    // Transforms:
    let upperTransf = new Transform({position: start});
    upperTransf.lookAt(elbowPt);
    //upperTransf.rotation.conjugateInPlace();
    
    let lowerTransf = new Transform({position: elbowPt});
    lowerTransf.lookAt(end);
    //lowerTransf.rotation.conjugateInPlace();
    
    // entities
    let upper = new Entity();
    upper.addComponent(Tree.shapes.upperarm);
    upper.addComponent(upperTransf);
    engine.addEntity(upper);
    
    let fore = new Entity();
    fore.addComponent(Tree.shapes.forearm);
    fore.addComponent(lowerTransf);
    engine.addEntity(fore);
  }
}
