import {PipePath} from 'pipepath';

export class Windmill {
  
  public valve: Entity;
  
  constructor() {

    let windmill = new Entity();
    windmill.addComponent(new GLTFShape('models/ground/windmill.glb'));
    windmill.addComponent(new Transform({
      position: new Vector3(11, 4, 12),
      rotation: Quaternion.Euler(0, 215, 0),
      scale: new Vector3(0.7, 0.7, 0.7)
    }));

    let animator = new Animator();
    windmill.addComponent(animator);

    const bladeRotateClip = new AnimationState("bladeRotate");
    bladeRotateClip.speed = 0.2;
    bladeRotateClip.play();
    bladeRotateClip.looping = true;

    animator.addClip(bladeRotateClip);
    engine.addEntity(windmill);
    
    // Create a pipe going up from the water, into the pump, and then down to the first bridge.
    let pipeFromWater = new PipePath(
      [
        new Vector3(12.687, 0.05, 7.580),
        new Vector3(12.55, 0.886, 8.268),
        new Vector3(12.45, 1.932, 8.6),
        new Vector3(12, 3.6, 9.6),
        new Vector3(11.462, 4.06, 10.52),
        new Vector3(11, 4.5, 12)
      ],
      false,
      false
    )
    
    let pipeToBridge = new PipePath(
      [
        new Vector3(11, 4.5, 12),
        new Vector3(11.580, 4.1, 12.894),
        new Vector3(11.926, 2.719, 14.318),
        new Vector3(12.561, 1.330, 16.259),
        new Vector3(13.124, 1.42, 17.578)
      ],
      false,
      false
    )
    
    this.valve = new Entity();
    this.valve.addComponent(new GLTFShape('models/pipes/valveOnly.glb'));
    this.valve.addComponent(new Transform({
      position: new Vector3(12.8, 1.38, 16.85),
      rotation: Quaternion.Euler(0, -70, 0)
    }));
    engine.addEntity(this.valve);

  }
}
