import {Node} from 'node';

/**
 * Represents an edge connecting two Nodes in the energy graph.
 * Edges have:
* a root Transform,
* a set of Entities (shapes plus transforms) for displaying the Edge.
 * a Node they come from,
 * a Node they go to,
 * a function for updating their appearance given a state that the Edge is passing between the From node and the To node.
 */
export abstract class Edge {
  
  public rootEntity: Entity;
  public transform: Transform;
  public entities: Entity[];
  
  public from: Node;
  public to: Node;
  
  public state: string;
  
  constructor(edgeConfig: any) {
    
    // Set up a root Entity for the Edge.
    this.rootEntity = new Entity();
    
    // Get the Transform.
    if (edgeConfig.transform) {
      this.transform = edgeConfig.transform;
    }
    else {
      this.transform = new Transform();
    }
    this.rootEntity.addComponent(this.transform);
    
    // Get the Entities.
    if (edgeConfig.entities && edgeConfig.entities.length > 0) {
      this.entities = edgeConfig.entities;
    }
    else {
      let defaultEnt = new Entity();
      defaultEnt.addComponent(new CylinderShape());
      this.entities = [
        new Entity()
      ];
    }
    for (let entity of this.entities) {
      entity.setParent(this.rootEntity);
    }
    
    // Get the from Node.
    if (edgeConfig.from) {
      this.from = edgeConfig.from;
    }
    else {
      throw new Error("Edge requires a from Node!");
    }
    
    // Get the to Node.
    if (edgeConfig.to) {
      this.to = edgeConfig.to;
    }
    else {
      throw new Error("Edge requires a to Node!");
    }
    
    // Get the initial internal state.
    if (edgeConfig.initialState) {
      this.state = edgeConfig.initialState;
    }
    else {
      this.state = "";
    }
    
    engine.addEntity(this.rootEntity);
  }
  
  /**
   * What to do when the incoming state changes.
   */
  abstract whenIncomingChanges(newIncomingState: string): void;
}
