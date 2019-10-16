import {PipeNode} from 'pipenode';
import {Graph} from 'graph';

export class Gate {
  
  pipe: PipeNode;
  
  public entity: Entity;
  
  public up: boolean;
  
  public openClip: AnimationState;
  public closeClip: AnimationState;
  
  public audioSource: AudioSource;
  public rattleAudioSource: AudioSource;
  
  constructor(entity: Entity, pipe: PipeNode, graph: Graph) {
    
    // The pipe this gate is powered by.
    this.pipe = pipe;
    
    // Make sure we know when there are updates!
    graph.subscribe(this.updatePowered.bind(this));
    
    this.up = false;
    
    this.entity = entity;
    
    this.entity.addComponent(new OnClick(() => {
      log('clicked gate');
      let pos = this.entity.getComponent(Transform).position;
      let camPos = Camera.instance.position;
      let dist = camPos.subtract(pos).length();
      log (dist);
      if (dist > 4) {
        return;
      }
      this.click();
    }));
    
    // Animations
    let animator = new Animator();
    this.entity.addComponent(animator);

    this.openClip = new AnimationState("openGate");
    this.openClip.looping = false;
    animator.addClip(this.openClip);
    
    this.closeClip = new AnimationState("closeGate");
    this.closeClip.looping = false;
    this.closeClip.speed = 0.5
    animator.addClip(this.closeClip);
    
    // Sounds
    this.audioSource = new AudioSource(new AudioClip('sounds/gateOpening.mp3'));
    this.entity.addComponent(this.audioSource);
    this.audioSource.volume = 4;
    this.audioSource.loop = false;
    this.audioSource.playing = false;
    
    let rattleEntity = new Entity();
    this.rattleAudioSource = new  AudioSource(new AudioClip('sounds/doorRattle.mp3'));
    this.rattleAudioSource.volume = 4;
    this.rattleAudioSource.loop = false;
    this.rattleAudioSource.playing = false;
    rattleEntity.addComponent(this.rattleAudioSource);
    rattleEntity.setParent(this.entity);

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
    this.playSound();
  }
  
  public makeGoDown() {
    this.up = false;
    this.openClip.stop();
    this.closeClip.reset();
    this.closeClip.play();
    this.playSound();
  }
  
  public playSound() {
    this.audioSource.playOnce();
  }
  
  public playRattleSound() {
    this.rattleAudioSource.playOnce();
  }
  
  public click() {
    log ('gate clicked!');
    log (this.pipe.pressure);
    // If gate is not powered, clicking does nothing except rattle.
    if (!this.pipe.pressure) {
      this.playRattleSound();
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
