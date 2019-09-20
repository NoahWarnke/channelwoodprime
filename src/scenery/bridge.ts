
export class Bridge {
  
  constructor(startPoint: Vector3, endPoint: Vector3, pipeStatus: number) {
    
    let model = new GLTFShape('models/bridge.glb');
    
    let offset = endPoint.subtract(startPoint);
    let length = offset.length();
    
    let numSegments = Math.round(length / 10);
    if (numSegments === 0) {
      log("Bridge too small!");
    }
    
    let segmentLength = length / numSegments;
    let segmentOffset = offset.normalize().scale(segmentLength);
    
    let pos = new Vector3(startPoint.x, startPoint.y, startPoint.z);
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
  }
}
