export class Windmill {
  constructor(transform: Transform) {

    let windmill = new Entity();
    windmill.addComponent(new GLTFShape('models/ground/windmill.glb'));
    windmill.addComponent(transform);

    let animator = new Animator();
    windmill.addComponent(animator);

    const bladeRotateClip = new AnimationState("bladeRotate");
    bladeRotateClip.speed = 0.2;
    bladeRotateClip.play();
    bladeRotateClip.looping = true;

    animator.addClip(bladeRotateClip);
    engine.addEntity(windmill);
    
    // Create a pipe going up from the water, into the pump, and then down to the first bridge.
  }
}
