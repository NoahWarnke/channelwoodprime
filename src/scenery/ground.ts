
export class Ground {
  constructor() {
    let heightmap = new Entity();
    heightmap.addComponent(new GLTFShape('models/ground/terrain.glb'));
    heightmap.addComponent(new Transform({
      position: new Vector3(40, 0, 24),
      rotation: Quaternion.Euler(0, -90, 0)
    }));
    engine.addEntity(heightmap);
    
    let credits = new Entity();
    credits.addComponent(new GLTFShape('models/ground/memorialStone.glb'));
    credits.addComponent(new Transform({
      position: new Vector3(6.7, 0.55, 14.5),
      scale: new Vector3(0.4, 0.4, 0.4),
      rotation: Quaternion.Euler(-10, -80, 0)
    }));
    engine.addEntity(credits);
  }
}
