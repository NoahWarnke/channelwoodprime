import UIresources from "./UIresources";
import { gameUI } from "./UIgroup";
import { ParticleSys } from "./pS"

const camera = Camera.instance

class JournalPageModel {
    pageNumber: number
    entity: Entity
    ps: ParticleSys
    position: Vector3
    constructor(pageNumber) {
        this.pageNumber = pageNumber
        this.entity = new Entity()
        this.entity.addComponent(UIresources.model.journalPageModel)
        this.entity.addComponent(new Transform({
            position: Vector3.Zero(),
            scale: new Vector3(0.5, 0.5, 0.5)
        }));
        log('adding OnClick component to page entity...');
        this.entity.addComponent(new OnClick(e => {
          log('pageClick for page ' + this.pageNumber);
              
          let squareDis = camera.position.subtract(this.entity.getComponent(Transform).position).lengthSquared()
          //log(squareDis)
          if (squareDis < 16) {
              //log("JOURNAL PAGE ", this.pageNumber, " UNLOCKED")
              gameUI.unlockPage(this.pageNumber)

              engine.removeEntity(this.entity)
              this.removeParticleSys()
          }
                
        }));
    }
    addToScene(position: Vector3) {
        this.position = position
        this.entity.getComponent(Transform).position = position
        this.entity.getComponent(Transform).position.y += 0.05;
        engine.addEntity(this.entity)
    }
    addParticleSys() {
        const initialColor2 = new Color3(0, 0.3, 1)
        const finalColor2 = new Color3(0, 0, 1)
        const material = new Material()
        material.albedoColor = Color3.Lerp(initialColor2, finalColor2, 1 / 5)
        material.emissiveColor = Color3.Lerp(initialColor2, finalColor2, 1 / 5)
        material.emissiveIntensity = 20

        this.ps = new ParticleSys(this.position, 6, 0.1, new PlaneShape(), material, 0.125)
        engine.addSystem(this.ps)
    }
    removeParticleSys() {
        this.ps.stopSystem()
    }
}

export const journalPage: JournalPageModel[] = []
for (let i = 0; i < 10; i++) {
    journalPage[i] = new JournalPageModel(i + 1)
}
