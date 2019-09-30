import {Ground} from 'scenery/ground';
import {Tree} from 'scenery/tree';
import {TreeBuilder} from 'scenery/treebuilder';
import {HumanoidTree} from 'scenery/humanoidtree';
import {Treehouse} from 'scenery/treehouse';
import {HouseSpec} from 'scenery/housespec';
import {Bridge} from 'scenery/bridge';
import {Windmill} from 'scenery/windmill'
import {Manager} from 'stateengine/manager';
import {UI} from 'moduleUI/ui';
import {ParticleScenes} from 'particle/particleSys';

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

let houseSpecs: {[index: string]: HouseSpec} = {
  'A': {
    from: 'ground',
    ground: new Vector3(14, 1.4, 17),
    socket: 1,
    dist: 30,
    alt: 15,
    pipes: ['medl', 'none', 'none', 'shortr', 'valvel', 'full'],
    rails: ['gap', 'full', 'full', 'gap', 'gap', 'full'],
    type: 'plat'
  },
  'B0': {
    from: 'A',
    socket: 3,
    dist: 15,
    alt: 18,
    pipes: ['shortl', 'none', 'none', 'none', 'none', 'shortr'],
    rails: ['gap', 'full', 'full', 'full', 'full', 'gap'],
    type: 'house'
  },
  'B1': {
    from: 'A',
    socket: 0,
    dist: 16,
    alt: 15,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
    rails: ['full', 'full', 'full', 'gap', 'full', 'full'],
    type: 'house'
  },
  'C': {
    from: 'B0',
    socket: 5,
    dist: 14,
    alt: 23,
    pipes: ['shortr', 'full', 'valvel', 'full', 'medl', 'none'],
    rails: ['gap', 'full', 'gap', 'full', 'gap', 'full'],
    type: 'house'
  },
  'D0': {
    from: 'C',
    socket: 4,
    dist: 18,
    alt: 30,
    pipes: ['shortr', 'shortl', 'none', 'none', 'none', 'none'],
    rails: ['gap', 'gap', 'full', 'full', 'full', 'full'],
    type: 'house'
  },
  'D1': {
    from: 'C',
    socket: 0,
    dist: 20,
    alt: 23,
    pipes: ['full', 'full', 'full', 'shortl','shortr', 'full'],
    rails: ['full', 'full', 'full', 'gap', 'gap', 'full'],
    type: 'house'
  },
  'E': {
    from: 'two',
    from0: 'D0',
    socket0: 0,
    from1: 'D1',
    socket1: 4,
    alt: 25,
    pipes: ['full', 'shortl', 'none', 'medr', 'full', 'valver'],
    rails: ['full', 'gap', 'full', 'gap', 'full', 'gap'],
    type: 'plat'
  },
  'F': {
    from: 'E',
    socket: 5,
    dist: 11,
    alt: 28,
    pipes: ['medl', 'shortr', 'valvel', 'full', 'full', 'full'],
    rails: ['gap', 'gap', 'gap', 'full', 'full', 'full'],
    type: 'house'
  },
  'G': {
    from: 'F',
    socket: 1,
    dist: 18,
    alt: 30,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
    rails: ['full', 'full', 'full', 'full', 'gap', 'full'],
    type: 'plat'
  },
  'H': {
    from: 'F',
    socket: 0,
    dist: 22,
    alt: 40,
    pipes: ['none', 'shortr', 'full', 'shortl', 'none', 'none'],
    rails: ['full', 'gap', 'full', 'gap', 'full', 'full'],
    type: 'house'
  },
  'I': {
    from: 'H',
    socket: 1,
    dist: 18,
    alt: 45,
    pipes: ['full', 'medl', 'shortr', 'full', 'valvel', 'full'],
    rails: ['full', 'gap', 'gap', 'full', 'gap', 'gap'],
    type: 'plat'
  },
  'J': {
    from: 'I',
    socket: 5,
    dist: 12.5,
    alt: 44,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
    rails: ['full', 'full', 'gap', 'full', 'full', 'full'],
    type: 'house'
  },
  'K': {
    from: 'I',
    socket: 1,
    dist: 12.5,
    alt: 50,
    pipes: ['none', 'none', 'shortr', 'full', 'shortl', 'none'],
    rails: ['full', 'full', 'gap', 'full', 'gap', 'full'],
    type: 'house'
  },
  'L': {
    from: 'I',
    socket: 2,
    dist: 25,
    alt: 55,
    pipes: ['medl', 'none', 'none', 'none', 'none', 'medr'],
    rails: ['gap', 'full', 'full', 'full', 'full', 'gap'],
    type: 'house'
  },
  'M': {
    from: 'two',
    from0: 'L',
    socket0: 0,
    from1: 'K',
    socket1: 2,
    alt: 53,
    pipes: ['none', 'none', 'none', 'medr', 'valver', 'shortl'],
    rails: ['full', 'full', 'full', 'gap', 'gap', 'gap'],
    type: 'plat'
  },
  'N': {
    from: 'M',
    socket: 4,
    dist: 28,
    alt: 70,
    pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
    rails: ['full', 'gap', 'full', 'full', 'full', 'full'],
    type: 'house'
  },
};

let houses: {[index: string]: Treehouse} = {};
let bridges: Bridge[] = [];

for (let houseKey of Object.keys(houseSpecs)) {
  let houseSpec: HouseSpec = houseSpecs[houseKey];
  
  if (houseSpec.from === 'ground') {
    houses[houseKey] = new Treehouse(
      new Transform({
        position: Treehouse.reachFromPos(
          houseSpec.ground,
          houseSpec.socket,
          houseSpec.dist,
          houseSpec.alt
        )
      }),
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
    );
    bridges.push(new Bridge(
      houseSpec.ground,
      houses[houseKey].getSocketPos((houseSpec.socket + 3) % 6),
      0
    ));
  }
  else if (houseSpec.from === 'two') {
    houses[houseKey] = new Treehouse(
      new Transform({
        position: houses[houseSpec.from0].intersect(
          houseSpec.socket0,
          houses[houseSpec.from1],
          houseSpec.socket1,
          houseSpec.alt
        )
      }),
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
    );
    bridges.push(new Bridge(
      houses[houseSpec.from0].getSocketPos(houseSpec.socket0),
      houses[houseKey] .getSocketPos((houseSpec.socket0 + 3) % 6),
      0
    ));
    bridges.push(new Bridge(
      houses[houseSpec.from1].getSocketPos(houseSpec.socket1),
      houses[houseKey].getSocketPos((houseSpec.socket1 + 3) % 6),
      0
    ));
  }
  else {
     houses[houseKey] = new Treehouse(
      new Transform({
        position: houses[houseSpec.from].reach(
          houseSpec.socket,
          houseSpec.dist,
          houseSpec.alt
        )
      }),
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
    );

    bridges.push(new Bridge(
      houses[houseSpec.from].getSocketPos(houseSpec.socket),
      houses[houseKey].getSocketPos((houseSpec.socket + 3) % 6),
      0
    ));
  }
}


// Create our puzzles!
//let manager = new Manager();

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
    new Vector3(11.4, 4.6, 12.05),
    houses.A.getPos(),
    houses.B1.getPos(),
    houses.C.getPos(),
    houses.D0.getPos(),
    houses.F.getPos(),
    houses.H.getPos(),
    houses.J.getPos(),
    houses.M.getPos(),
    houses.N.getPos()
]);

//Add fairy dust particles if needed
const pS = new ParticleScenes();
