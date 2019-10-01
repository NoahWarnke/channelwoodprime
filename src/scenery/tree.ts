
export class Tree {
  
  static shapes: {[index: string]: GLTFShape} = {
    trunk2: new GLTFShape('models/trees/trunk2_v2.glb'),
    trunk3: new GLTFShape('models/trees/trunk3_v2.glb'),
    trunk4: new GLTFShape('models/trees/trunk4_v2.glb'),
    trunk5: new GLTFShape('models/trees/trunk5_v2.glb'),
    forearm: new GLTFShape('models/trees/forearm_v3.glb'),
    upperarm: new GLTFShape('models/trees/upperarm_v3.glb'),
    fol1: new GLTFShape('models/trees/foliage1.glb'),
    fol2: new GLTFShape('models/trees/foliage2.glb'),
    fol3: new GLTFShape('models/trees/foliage3.glb'),
    fol4: new GLTFShape('models/trees/foliage4.glb'),
    fol5: new GLTFShape('models/trees/foliage5.glb'),
    fol6: new GLTFShape('models/trees/foliage6.glb'),
    fol7: new GLTFShape('models/trees/foliage7.glb'),
    fol8: new GLTFShape('models/trees/foliage8.glb'),
    fol9: new GLTFShape('models/trees/foliage9.glb'),
    fol10: new GLTFShape('models/trees/foliage10.glb'),
    fol11: new GLTFShape('models/trees/foliage11.glb')
  }
  
  constructor(
    trunkName: string,
    transform: Transform,
    treehousePositions: {centerPos: Vector3, treehousePos: Vector3, scale: number}[],
    foliagePositions: {folType: string, centerPos: Vector3, folPos: Vector3, scale: number, folScale: number}[]
  ) {
    
    let treeCenter = transform.position.clone();
    treeCenter.y -= 36;
    
    let tree = new Entity();
    tree.addComponent(transform);
    tree.addComponent(Tree.shapes[trunkName]);
    
    for (var i = 0; i < treehousePositions.length; i++) {
      this.addBranch(treehousePositions[i].centerPos, treehousePositions[i].treehousePos, treehousePositions[i].scale);
    }
    
    for (var i = 0; i < foliagePositions.length; i++) {
      this.addBranch(foliagePositions[i].centerPos, foliagePositions[i].folPos.subtract(new Vector3(0, 0, 0)), foliagePositions[i].scale);
      this.addFoliage(foliagePositions[i].folPos, foliagePositions[i].folType, foliagePositions[i].folScale);
    }
    
    engine.addEntity(tree);
  }
  
  public addBranch(start: Vector3, end: Vector3, scale: number) {
    
    end = end.clone()
    end.y -= 1; //Adjustment from treehouse center to wrist center pt.
    
    // Distance.
    let offset = end.clone().subtract(start);
    let dist = offset.length();
    
    if (dist > 18) {
      log ('Invalid tree arm! ' + dist);
      log(start);
      log(end);
      log('/');
      return;
    }
    
    // xz angle:
    let xza = Math.atan2(offset.z, offset.x);
    
    // xy angle
    let xya = Math.atan2(offset.y, Math.sqrt(offset.x * offset.x + offset.z * offset.z));
    
    // Angle
    let a = Math.acos(dist / 18) // two arm pieces, each 8.5m long, are the hypotenuse of two triangles
    
    // Pivot point around which elbow point rotates
    let elbowPt = new Vector3(Math.cos(xza) * Math.cos(xya - a), Math.sin(xya - a), Math.sin(xza) * Math.cos(xya - a));
    elbowPt.scaleInPlace(9);
    elbowPt.addInPlace(start);
    
    // Transforms:
    let upperTransf = new Transform({position: start});
    upperTransf.lookAt(new Vector3(start.x * 2 - elbowPt.x, start.y * 2 - elbowPt.y, start.z * 2 - elbowPt.z)); // would be just elbowPt but the branch is backwards.
    upperTransf.scale.set(scale, scale, 1);
    
    let lowerTransf = new Transform({position: end.clone().subtract(elbowPt).normalize().scale(0.5).add(elbowPt)});
    lowerTransf.lookAt(new Vector3(elbowPt.x * 2 - end.x, elbowPt.y * 2 - end.y, elbowPt.z * 2 - end.z)); // would be just end but the branch is backwards.
    lowerTransf.scale.set(scale, scale, 0.93);
    
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
  
  public addFoliage(pos: Vector3, shape: string, scale: number) {
    let foliage = new Entity();
    foliage.addComponent(Tree.shapes[shape])
    foliage.addComponent(new Transform({
      position: pos,
      scale: new Vector3(-scale, scale, scale)
    }));
    engine.addEntity(foliage);
  }
}
