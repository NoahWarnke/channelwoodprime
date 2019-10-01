
export class Bridge {
  
  public shapes = {
    withoutPipe: new GLTFShape('models/bridges/bridgeNoPipeOrRailings.glb'),
    withPipe: new GLTFShape('models/bridges/bridge_no_railings.glb'),
    posts: new GLTFShape('models/bridges/bridgeEndModule.glb'),
    gate: new GLTFShape('models/bridges/gate.glb')
  };
  
  public module0: Entity;
  public module1: Entity;
  
  constructor(startPoint: Vector3, endPoint: Vector3, module0: string, module1: string, type: string) {
    
    let model = this.shapes[type];
    
    let offset = endPoint.subtract(startPoint);
    let length = offset.length();
    
    let numSegments = Math.round(length / 10);
    if (numSegments === 0) {
      log("Bridge too small!");
    }
    
    let segmentLength = length / numSegments;
    let segmentOffset = offset.clone().normalize().scale(segmentLength);
    
    // Bridge segments.
    
    let pos = new Vector3(startPoint.x, startPoint.y, startPoint.z);
    pos = pos.add(segmentOffset.scale(0.5));
    for (var i = 0; i < numSegments; i++) {
      let segment = new Entity();
      let segTransf = new Transform();
      segTransf.translate(pos);
      segTransf.lookAt(endPoint);
      segTransf.scale.set(1, 1, segmentLength / 10)
      pos = pos.add(segmentOffset);
      segment.addComponent(segTransf);
      segment.addComponent(model);
      engine.addEntity(segment);
    }
    
    // End modules.
    this.module0 = new Entity();
    this.module0.addComponent(this.shapes[module0]);
    this.module0.addComponent(new Transform({
      position: startPoint,
      rotation: Quaternion.Euler(0, Math.atan2(offset.x, offset.z) * 180 / Math.PI, 0)
    }));
    engine.addEntity(this.module0);
    
    this.module1 = new Entity();
    this.module1.addComponent(this.shapes[module1]);
    this.module1.addComponent(new Transform({
      position: endPoint,
      rotation: Quaternion.Euler(0, Math.atan2(offset.x, offset.z) * 180 / Math.PI, 0)
    }));
    engine.addEntity(this.module1);
    
    // Catenary ropes
    let catenary = new Entity();
    catenary.addComponent(new GLTFShape('models/bridges/catenaryRopes.glb'));
    let catTransf = new Transform({
      position: startPoint.add(offset.clone().scale(0.5)).add(new Vector3(0, 1.465, 0)),
      scale: new Vector3(1, 1, length / 10)
    });
    catTransf.lookAt(endPoint.clone().add(new Vector3(0, 1.465, 0)));
    catenary.addComponent(catTransf);
    engine.addEntity(catenary);
  }
}
