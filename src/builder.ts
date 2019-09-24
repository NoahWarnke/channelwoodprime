import {Treehouse} from 'scenery/treehouse';
import {Bridge} from 'scenery/bridge';


export class Builder {
  
  public groundPos: Vector3;
  
  constructor(groundPos: Vector3) {
    this.groundPos = groundPos;
  }
  
  dirVec(dirChoice: number) {
    
  }
  
  addHouseFromPos(pos: Vector3, dist: number, height: number, dirChoice: number, pipeLeft: boolean, pipeRight: boolean, railingLayout: number[]) {
    
    //let newHouse = new Treehouse(pos.clone().add())
  }
  
  addHouseFromGround(dist: number, height: number, dirChoice: number, pipeLeft: boolean, pipeRight: boolean, railingLayout: number[]) {
    this.addHouseFromPos(this.groundPos, dist, height, dirChoice, pipeLeft, pipeRight, railingLayout);
  }
  
  addHouseFromHouse() {
    
  }
}
