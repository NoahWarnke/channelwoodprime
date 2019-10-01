
import {HouseSpec} from 'housespec';
import {Treehouse} from 'treehouse';
import {Bridge} from 'bridge';

export class HouseAndBridgeBuilder {
  
  constructor() {
    
  }
  
  public build() {
    
    let houseSpecs: {[index: string]: HouseSpec} = {
      'A': {
        from: 'ground',
        ground: new Vector3(14, 1.4, 17),
        socket: 1,
        dist: 30,
        alt: 15,
        frommodule0: 'posts',
        frommodule1: 'gate',
        brType: 'withPipe',
        pipes: ['medl', 'none', 'none', 'shortr', 'valvel', 'full'],
        rails: ['gap', 'full', 'full', 'gap', 'gap', 'full'],
        type: 'plat'
      },
      'B0': {
        from: 'A',
        socket: 3,
        dist: 15,
        alt: 18,
        frommodule0: 'posts',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['shortl', 'none', 'none', 'none', 'none', 'shortr'],
        rails: ['gap', 'full', 'full', 'full', 'full', 'gap'],
        type: 'house'
      },
      'B1': {
        from: 'A',
        socket: 0,
        dist: 16,
        alt: 15,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withoutPipe',
        pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
        rails: ['full', 'full', 'full', 'gap', 'full', 'full'],
        type: 'house'
      },
      'C': {
        from: 'B0',
        socket: 5,
        dist: 14,
        alt: 23,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['shortr', 'full', 'valvel', 'full', 'medl', 'none'],
        rails: ['gap', 'full', 'gap', 'full', 'gap', 'full'],
        type: 'house'
      },
      'D0': {
        from: 'C',
        socket: 4,
        dist: 18,
        alt: 30,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['shortr', 'shortl', 'none', 'none', 'none', 'none'],
        rails: ['gap', 'gap', 'full', 'full', 'full', 'full'],
        type: 'house'
      },
      'D1': {
        from: 'C',
        socket: 0,
        dist: 20,
        alt: 23,
        frommodule0: 'posts',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['full', 'full', 'full', 'shortl','shortr', 'valvel'],
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
        from0module0: 'posts',
        from0module1: 'posts',
        br0Type: 'withPipe',
        from1module0: 'posts',
        from1module1: 'gate',
        br1Type: 'withPipe',
        pipes: ['full', 'shortl', 'none', 'medr', 'full', 'valver'],
        rails: ['full', 'gap', 'full', 'gap', 'full', 'gap'],
        type: 'plat'
      },
      'F': {
        from: 'E',
        socket: 5,
        dist: 11,
        alt: 28,
        frommodule0: 'posts',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['shortr', 'full', 'shortl', 'none', 'none', 'none'],
        rails: ['gap', 'gap', 'gap', 'full', 'full', 'full'],
        type: 'house'
      },
      'G': {
        from: 'F',
        socket: 1,
        dist: 18,
        alt: 30,
        frommodule0: 'posts',
        frommodule1: 'gate',
        brType: 'withoutPipe',
        pipes: ['none', 'none', 'shortr', 'full', 'shortl', 'none'],
        rails: ['full', 'full', 'full', 'full', 'gap', 'full'],
        type: 'plat'
      },
      'H': {
        from: 'F',
        socket: 0,
        dist: 22,
        alt: 40,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['none', 'shortr', 'full', 'shortl', 'none', 'none'],
        rails: ['full', 'gap', 'full', 'gap', 'full', 'full'],
        type: 'house'
      },
      'I': {
        from: 'H',
        socket: 1,
        dist: 18,
        alt: 45,
        frommodule0: 'posts',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['full', 'medl', 'shortr', 'full', 'valver', 'full'],
        rails: ['full', 'gap', 'gap', 'full', 'gap', 'gap'],
        type: 'plat'
      },
      'J': {
        from: 'I',
        socket: 5,
        dist: 12.5,
        alt: 44,
        frommodule0: 'posts',
        frommodule1: 'gate',
        brType: 'withPipe',
        pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
        rails: ['full', 'full', 'gap', 'full', 'full', 'full'],
        type: 'house'
      },
      'K': {
        from: 'I',
        socket: 1,
        dist: 12.5,
        alt: 50,
        frommodule0: 'posts',
        frommodule1: 'posts',
        brType: 'withPipe',
        pipes: ['none', 'none', 'shortr', 'full', 'shortl', 'none'],
        rails: ['full', 'full', 'gap', 'full', 'gap', 'full'],
        type: 'house'
      },
      'L': {
        from: 'I',
        socket: 2,
        dist: 25,
        alt: 55,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withoutPipe',
        pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
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
        from0module0: 'posts',
        from0module1: 'gate',
        br0Type: 'withoutPipe',
        from1module0: 'posts',
        from1module1: 'posts',
        br1Type: 'withPipe',
        pipes: ['full', 'full', 'full', 'shortl', 'shortr', 'valvel'],
        rails: ['full', 'full', 'full', 'gap', 'gap', 'full'], // last full = blocking bridge!
        type: 'plat'
      },
      'N': {
        from: 'M',
        socket: 4,
        dist: 28,
        alt: 70,
        frommodule0: 'gate',
        frommodule1: 'posts',
        brType: 'withoutPipe',
        pipes: ['none', 'none', 'none', 'none', 'none', 'none'],
        rails: ['full', 'gap', 'full', 'full', 'full', 'full'],
        type: 'house'
      },
    };
    
    
    let houses: {[index: string]: Treehouse} = {};

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
        let bridge = new Bridge(
          houseSpec.ground,
          houses[houseKey].getSocketPos((houseSpec.socket + 3) % 6),
          houseSpec.frommodule0,
          houseSpec.frommodule1,
          houseSpec.brType
        );
        houses[houseKey].incomingBridges['ground'] = bridge;
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
        let bridge0 = new Bridge(
          houses[houseSpec.from0].getSocketPos(houseSpec.socket0),
          houses[houseKey] .getSocketPos((houseSpec.socket0 + 3) % 6),
          houseSpec.from0module0,
          houseSpec.from0module1,
          houseSpec.br0Type
        );
        let bridge1 = new Bridge(
          houses[houseSpec.from1].getSocketPos(houseSpec.socket1),
          houses[houseKey].getSocketPos((houseSpec.socket1 + 3) % 6),
          houseSpec.from1module0,
          houseSpec.from1module1,
          houseSpec.br1Type
        );
        
        houses[houseKey].incomingBridges[houseSpec.from0] = bridge0;
        houses[houseSpec.from0].outgoingBridges[houseKey] = bridge0;
        
        houses[houseKey].incomingBridges[houseSpec.from1] = bridge1;
        houses[houseSpec.from1].outgoingBridges[houseKey] = bridge1;
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
        let bridge = new Bridge(
          houses[houseSpec.from].getSocketPos(houseSpec.socket),
          houses[houseKey].getSocketPos((houseSpec.socket + 3) % 6),
          houseSpec.frommodule0,
          houseSpec.frommodule1,
          houseSpec.brType
        );
        houses[houseKey].incomingBridges[houseSpec.from] = bridge;
        houses[houseSpec.from].outgoingBridges[houseKey] = bridge;
      }
    }
    
    return houses;
  }
}
