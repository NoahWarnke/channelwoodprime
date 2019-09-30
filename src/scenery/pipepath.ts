
export class PipePath {
  
  public static shapes: {[index: string]: GLTFShape} = {
    pipe: new GLTFShape('models/pipes/pipeSection.glb'),
    end: new GLTFShape('models/pipes/pipeEnd.glb'),
  };
  
  
  constructor(path: Vector3[], startSphere: boolean, endSphere: boolean) {
    
    for (var i = 0; i < path.length - 1; i++) {
      if (i !== 0 || startSphere) {
        let sphere = new Entity();
        sphere.addComponent(PipePath.shapes.end);
        sphere.addComponent(new Transform({
          position: path[i]
        }));
        engine.addEntity(sphere);
      }
      let pipe = new Entity();
      let length = path[i + 1].clone().subtract(path[i]).length();
      let pipeTransf = new Transform({
        position: path[i].clone().add(path[i + 1]).scale(0.5),
        scale: new Vector3(1, 1, length)
      });
      pipeTransf.lookAt(path[i + 1]);
      pipe.addComponent(PipePath.shapes.pipe);
      pipe.addComponent(pipeTransf);
      engine.addEntity(pipe);
    }
    
    if (endSphere) {
      let sphere = new Entity();
      sphere.addComponent(PipePath.shapes.end);
      sphere.addComponent(new Transform({
        position: path[path.length - 1]
      }));
      engine.addEntity(sphere);
    }
  }
}
