
export class Ground {
  constructor() {
    let heightmap = new Entity();
    heightmap.addComponent(new GLTFShape('models/ground/terrain.glb'));
    heightmap.addComponent(new Transform({
      position: new Vector3(40, 0, 24),
      rotation: Quaternion.Euler(0, -90, 0)
    }));
    engine.addEntity(heightmap);
  }
}
