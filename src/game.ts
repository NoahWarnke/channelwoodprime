import {Ground} from 'scenery/ground';
import {Tree} from 'scenery/tree';
import {Treehouse} from 'scenery/treehouse';
import {Bridge} from 'scenery/bridge';
import {Windmill} from 'scenery/windmill'
import {Manager} from 'stateengine/manager';

// Create our ground (heightmap and lake).
let ground = new Ground();

// Create the windmill on the island.
let windmill = new Windmill(
  new Transform({
    position: new Vector3(11, 4, 12),
    rotation: Quaternion.Euler(0, 215, 0),
    scale: new Vector3(0.7, 0.7, 0.7)
  })
);

// The position on the island where the first bridge departs for the treetops.
let islandBridgePos = new Vector3(14, 1.4, 17);

let house0 = new Treehouse(
  new Transform({position: Treehouse.reachFromPos(islandBridgePos, 1, 20, 15)}),
  ['full', 'shortl', 'none', 'none', 'shortr', 'valver']
);

let bridge0 = new Bridge(islandBridgePos, house0.getSocketPos(4), 0);

let house1 = new Treehouse(
  new Transform({position: house0.reach(3, 15, 16)}),
  ['none', 'none', 'none', 'none', 'none', 'none']
);

let bridge1 = new Bridge(house0.getSocketPos(3), house1.getSocketPos(0), 0);


// Create our puzzles!
let manager = new Manager();

let treeLocations = [
  //new Vector3(8,40, 3),
  //new Vector3(17,40,28),
  new Vector3(40,36,16),
  //new Vector3(78,40,18)
];

for (let i = 0; i < treeLocations.length; i++) {
  let size = Math.random() * 20 + 60;
  let tree = new Tree(new Transform({
    position: treeLocations[i]
  }), [
    house0.getPos()
  ]);
}
