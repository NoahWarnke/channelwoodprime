import utils from "../../node_modules/decentraland-ecs-utils/index"

export class Windmill {
  constructor(transform: Transform, rotateSpeed: number) {

    let windmillBase = new Entity();
    windmillBase.addComponent(new GLTFShape('models/windmillBase.glb'));
    windmillBase.addComponent(transform);
    engine.addEntity(windmillBase);

    let windmillBlades = new Entity();
    windmillBlades.addComponent(new GLTFShape('models/windmillBlades.glb'));
    windmillBlades.setParent(windmillBase);
    windmillBlades.addComponent(new Transform({
      position: new Vector3(0, 16.75, 0)
    }))

    windmillBlades.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 0, rotateSpeed)))
  }
}