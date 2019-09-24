import {Ground} from 'scenery/ground';
import {Tree} from 'scenery/tree';
import {Treehouse} from 'scenery/treehouse';
import {Bridge} from 'scenery/bridge';
import {Manager} from 'stateengine/manager';

let ground = new Ground();

let house0 = new Treehouse(
  new Transform({
    position: new Vector3(24, 1, 24)
  }),
  [0, 0, 4, 0, 0, 0]
);

let islandBridgePos = new Vector3(65, 1.35, 32);
let test = new Bridge(/*new Vector3(24, 1, 20.536)*/ house0.getSocketPos(2), new Vector3(65, 1.35, 32), 0);
/*
for (var i = 0; i < 20; i++) {
  let test = new Bridge(
    new Vector3(Math.random() * 72 + 4, Math.random() * 60, Math.random() * 40 + 4),
    new Vector3(Math.random() * 72 + 4, Math.random() * 60, Math.random() * 40 + 4),
    0
  );
}
*/

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
  }));
}
