import {Treehouse} from 'treehouse';
import {Tree} from 'tree';

export class TreeBuilder {
  constructor() {
    
  }
  
  build(houses: {[index: string]: Treehouse}) {
    
    // Create the big trees!
    let trees = [

      /// Tree1 -- B
      new Tree(
        'trunk3', // Put trunk2 - trunk5
        new Transform({ // Transform for the trunk
          position: new Vector3(13, 35, 30),
          rotation: Quaternion.Euler(0, 60, 0)
        }),
        // Array of treehouse branch positions
        [
          {
            centerPos: new Vector3(14, houses.B0.getPos().y - 10, 32), // Starting point of the branch (the shoulder)
            treehousePos: houses.B0.getPos(),                          // Ending point of the branch (wrist) - should be treehosue position!
            scale: 1                                                   // Scale (1 = the native beefy thick branch. Just scales the diameter of the branch, not length.)
          }
        ],
        // Array of foliage branch positions. Same drill as above, except here, you can pick the foliage position to be wherever you want.
        [
          {
            folType: 'fol3',
            centerPos: new Vector3(13, 6, 29.5),
            folPos: new Vector3(4, 18, 20),
            scale: 0.5,
            folScale: 0.5
          },
          {
            folType: 'fol1',
            centerPos: new Vector3(13, 30, 32),
            folPos: new Vector3(9.5, 35, 40),
            scale: 0.4,
            folScale: 0.5
          },
          {
            folType: 'fol11',
            centerPos: new Vector3(13.5, 45, 32),
            folPos: new Vector3(13, 60, 25),
            scale: 0.3,
            folScale: 0.6
          },
        ]
      ),

      /// Tree2 -- C -- D0
      new Tree(
        'trunk2',
        new Transform({
          position: new Vector3(26, 35, 21.5),
          rotation: Quaternion.Euler(0, 0, 0)
        }),
        [
          {
            centerPos: new Vector3(26.4, houses.C.getPos().y - 15, 22),
            treehousePos: houses.C.getPos(),
            scale: 0.5
          },
          {
            centerPos: new Vector3(25.5, houses.D0.getPos().y - 8, 21),
            treehousePos: houses.D0.getPos(),
            scale: 0.4
          }
        ],
        [
          {
            folType: 'fol2',
            centerPos: new Vector3(28, 4, 20.5),
            folPos: new Vector3(40, 16, 15),
            scale: 0.55,
            folScale: 1
          },
          {
            folType: 'fol4',
            centerPos: new Vector3(26.75, 17, 22.5),
            folPos: new Vector3(33, 32, 28),
            scale: 0.4,
            folScale: 1
          },
          {
            folType: 'fol6',
            centerPos: new Vector3(25, 32, 21),
            folPos: new Vector3(18, 48, 17),
            scale: 0.3,
            folScale: 1
          },
        ]
      ),

      /// Tree3 -- E -- F
      new Tree(
        'trunk4',
        new Transform({
          position: new Vector3(30, 35, 8),
          rotation: Quaternion.Euler(0, 90, 0)
        }),
        [
          {
            centerPos: new Vector3(30.5, houses.E.getPos().y - 15, 9),
            treehousePos: houses.E.getPos(),
            scale: 0.4
          },
          {
            centerPos: new Vector3(31, houses.F.getPos().y - 14, 8.1),
            treehousePos: houses.F.getPos(),
            scale: 0.35
          },
        ],
        [
          {
            folType: 'fol3',
            centerPos: new Vector3(29, 8, 8.5),
            folPos: new Vector3(18, 22, 9),
            scale: 0.4,
            folScale: 0.6
          },
          {
            folType: 'fol6',
            centerPos: new Vector3(31, 36, 8),
            folPos: new Vector3(40, 51, 4),
            scale: 0.35,
            folScale: 0.5
          },
          {
            folType: 'fol9',
            centerPos: new Vector3(30, 55, 9.5),
            folPos: new Vector3(31, 70, 15),
            scale: 0.25,
            folScale: 1.5
          },
        ]
      ),

      /// Tree4 -- A -- D1
      new Tree(
        'trunk4',
        new Transform({
          position: new Vector3(38, 35, 36),
          rotation: Quaternion.Euler(0, 50, 0)
        }),
        [
          {
            centerPos: new Vector3(37, houses.A.getPos().y - 12, 36.75),
            treehousePos: houses.A.getPos(),
            scale: 0.35
          },
          {
            centerPos: new Vector3(38.55, houses.D1.getPos().y - 14, 35),
            treehousePos: houses.D1.getPos(),
            scale: 0.33
          },
        ],
        [
          {
            folType: 'fol4',
            centerPos: new Vector3(38.75, 9, 36),
            folPos: new Vector3(50, 23, 36),
            scale: 0.4,
            folScale: 1
          },
          {
            folType: 'fol7',
            centerPos: new Vector3(38.25, 24.5, 37.5),
            folPos: new Vector3(38.75, 40, 42),
            scale: 0.4,
            folScale: 0.5
          },
          {
            folType: 'fol8',
            centerPos: new Vector3(37, 45, 35),
            folPos: new Vector3(30, 60, 28),
            scale: 0.3,
            folScale: 1
          },
        ]
      ),

      /// Tree 5 -- B1 -- G -- L
      new Tree(
        'trunk5',
        new Transform({
          position: new Vector3(51, 35, 33),
          rotation: Quaternion.Euler(0, 290, 0)
        }),
        [
          {
            centerPos: new Vector3(50, houses.B1.getPos().y - 11, 34),
            treehousePos: houses.B1.getPos(),
            scale: 0.35
          },
          {
            centerPos: new Vector3(50.5, houses.G.getPos().y - 14, 32.5),
            treehousePos: houses.G.getPos(),
            scale: 0.33
          },
          {
            centerPos: new Vector3(51.5, houses.L.getPos().y - 14, 35),
            treehousePos: houses.L.getPos(),
            scale: 0.25
          },
        ],
        [
          {
            folType: 'fol1',
            centerPos: new Vector3(51.25, 5.5, 32),
            folPos: new Vector3(55, 19, 22),
            scale: 0.5,
            folScale: 1
          },
          {
            folType: 'fol2',
            centerPos: new Vector3(51.75, 25, 34.5),
            folPos: new Vector3(60, 40, 42),
            scale: 0.4,
            folScale: 0.5
          },
          {
            folType: 'fol3',
            centerPos: new Vector3(49.5, 45, 33.75),
            folPos: new Vector3(41.75, 60, 38),
            scale: 0.3,
            folScale: 1
          },
        ]
      ),

      /// Tree 6 -- N -- H
      new Tree(
        'trunk3',
        new Transform({
          position: new Vector3(52, 48, 13),
          rotation: Quaternion.Euler(0, 90, 0)
        }),
        [
          {
            centerPos: new Vector3(53.5, houses.N.getPos().y - 15, 14.75),
            treehousePos: houses.N.getPos(),
            scale: 0.4
          },
          {
            centerPos: new Vector3(54, houses.H.getPos().y - 14, 13),
            treehousePos: houses.H.getPos(),
            scale: 0.45
          },
        ],
        [
          {
            folType: 'fol5',
            centerPos: new Vector3(52, 6, 13),
            folPos: new Vector3(42, 19, 5),
            scale: 1,
            folScale: 0.5
          },
          {
            folType: 'fol7',
            centerPos: new Vector3(52.5, 37, 14.25),
            folPos: new Vector3(45, 51, 14),
            scale: 0.4,
            folScale: 1
          },
          {
            folType: 'fol8',
            centerPos: new Vector3(53.75, 47, 13.5),
            folPos: new Vector3(60, 63, 10),
            scale: 0.4,
            folScale: 1
          },
        ]
      ),

      /// Tree 7 -- I -- J
      new Tree(
        'trunk2',
        new Transform({
          position: new Vector3(67, 35, 11),
          rotation: Quaternion.Euler(0, 0, 0)
        }),
        [
          {
            centerPos: new Vector3(67.5, houses.I.getPos().y - 12, 12.5),
            treehousePos: houses.I.getPos(),
            scale: 0.33
          },
          {
            centerPos: new Vector3(68.5, houses.J.getPos().y - 15, 11),
            treehousePos: houses.J.getPos(),
            scale: 0.33
          },
        ],
        [
          {
            folType: 'fol9',
            centerPos: new Vector3(68.75, 5, 11),
            folPos: new Vector3(73, 20, 6),
            scale: 0.7,
            folScale: 0.6
          },
          {
            folType: 'fol10',
            centerPos: new Vector3(66, 11, 12),
            folPos: new Vector3(60, 27, 17),
            scale: 0.4,
            folScale: 1
          },
          {
            folType: 'fol11',
            centerPos: new Vector3(68, 52, 11.5),
            folPos: new Vector3(75, 68, 13),
            scale: 0.25,
            folScale: 0.5
          },
        ]
      ),

      /// Tree 8 -- K -- M
      new Tree(
        'trunk2',
        new Transform({
          position: new Vector3(67, 35, 32),
          rotation: Quaternion.Euler(0, 15, 0)
        }),
        [
          {
            centerPos: new Vector3(68.75, houses.K.getPos().y - 15, 32),
            treehousePos: houses.K.getPos(),
            scale: 0.33
          },
          {
            centerPos: new Vector3(67.25, houses.M.getPos().y - 12, 33.5),
            treehousePos: houses.M.getPos(),
            scale: 0.33
          },
        ],
        [
          {
            folType: 'fol1',
            centerPos: new Vector3(67, 7, 32),
            folPos: new Vector3(59, 20, 42),
            scale: 0.7,
            folScale: 0.5
          },
          {
            folType: 'fol4',
            centerPos: new Vector3(67.25, 24, 31.5),
            folPos: new Vector3(73, 39, 22),
            scale: 0.5,
            folScale: 0.7
          },
          {
            folType: 'fol8',
            centerPos: new Vector3(66.5, 25, 32.75),
            folPos: new Vector3(72, 40, 41),
            scale: 0.4,
            folScale: 0.7
          },
        ]
      )
    ];
  }
}
