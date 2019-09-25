export class Windmill {
  constructor(transform: Transform) {

    let windmill = new Entity();
    windmill.addComponent(new GLTFShape('models/windmill.glb'));
    windmill.addComponent(transform);

    let animator = new Animator();
    windmill.addComponent(animator);

    const bladeRotateClip = new AnimationState("bladeRotate");
    bladeRotateClip.play();
    bladeRotateClip.looping = true;

    animator.addClip(bladeRotateClip);
    engine.addEntity(windmill);

    
  }
}