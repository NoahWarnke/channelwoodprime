import {PipeNode} from 'pipenode';
import {Graph} from 'graph';

export class Gate {
  
  pipe: PipeNode;
  
  public entity: Entity;
  
  public up: boolean;
  
  public openClip: AnimationState;
  public closeClip: AnimationState;
  
  constructor(entity: Entity, pipe: PipeNode, graph: Graph) {
    
    // The pipe this gate is powered by.
    this.pipe = pipe;
    
    // Make sure we know when there are updates!
    graph.subscribe(this.updatePowered.bind(this));
    
    this.up = false;
    
    this.entity = entity;
    
    this.entity.addComponent(new OnClick(this.click.bind(this)));
    
    //
    let animator = new Animator();
    this.entity.addComponent(animator);

    this.openClip = new AnimationState("openGate");
    this.openClip.looping = false;
    animator.addClip(this.openClip);
    
    this.closeClip = new AnimationState("closeGate");
    this.closeClip.looping = false;
    animator.addClip(this.closeClip);
    
    engine.addEntity(this.entity);
  }
  
  // Check if the connected edge has power or not, and go down if no power.
  public updatePowered() {
    log('gate updatePowered...');
    if (!this.pipe.pressure && this.up) {
      log('lost pressure.');
      this.makeGoDown();
    }
    log(this.pipe.pressure);
  }
  
  public makeGoUp() {
    this.up = true;
    this.closeClip.stop();
    this.openClip.reset();
    this.openClip.play();
  }
  
  public makeGoDown() {
    this.up = false;
    this.openClip.stop();
    this.closeClip.reset();
    this.closeClip.play();
  }
  
  public click() {
    
    // If gate is not powered, clicking does nothing.
    if (!this.pipe.pressure) {
      return;
    }
    if (this.up) {
      this.makeGoDown();
    }
    else {
      this.makeGoUp();
    }
  }
}
