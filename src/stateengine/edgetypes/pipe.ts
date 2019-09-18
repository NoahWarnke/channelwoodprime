import {Node} from '../node';
import {Edge} from '../edge';

export class Pipe extends Edge {
  
  private pipeMat: Material;
  
  constructor(transform: Transform, from: Node, to: Node) {
    
    let pipeEnt = new Entity();
    let cs = new CylinderShape();
    cs.radiusTop = 1.0;
    cs.radiusBottom = 1.0;
    pipeEnt.addComponent(cs);
    let pipeMat = new Material();
    pipeMat.roughness = 1.0;
    pipeMat.albedoColor = Color3.Red();
    pipeEnt.addComponent(pipeMat);
    
    super({
      transform: transform,
      from: from,
      to: to,
      entities: [pipeEnt]
    });
    
    this.pipeMat = pipeMat;
  }
  
  public whenIncomingChanges(newIncomingState: string) {
    this.state = newIncomingState;
    log("Pipe state changing to: " + newIncomingState);
    if (this.state === "100") {
      this.pipeMat.albedoColor = Color3.Green();
    }
    else if (this.state === "0") {
      this.pipeMat.albedoColor = Color3.Red();
    }
  }
}
