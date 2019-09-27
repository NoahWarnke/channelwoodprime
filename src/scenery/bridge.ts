
export class Bridge {
  
  constructor(startPoint: Vector3, endPoint: Vector3, pipeStatus: number) {
    
    let model = new GLTFShape('models/bridges/bridge_no_railings.glb');
    
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
    let endModuleShape = new GLTFShape('models/bridges/bridgeEndModule.glb');
    let endModule0 = new Entity();
    endModule0.addComponent(endModuleShape);
    endModule0.addComponent(new Transform({
      position: startPoint,
      rotation: Quaternion.Euler(0, Math.atan2(offset.x, offset.z) * 180 / Math.PI, 0)
    }));
    engine.addEntity(endModule0);
    
    let endModule1 = new Entity();
    endModule1.addComponent(endModuleShape);
    endModule1.addComponent(new Transform({
      position: endPoint,
      rotation: Quaternion.Euler(0, Math.atan2(offset.x, offset.z) * 180 / Math.PI, 0)
    }));
    engine.addEntity(endModule1);
    
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
