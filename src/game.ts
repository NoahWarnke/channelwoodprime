import {Tree} from 'scenery/tree';
import {Manager} from 'stateengine/manager';

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
