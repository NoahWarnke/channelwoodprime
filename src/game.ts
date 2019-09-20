import {Tree} from 'scenery/tree';
import {Treehouse} from 'scenery/treehouse';
import {Bridge} from 'scenery/bridge';
import {Manager} from 'stateengine/manager';

let house0 = new Treehouse(
  new Transform({
    position: new Vector3(24, 1, 24)
  }),
  [0, 1, 2, 4, 4, 3]
);

let test = new Bridge(new Vector3(24, 1, 20.536), new Vector3(24, 10, 0.3), 0);
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
  new Vector3(8,0, 3),
  new Vector3(17,0,28),
  new Vector3(40,0,16),
  new Vector3(78,0,18)
];

for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 3; y++) {
    let size = Math.random() * 20 + 60;
    let tree = new Tree(new Transform({
      position: new Vector3(x * 16 + Math.random() * 8 + 4, 0, y * 16 + Math.random() * 8 + 4),
      scale: new Vector3(size / 20, size, size / 20)
    }));
  }
}
