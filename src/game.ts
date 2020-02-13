import {Ground} from 'scenery/ground';
import {TreeBuilder} from 'scenery/treebuilder';
import {HouseAndBridgeBuilder} from 'scenery/houseandbridgebuilder';
import {PuzzleBuilder} from 'puzzlestate/puzzlebuilder';
import {HumanoidTree} from 'scenery/humanoidtree';
import {Windmill} from 'scenery/windmill'
import {UI, HintUI} from 'moduleUI/ui';
import {ParticleScenes} from 'particle/particleSys';
import {AudioAmbient, AudioWindmill} from 'sceneaudio/sceneAudio';

// For launch treasure hunt!
import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import CrateScript from "../f5291efe-2cbd-4882-9485-25bd2d0b8fb0/src/item"
import Script1 from "../3f3fe65b-c648-44bc-8781-c2a40bc95bb4/src/item"
// /end treasure hunt

// Create our ground (heightmap and lake).
let ground = new Ground();

// Create the windmill on the island.
let windmill = new Windmill();

// Create our treehouses and bridges!
let houseAndBridgeBuilder = new HouseAndBridgeBuilder();
let houses = houseAndBridgeBuilder.build();

// Create our puzzles!
let puzzleBuilder = new PuzzleBuilder(houses, windmill.valve);
puzzleBuilder.build();

// Create our trees!
let treeBuilder = new TreeBuilder();
treeBuilder.build(houses);

// Create the small trees!
let humanoidTreeLocations = [
  new Vector3(7, 0, 40),
  new Vector3(22, 0, 6),
  new Vector3(36, 0, 28),
  new Vector3(43, 0, 19),
  new Vector3(54, 0, 42),
  new Vector3(65, 0, 17),
  new Vector3(70, 0, 34)
];

for (let i = 0; i < humanoidTreeLocations.length; i++) {
  let tree = new HumanoidTree(
    new Transform({
      position: humanoidTreeLocations[i],
      scale: new Vector3(3, 3, 3),
      rotation: Quaternion.Euler(0, i * 360 / 7, 0)
    }),
    i
  );
}


//Create UI (journal pages)
let ui = new UI([
  new Vector3(12.41, 4.03, 10.7), // Moved because colliders now block clicks?
  houses.A.getPos(),
  houses.B1.getPos(),
  houses.C.getPos(),
  houses.D0.getPos(),
  houses.F.getPos(),
  houses.G.getPos(),
  houses.J.getPos(),
  houses.M.getPos(),
  houses.N.getPos()
]);

//Add fairy dust particles if needed
//const pS = new ParticleScenes();

//Add audio for day ambient and windmill
let audioWindmill = new AudioWindmill();
let audioAmbient = new AudioAmbient();

//Add valve and gate UI when crosshair pointing at gate or valve
let hintUI = new HintUI();

// Eye balls
const eyeballs = new Entity()
eyeballs.addComponent(new GLTFShape("models/trees/eyeballs.glb"))
eyeballs.addComponent(new Transform({
  position: new Vector3(houses.N.getPos().x - 1.2, houses.N.getPos().y + 2.25, houses.N.getPos().z - 6),
  rotation: Quaternion.Euler(0, -90, 0)
}))

// Eyes animation
let animator = new Animator()
eyeballs.addComponent(animator)
const eyesOpening = new AnimationState("eyesOpen")
eyesOpening.looping = true
eyesOpening.reset();

// Add animation clip to Animator component
animator.addClip(eyesOpening)

eyeballs.addComponent(new OnClick(() => {
  eyesOpening.reset();
  eyesOpening.play();
}))

engine.addEntity(eyeballs)

// Telescope
const telescope = new Entity()
telescope.addComponent(new GLTFShape("models/treehouses/telescope.glb"))
telescope.addComponent(new Transform({
  position: new Vector3(houses.N.getPos().x + 1, houses.N.getPos().y, houses.N.getPos().z-0.4),
  rotation: Quaternion.Euler(0, 130, 0),
  scale: new Vector3(0.8, 0.8, 0.8)
}))
engine.addEntity(telescope)



// Temporary helper to find locations:

// Instance the input object
/*
const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {
  
  log('pointer down');
  
  let physicsCast = PhysicsCast.instance

  let originPos = Camera.instance.position
  let direction = new Vector3(0, 0, 1).rotate(Camera.instance.rotation)

  let ray: Ray = {
        origin: originPos,
        direction: direction,
        distance: 10
  	}

  physicsCast.hitAll(ray, (e) => {
    log(e);
    log(e.hitPoint)
  	for (let entityHit of e.entities) {
           log(entityHit.entity.entityId)
           
      }
  })
})
*/




// For launch treasure hunt!

// Crate
const crate = new Entity('crate')
engine.addEntity(crate)
const crateTransform = new Transform({
  position: houses.E.getPos(),
  rotation: Quaternion.Euler(0, 60, 0),
})
crate.addComponent(crateTransform)
engine.addEntity(crate)

const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const crateScript = new CrateScript()
const options = { inventory }

crateScript.init(options)
crateScript.spawn(crate, {
    "collectPointId": `1c139adf-9ced-452a-8966-b5df714632bf`,
    "campaignId": "fd27539a-30b8-4c29-b8c7-a21a90190abf",
    "visible": true
}, createChannel(channelId, crate, channelBus))


// Signpost
const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)
const signpostRoot = new Entity('signpostRoot')
engine.addEntity(signpostRoot)
signpostRoot.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(16.338706970214844, 0.5, 17.598878860473633),
  rotation: Quaternion.Euler(0, 210, 0),
  scale: new Vector3(1, 1, 1)
})
signpostRoot.addComponentOrReplace(transform3)


const script1 = new Script1()
script1.init(options)
script1.spawn(signpostRoot, {"text":"For next challenge\n“/goto next”\nin chat window ","fontSize":20}, createChannel(channelId, signpostRoot, channelBus))

// End treasurehunt
