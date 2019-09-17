import {Tree} from 'tree';


let treeLocations = [
  new Vector3(8,0, 3),
  new Vector3(17,0,28),
  new Vector3(40,0,16),
  new Vector3(78,0,18)
];

for (let i = 0; i < 15; i++) {
  let tree = new Tree(new Transform({
    position: new Vector3(Math.random() * 76 + 4, 0, Math.random() * 44 + 4),
    scale: new Vector3(4, 80, 4)
  }));
}
