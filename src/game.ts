import {Ground} from 'scenery/ground';
import {Tree} from 'scenery/tree';
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

let houses: {[index: string]: HouseSpec} = {
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
}

for (let houseKey of Object.keys(houses)) {
  let houseSpec: HouseSpec = houses[houseKey];
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
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
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
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
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
      houseSpec.pipes,
      houseSpec.rails,
      houseSpec.type
    );

    houseSpec.bridges.push(new Bridge(
      houses[houseSpec.from].house.getSocketPos(houseSpec.socket),
      houseSpec.house.getSocketPos((houseSpec.socket + 3) % 6),
      0
    ));
  }
}


// Create our puzzles!
//let manager = new Manager();

// Create the big trees!
let trees = [
  new Tree(
    'trunk3',
    new Transform({
      position: new Vector3(13, 35, 30),
      rotation: Quaternion.Euler(0, 60, 0)
    }),
    [
      {
        centerPos: new Vector3(14, houses.B0.house.getPos().y - 10, 32),
        treehousePos: houses.B0.house.getPos(),
        scale: 1
      }
    ],
    [
      /*
      {
        centerPos: new Vector3(14, 30, 30),
        folPos: new Vector3(9, 35, 40)
      }
      */
    ]
  ),
  new Tree(
    'trunk2',
    new Transform({
      position: new Vector3(26, 35, 21.5),
      rotation: Quaternion.Euler(0, 0, 0)
    }),
    [
      {
        centerPos: new Vector3(26.4, houses.C.house.getPos().y - 15, 22),
        treehousePos: houses.C.house.getPos(),
        scale: 0.5
      },
      {
        centerPos: new Vector3(25.5, houses.D0.house.getPos().y - 8, 21),
        treehousePos: houses.D0.house.getPos(),
        scale: 0.4
      }
    ],
    []
  ),
  /*
  {
    pos: new Vector3(30, 35, 8),
    rot: Quaternion.Euler(0, 90, 0),
    trunk: 'trunk4',
    houses: []
  },
  {
    pos: new Vector3(38, 35, 36),
    rot: Quaternion.Euler(0, 50, 0),
    trunk: 'trunk4',
    houses: []
  },
  {
    pos: new Vector3(51, 35, 33),
    rot: Quaternion.Euler(0, 290, 0),
    trunk: 'trunk5',
    houses: []
  },
  {
    pos: new Vector3(52, 48, 13),
    rot: Quaternion.Euler(0, 90, 0),
    trunk: 'trunk3',
    houses: []
  },
  {
    pos: new Vector3(67, 35, 11),
    rot: Quaternion.Euler(0, 0, 0),
    trunk: 'trunk2',
    houses: []
  },
  {
    pos: new Vector3(67, 35, 32),
    rot: Quaternion.Euler(0, 15, 0),
    trunk: 'trunk2',
    houses: []
  },
  */
];
/*
// Create the small trees!
let humanoidTreeLocations = [
  new Vector3(7, 10, 40),
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
*/

//Create UI (journal pages)
let ui = new UI([
    new Vector3(11.4, 4.6, 12.05),
    houses.A.house.getPos(),
    houses.B1.house.getPos(),
    houses.C.house.getPos(),
    houses.D0.house.getPos(),
    houses.F.house.getPos(),
    houses.H.house.getPos(),
    houses.J.house.getPos(),
    houses.M.house.getPos(),
    houses.N.house.getPos()
]);

//Add fairy dust particles if needed
const pS = new ParticleScenes();
