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

let houses = {
  'A': {
    from: 'ground',
    ground: new Vector3(14, 1.4, 17),
    socket: 1,
    dist: 30,
    alt: 15,
    pipes: ['none', 'none', 'none', 'shortr', 'valver', 'medl']
  },
  'B': {
    from: 'A',
    socket: 3,
    dist: 15,
    alt: 18,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'C': {
    from: 'B',
    socket: 5,
    dist: 14,
    alt: 23,
    pipes: ['full', 'full', 'shortl', 'none', 'none', 'shortr']
  },
  'D0': {
    from: 'C',
    socket: 4,
    dist: 18,
    alt: 30,
    pipes: ['shortr', 'full', 'valver', 'full', 'shortl', 'none']
  },
  'D1': {
    from: 'C',
    socket: 0,
    dist: 20,
    alt: 23,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'E': {
    from: 'two',
    from0: 'D0',
    socket0: 0,
    from1: 'D1',
    socket1: 4,
    alt: 25,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'F': {
    from: 'E',
    socket: 5,
    dist: 11,
    alt: 28,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'G': {
    from: 'F',
    socket: 1,
    dist: 18,
    alt: 30,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'H': {
    from: 'F',
    socket: 0,
    dist: 22,
    alt: 40,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'I': {
    from: 'H',
    socket: 1,
    dist: 18,
    alt: 45,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'J': {
    from: 'I',
    socket: 5,
    dist: 12.5,
    alt: 44,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'K': {
    from: 'I',
    socket: 1,
    dist: 12.5,
    alt: 45,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
  'L': {
    from: 'I',
    socket: 2,
    dist: 25,
    alt: 55,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none']
  },
}

for (let houseKey of Object.keys(houses)) {
  let houseSpec = houses[houseKey];
  houseSpec.bridges = [];
  
  if (houseSpec.from === 'ground') {
    houseSpec.house = new Treehouse(
      new Transform({
        position: Treehouse.reachFromPos(
          houseSpec.ground,
          houseSpec.socket,
          houseSpec.dist,
          houseSpec.alt
        )
      }),
      houseSpec.pipes
    );
    houseSpec.bridges.push(new Bridge(
      houseSpec.ground,
      houseSpec.house.getSocketPos((houseSpec.socket + 3) % 6),
      0
    ));
  }
  else if (houseSpec.from === 'two') {
    houseSpec.house = new Treehouse(
      new Transform({
        position: houses[houseSpec.from0].house.intersect(
          houseSpec.socket0,
          houses[houseSpec.from1].house,
          houseSpec.socket1,
          houseSpec.alt
        )
      }),
      houseSpec.pipes
    );
    houseSpec.bridges.push(new Bridge(
      houses[houseSpec.from0].house.getSocketPos(houseSpec.socket0),
      houseSpec.house.getSocketPos((houseSpec.socket0 + 3) % 6),
      0
    ));
    houseSpec.bridges.push(new Bridge(
      houses[houseSpec.from1].house.getSocketPos(houseSpec.socket1),
      houseSpec.house.getSocketPos((houseSpec.socket1 + 3) % 6),
      0
    ));
  }
  else {
     houseSpec.house = new Treehouse(
      new Transform({
        position: houses[houseSpec.from].house.reach(
          houseSpec.socket,
          houseSpec.dist,
          houseSpec.alt
        )
      }),
      houseSpec.pipes
    );

    houseSpec.bridges.push(new Bridge(
      houses[houseSpec.from].house.getSocketPos(houseSpec.socket),
      houseSpec.house.getSocketPos((houseSpec.socket + 3) % 6),
      0
    ));
  }
}


// Create our puzzles!
let manager = new Manager();

let treeLocations = [
  //new Vector3(26,36, 28),
  //new Vector3(17,40,28),
  new Vector3(40,36,16),
  //new Vector3(78,40,18)
];

for (let i = 0; i < treeLocations.length; i++) {
  let size = Math.random() * 20 + 60;
  let tree = new Tree(new Transform({
    position: treeLocations[i]
  }), [
    houses['A'].house.getPos()
  ]);
}
