import {Edge} from 'edge';

/**
 * Represents a Node in the energy graph, which is to say, a point where the user can interact with it.
 * Nodes have:
 * a root Transform,
 * A set of Entities (Shapes with accompanying local transforms) that display the Node
 * a set of incoming Edges,
 * a set of outgoing Edges,
 * an internal State (e.g. switch position) = string,
 * a setter function for the internal State which also updates the Node's appearance (e.g. starts/stops animations on the Shapes, or adjusts their Transforms)
 * a function that mixes the state of the incoming Edges to get the Node's overall incoming state,
 * a function that sets the state of the outgoing Edges according to the Node's internal state and its overall incoming state,
 * a function that is called when the user clicks the Node, and is responsible for updating the Node's internal State and outgoing States
 */
export abstract class Node {
  
  // The root Entity and Transform for the Node, and the set of Entities that make up its appearance.
  public rootEntity: Entity;
  public transform: Transform;
  public entities: Entity[];
  
  // The sets of incoming and outgoing Edges.
  public incoming: Edge[];
  public outgoing: Edge[];
  
  // The internal energy state of the Node.
  public incomingState: string;
  public modifierState: string;
  
  /**
   * Construct a new Node from a specification object.
   */
  constructor(nodeSpec: any) {
    this.rootEntity = new Entity();
    
    // Get the Transform.
    if (nodeSpec.transform) {
      this.transform = nodeSpec.transform;
    }
    else {
      this.transform = new Transform();
    }
    this.rootEntity.addComponent(this.transform);
    
    // Get the Entities and add them to our rootEntity.
    if (nodeSpec.entities) {
      this.entities = nodeSpec.entities;
    }
    else {
      let entity = new Entity();
      entity.addComponent(new BoxShape());
      this.entities = [
        entity
      ];
    }
    for (let entity of this.entities) {
      entity.setParent(this.rootEntity);
    }
    
    // Get the incoming Edges
    if (nodeSpec.incoming) {
      this.incoming = nodeSpec.incoming;
    }
    else {
      this.incoming = [];
    }
    
    // Get the outgoing Edges
    if (nodeSpec.outgoing) {
      this.outgoing = nodeSpec.outgoing;
    }
    else {
      this.outgoing = [];
    }
    
    // Get the initial modifier state
    if (nodeSpec.initialModifierState) {
      this.modifierState = nodeSpec.initialModifierState;
    }
    else {
      this.modifierState = "uninitialized";
    }
    
    // Set a default incoming state. Will be updated with first call to whenIncomingChanges.
    this.incomingState = "uninitialized";
    
    // Add our root Entity to the engine!
    engine.addEntity(this.rootEntity);
  }
  
  /**
   * Add an incoming Edge to this Node.
   */
  public addIncoming(edge: Edge) {
    this.incoming.push(edge);
  }
  
  /**
   * Add an outgoing Edge to this Node.
   */
  public addOutgoing(edge: Edge) {
    this.outgoing.push(edge);
  }
  
  /**
   * Set the modifier state of this Node from the given newState.
   * */
  abstract setModifierState(newState: string): void;
  
  /**
   * What to do when this Node is clicked.
   */
  abstract whenClicked(): void;
  
  /**
   * Update the outgoing states of the connected Edges for the current modifier and incoming states.
   */
  abstract updateOutgoingState(): void;
  
  /**
   * What to do when the incoming state changes.
   */
  abstract whenIncomingChanges(): void;
  
}
