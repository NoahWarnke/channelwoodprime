import {Valve} from 'valve';

export class RealValve {
  
  public valve: Valve;
  public entity: Entity;
  public leftTurn: AnimationState;
  public rightTurn: AnimationState;
  
  constructor(entity: Entity, valve: Valve) {
    
    this.valve = valve;
    
    this.entity = entity;
    this.entity.addComponent(new OnClick(this.click.bind(this)));
    
    let animator = new Animator();
    this.entity.addComponent(animator);
    
    this.leftTurn = new AnimationState("rightTurn");
    this.leftTurn.looping = false;
    animator.addClip(this.leftTurn);
    
    
    this.rightTurn = new AnimationState("leftTurn");
    this.rightTurn.looping = false;
    animator.addClip(this.rightTurn);
    
    engine.addEntity(this.entity);
    
    // Default to left, so play right if needed.
    if (this.valve.state === 'right') {
      this.rightTurn.play();
    }
  }
  
  public click(): void {
    if (this.valve.state === 'left') {
      log('=======> turning to the right!');
      this.valve.setState('right');
      this.leftTurn.stop();
      this.rightTurn.reset();
      this.rightTurn.play();
    }
    else {
      log('=======> turning to the left!');
      this.valve.setState('left');
      this.rightTurn.stop();
      this.leftTurn.reset();
      this.leftTurn.play();
    }
  }
}
