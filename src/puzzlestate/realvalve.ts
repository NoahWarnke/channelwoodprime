import {Valve} from 'valve';

export class RealValve {
  
  public valve: Valve;
  public entity: Entity;
  public leftTurn: AnimationState;
  public rightTurn: AnimationState;
  
  public audioSource: AudioSource;
  
  constructor(entity: Entity, valve: Valve) {
    
    this.valve = valve;
    
    this.entity = entity;
    this.entity.addComponent(new OnClick(() => {
      this.click();
    }));
    
    let animator = new Animator();
    this.entity.addComponent(animator);
    
    this.leftTurn = new AnimationState("rightTurn");
    this.leftTurn.looping = false;
    animator.addClip(this.leftTurn);
    
    
    this.rightTurn = new AnimationState("leftTurn");
    this.rightTurn.looping = false;
    animator.addClip(this.rightTurn);
    
    // Default to left, so play right if needed.
    if (this.valve.state === 'right') {
      this.rightTurn.play();
    }
    
    // Sounds
    this.audioSource = new AudioSource(new AudioClip('sounds/handle-squeak.mp3'));
    this.entity.addComponent(this.audioSource);
    this.audioSource.volume = 4;
    this.audioSource.loop = false;
    this.audioSource.playing = false;
  }
  
  public click(): void {
    if (this.valve.state === 'left') {
      log('=======> turning to the right!');
      this.valve.setState('right');
      this.leftTurn.stop();
      this.rightTurn.reset();
      this.rightTurn.play();
      this.audioSource.playOnce();
    }
    else {
      log('=======> turning to the left!');
      this.valve.setState('left');
      this.rightTurn.stop();
      this.leftTurn.reset();
      this.leftTurn.play();
      this.audioSource.playOnce();
    }
  }
}
