import {Node} from '../node';


export class Pump extends Node {
  
  public pumpMat: Material;
  
  constructor(transform: Transform, initialModifierState: string) {
    
    let pumpBox = new Entity();
    pumpBox.addComponent(new BoxShape());
    let pumpMat = new Material();
    pumpMat.albedoColor = Color3.Black();
    pumpMat.roughness = 0.1;
    pumpBox.addComponent(pumpMat);
    
    pumpBox.addComponent(new OnClick(() => {
      this.whenClicked();
    }));
    
    super({
      transform: transform,
      entities: [pumpBox],
      initialModifierState: initialModifierState
    });
    
    this.pumpMat = pumpMat;
    this.setModifierState(initialModifierState);
  }
  
  /**
   * Set the modifier state of this Node from the given newState.
   * */
  public setModifierState(newState: string): void {
    log("Setting modifier state to: " + newState);
    this.modifierState = newState;
    
    // Animate the pump setting changing.
    this.pumpMat.albedoColor = newState === "on" ? Color3.Blue() : Color3.Black();
  }
  
  /**
   * What to do when this Node is clicked.
   */
  public whenClicked(): void {
    if (this.modifierState === "on") {
      this.setModifierState("off");
    }
    else {
      this.setModifierState("on");
    }
    
    this.updateOutgoingState();
  }
  
  /**
   * Update the outgoing states of the connected Edges for the current modifier and incoming states.
   */
  public updateOutgoingState(): void {
    
    // Update outgoing Edges such that if the pump is on, their state is 100, otherwise it's 0.
    for (let edge of this.outgoing) {
      edge.whenIncomingChanges(this.modifierState === "on" ? "100" : "0");
      edge.to.whenIncomingChanges();
    }
  }
  
  /**
   * What to do when the incoming state changes.
   */
  public whenIncomingChanges(): void {
    // Do nothing; this is a source.
  }
}
