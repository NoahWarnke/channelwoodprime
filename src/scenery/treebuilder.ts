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
            folPos: new Vector3(4, 20, 20),
            scale: 0.5
          },
          {
            folType: 'fol1',
            centerPos: new Vector3(13, 30, 32),
            folPos: new Vector3(9.5, 35, 40),
            scale: 0.4
          },
          {
            folType: 'fol11',
            centerPos: new Vector3(13.5, 45, 32),
            folPos: new Vector3(13, 60, 25),
            scale: 0.3
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
            folPos: new Vector3(40, 18, 15),
            scale: 0.55
          },      
          {
            folType: 'fol4',
            centerPos: new Vector3(26.75, 17, 22.5),
            folPos: new Vector3(36, 32, 28),
            scale: 0.4
          },      
          {
            folType: 'fol6',
            centerPos: new Vector3(25, 32, 21),
            folPos: new Vector3(18, 50, 17),
            scale: 0.3
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
        []
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
        []
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
        []
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
        []
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
        []
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
        []
      )
    ];
  }
}
