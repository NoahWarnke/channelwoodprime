import {Node} from '../node';


export class ValveTerminator extends Node {
  
  public terminatorMat: Material;
  
  constructor(transform: Transform, initialModifierState: string) {
    
    let terminatorBox = new Entity();
    terminatorBox.addComponent(new BoxShape());
    let terminatorMat = new Material();
    terminatorMat.albedoColor = Color3.Red();
    terminatorMat.roughness = 1;
    terminatorBox.addComponent(terminatorMat);
    
    terminatorBox.addComponent(new OnClick(() => {
      this.whenClicked();
    }));
    
    super({
      transform: transform,
      entities: [terminatorBox],
      initialModifierState: initialModifierState
    });
    
    this.terminatorMat = terminatorMat;
    this.setModifierState(initialModifierState);
  }
  
  /**
   * Set the modifier state of this Node from the given newState.
   * */
  public setModifierState(newState: string): void {
    // This is a terminator: do nithing.
  }
  
  /**
   * What to do when this Node is clicked.
   */
  public whenClicked(): void {
    // This is a terminator: do nothing.
  }
  
  /**
   * Update the outgoing states of the connected Edges for the current modifier and incoming states.
   */
  public updateOutgoingState(): void {
    // This is a terminator: do nothing.
  }
  
  /**
   * What to do when the incoming state changes.
   */
  public whenIncomingChanges(): void {
    this.incomingState = this.incoming[0].state; // Simply grab state of first incoming edge (for now).
    log('term setting state to: ' + this.incoming[0].state);
    
    this.terminatorMat.albedoColor = this.incomingState === "100" ? Color3.Green() : Color3.Red();
  }
}
