import {Node} from '../node';
import {Edge} from '../edge';

export class ValveBinarySwitch extends Node {
  
  constructor(transform: Transform, initialState: string) {
    
    
    super({
      transform: transform
    });
    
    
  }
  
  /**
   * Set the modifier state of this Node from the given newState.
   * */
  public setModifierState(newState: string): void {
    log("Setting modifier state to: " + newState);
    this.modifierState = newState;
    
    // Animate the switch moving.
  }
  
  /**
   * What to do when this Node is clicked.
   */
  public whenClicked(): void {
    if (this.modifierState === "left") {
      this.setModifierState("right");
    }
    else {
      this.setModifierState("left");
    }
    
    this.updateOutgoingState();
  }
  
  /**
   * Update the outgoing states of the connected Edges for the current modifier and incoming states.
   */
  public updateOutgoingState(): void {
    
  }
  
  /**
   * What to do when the incoming state changes.
   */
  public whenIncomingChanges(): void {
    
  }
}
