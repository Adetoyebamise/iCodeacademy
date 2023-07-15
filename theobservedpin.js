/*DESCRIPTION:
Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the PIN he saw, when Robby entered it.

The keypad has the following layout:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
    │ 0 │
    └───┘
He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

* possible in sense of: the observed PIN itself and all variations considering the adjacent digits

Can you help us to find all those variations? It would be nice to have a function, that returns an array (or a list in Java/Kotlin and C#) of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs (get_pins in python, GetPINs in C#). But please note that all PINs, the observed one and also the results, must be strings, because of potentially leading '0's. We already prepared some test cases for you.

Detective, we are counting on you!

*/

function getPINs(observed) {
  return observed.split('')
  .map( t => ({
		'0': [ '0', '8' ],
    '1': [ '1', '2', '4' ],
    '2': [ '1', '2', '3', '5' ],
    '3': [ '2', '3', '6' ],
    '4': [ '1', '4', '5', '7' ],
    '5': [ '2', '4', '5', '6', '8' ],
    '6': [ '3', '5', '6', '9' ],
    '7': [ '4', '7', '8' ],
    '8': [ '5', '7', '8', '9', '0' ],
    '9': [ '6', '8', '9' ]
  }[t]))
  .reduce((pre, cur)=> [].concat.apply([], pre.map(t => cur.map(g => t + g))));
}

function getPINs(ob) {
  const obj = {
    "0": ["0", "8"],
    "1": ["1", "2", "4"],
    "2": ["2", "3", "5", "1"],
    "3": ["3", "6", "2"],
    "4": ["4", "1", "5", "7"],
    "5": ["5", "2", "6", "8", "4"],
    "6": ["6", "3", "9", "5"],
    "7": ["7", "4", "8"],
    "8": ["8", "5", "9", "0", "7"],
    "9": ["9", "6", "8"]
  };
  return ob
    .split("")
    .map(o => obj[o])
    .reduce((start, tail) => {
      if (!start) return tail;

      return start.reduce(
        (list, combination) => list.concat(tail.map(key => combination + key)),
        []
      );
    }, null);
}

function getPINs(observed) {
  var adjacent = [
    /* 0 */ [0, 8],
    /* 1 */ [1, 2, 4],
    /* 2 */ [1, 2, 3, 5],
    /* 3 */ [2, 3, 6],
    /* 4 */ [1, 4, 5, 7],
    /* 5 */ [2, 4, 5, 6, 8],
    /* 6 */ [3, 5, 6, 9],
    /* 7 */ [4, 7, 8],
    /* 8 */ [5, 7, 8, 9, 0],
    /* 9 */ [6, 8, 9]
  ];
  
  return observed
    .split('')
    .map(function(d) { return adjacent[d|0]; })
    .reduce(function(pa, da) {
      return da.reduce(function(pv, d) {
        return pv.concat(pa.map(function(p) {
          return '' + p + d;
        }));
      }, []);
    }, ['']);
}

function getPINs(observed) {
  var observed = observed.split('');
  var pins = [];
  var va = {
    0: ["0", "8"],
    1: ["1", "2", "4"],
    2: ["1", "2", "3", "5"],
    3: ["2", "3", "6"],
    4: ["1", "4", "5", "7"],
    5: ["2", "4", "5", "6", "8"],
    6: ["3", "5", "6", "9"],
    7: ["4", "7", "8"],
    8: ["0", "5", "7", "8", "9"],
    9: ["6", "8", "9"]
  };
  
  for (var i in observed) {
    var possible = va[observed[i]];
    pins.push(possible);
  }
  
  
  return pins.reduce(function(a, b) {
    var result = [];
    for (var x in a) {
      for (var y in b) {
        result.push(a[x]+b[y]);
      }
    }
    return result;
  });
}


function getPINs(observed) {
    var obj = {
        "0": ["0", "8"],
        "1": ["1", "2", "4"],
        "2": ["1", "2", "3", "5"],
        "3": ["2", "3", "6"],
        "4": ["1", "4", "5", "7"],
        "5": ["2", "4", "5", "6", "8"],
        "6": ["3", "5", "6", "9"],
        "7": ["4", "7", "8"],
        "8": ["0","5", "7", "8", "9"],
        "9": ["6", "8", "9"]
    };
    observed=observed.split('');
    var varMass = [];
    observed.forEach(function(elem){
        varMass.push(obj[elem]);
    });
    var variants=[];



    varMass[0].forEach(function (el0){

        if(varMass[1]!==undefined) {
            varMass[1].forEach(function (el1) {
                if (varMass[2] !== undefined) {
                    varMass[2].forEach(function (el2) {
                        if(varMass[3]!==undefined){
                            varMass[3].forEach(function(el3){
                                if(varMass[4]!==undefined){
                                    varMass[4].forEach(function(el4){
                                       if(varMass[5]!==undefined){
                                           varMass[5].forEach(function(el5){
                                               if(varMass[6]!==undefined){
                                                   varMass[6].forEach(function(el6){
                                                       if(varMass[7]!==undefined){
                                                           varMass[7].forEach(function(el7){
                                                               variants.push(el0 + el1 + el2 + el3 + el4 + el5 + el6 +el7);
                                                           })
                                                       }else {
                                                           variants.push(el0 + el1 + el2 + el3 + el4 + el5 + el6);
                                                       }
                                                   })
                                               }else {
                                                   variants.push(el0 + el1 + el2 + el3 + el4 + el5);
                                               }
                                           })
                                       } else {
                                           variants.push(el0 + el1 + el2 + el3+el4);
                                       }
                                    });
                                }else {
                                    variants.push(el0 + el1 + el2 + el3);
                                }
                            });
                        }else {
                            variants.push(el0+el1+el2);
                        }
                    });
                }else {
                    variants.push(el0+el1);
                }
            });
        }else {
            variants.push(el0)
        }
    });

    return variants;
}


function mixNMatch(add, addTo) {
  var out = [];
  add.forEach(function(v, i) {addTo.forEach(function(w, j) {out.push(v + w);});});
  return out;
}

function getPINs(observed) {
  var map = {1:['1','2','4'], 2:['1','2','3','5'], 3:['2','3','6'], 4:['1','4','5','7'], 5:['2','4','5','6','8'],
             6:['3','5','6','9'], 7:['4','7','8'], 8:['5','7','8','9','0'], 9:['6','8','9'], 0:['8','0']};
  return observed.length == 1 ? map[observed[0]] : mixNMatch(map[observed[0]], getPINs(observed.slice(1)));
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

const keypad = [
  [ '1', '2', '3' ],
  [ '4', '5', '6' ],
  [ '7', '8', '9' ],
  [null, '0', null]
]

const getCoordsForDigit = (digit) => {
  let x;
  
  const y = keypad.findIndex(candidateRow => {
    const candidateX = candidateRow.indexOf(digit);
    if (candidateX > -1) {
      x = candidateX;
      return true;
    }
  });
  
  return [x, y];
};

const getDigitForCoords = (x, y) => {
  const row = keypad[y]
  
  if (!row) { return null; }
  
  return row[x] || null;
};

const getSimilarDigits = (digit) => {
  const [x, y] = getCoordsForDigit(digit);
  
  return [
    digit,
    getDigitForCoords(x - 1, y),
    getDigitForCoords(x + 1, y),
    getDigitForCoords(x,     y - 1),
    getDigitForCoords(x,     y + 1)
  ]
    .filter(d => d !== null);
};

// http://stackoverflow.com/a/4331218/901944
const cartesian = (arr) => {
  if (arr.length == 1) { return arr[0]; }
  var result = [];
  var allCasesOfRest = cartesian(arr.slice(1));  // recur with the rest of array
  for (var i = 0; i < allCasesOfRest.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      result.push(arr[0][j] + allCasesOfRest[i]);
    }
  }
  return result;
}

function getPINs(observed) {
  const digits = observed.split('');
  const variations = digits.map(d => getSimilarDigits(d));
  return cartesian(variations);
}

var adj = [[0,8],
           [1,2,4],
           [2,1,3,5],
           [3,2,6],
           [4,1,5,7],
           [5,2,4,6,8],
           [6,3,5,9],
           [7,4,8],
           [8,0,5,7,9],
           [9,6,8]];
var getPINs = observed => adj[observed[0]]
  .map(x => observed.length == 1 ? [x.toString()] : getPINs(observed.slice(1)).map(y => x + y))
  .reduce((x,y) => x.concat(y));


  function getPINs(observed) {
  var keypad = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      null, '0', null
  ];
  var availables = observed.split('').map(function (observed) {
      var pos = keypad.indexOf(observed);
      var top = keypad[pos - 3];
      var left = (pos % 3 && keypad[pos - 1]);
      var right = (((pos + 1) % 3) && keypad[pos + 1]);
      var bottom = keypad[pos + 3];
      return [  left, top, observed, right, bottom].filter(Boolean);
  });
  return (function discovery(solution) {
      var concat = [].concat;
      var which = availables.shift();
      try {
          return concat.apply([], which.map(function (item) {
              solution.push(item);
              try {
                  return availables.length && concat.apply([], discovery(solution)) || solution.join('');
              } finally {
                  solution.pop();
              }
          }));
      } finally {
          availables.unshift(which);
      }
  })([]);

}

const CODE_PANEL = '123-456-789-x0x'.split`-`.map(row => [...row]);
const DIRECTIONS = [[0,1], [1,0], [0,-1], [-1,0]];

const getAdjacent = dgt => {
  const dgtY = CODE_PANEL.findIndex(row => row.includes(dgt));
  const dgtX = CODE_PANEL[dgtY].findIndex(col => col.includes(dgt));  
  return DIRECTIONS.map(([dX, dY]) => CODE_PANEL[dgtY + dY] && CODE_PANEL[dgtY + dY][dgtX + dX])
                   .filter(x => +x + 1);
}

const getPINs = observed => {
  const result = []; 
  
  const makeChain = (tail, chain = '') => {
    if (!tail) return result.push(chain); 
    const [first, ...rest] = [...tail];
    [...getAdjacent(first), first].forEach(str => makeChain(rest.join``, chain + str));
 }
 
  makeChain(observed);
  return result;
}

function getPINs(observed) {
  const pins = [];
  const substitutions = [
  ["8"],
  ["2","4"],
  ["1", "3", "5"],
  ["2", "6"],
  ["1", "5", "7"],
  ["2", "4", "6", "8"],
  ["3", "5", "9"],
  ["4", "8"],
  ["5", "7", "9", "0"],
  ["6", "8"]
  ];

  let newPin = observed;
  pins.push(newPin);
  
  let index = 0;
  
  for (const digit of observed) {
    const alternativeDigits = substitutions[digit];
    const currentBranch = [...pins];
    for (const currentPin of currentBranch) {
      const startSlice = currentPin.substring(0,index);
      const endSlice   = currentPin.substring(index+1);
      for(const alternativeDigit of alternativeDigits) {
        newPin = startSlice+alternativeDigit+endSlice;
        pins.push(newPin);
      }
    }
    index++;
  }
  

  return pins;
}

function getPINs(observed) {
	var keypad = new Keypad();
	return getPinsFromKeypad(observed, keypad);
}

function getPinsFromKeypad(observed, keypad) {
	if (!observed)
		return [];

	var pins = getPinsFromKeypad(observed.substr(1), keypad);
	var possibleKeys = keypad.possibleKeys[observed[0]];
	return !pins.length ? possibleKeys
		: possibleKeys.reduce(function (newPins, possibleKey) {
			pins.forEach(function (pin) {
				newPins.push(possibleKey + pin);
			});
			return newPins;
		}, []);
}

function Keypad()
{
	this.possibleKeys = [];
	this.possibleKeys["0"] = ["0", "8"];
	this.possibleKeys["1"] = ["1", "2", "4"];
	this.possibleKeys["2"] = ["1", "2", "3", "5"];
	this.possibleKeys["3"] = ["2", "3", "6"];
	this.possibleKeys["4"] = ["1", "4", "5", "7"];
	this.possibleKeys["5"] = ["2", "4", "5", "6", "8"];
	this.possibleKeys["6"] = ["3", "5", "6", "9"];
	this.possibleKeys["7"] = ["4", "7", "8"];
	this.possibleKeys["8"] = ["0", "5", "7", "8", "9"];
	this.possibleKeys["9"] = ["6", "8", "9"];
}

const getPINs = observed =>
  (arr => observed.length < 2 ? arr[observed] : arr[observed[0]].reduce((pre, val) => [...pre, ...getPINs(observed.slice(1)).reduce((pre, v) => [...pre, val + v], [])], []))
  ([[`0`, `8`], [`1`, `2`, `4`], [`1`, `2`, `3`, `5`], [`2`, `3`, `6`], [`1`, `4`, `5`, `7`], [`2`, `4`, `5`, `6`, `8`], [`3`, `5`, `6`, `9`], [`4`, `7`, `8`], [`5`, `7`, `8`, `9`, `0`], [`6`, `8`, `9`]]);


  function getPINs(observed) {
    const adjacentDigits = {
      '1': ['2', '4'],
      '2': ['1', '3', '5'],
      '3': ['2', '6'],
      '4': ['1', '5', '7'],
      '5': ['2', '4', '6', '8'],
      '6': ['3', '5', '9'],
      '7': ['4', '8'],
      '8': ['5', '7', '9', '0'],
      '9': ['6', '8'],
      '0': ['8']
    };
    const possibleDigits = {};
    Object.keys(adjacentDigits).forEach(digit => {
      possibleDigits[digit] = adjacentDigits[digit];
      possibleDigits[digit].push(digit);
    });
    
    const multiplyArrays = (A, B) => A.reduce(
      (abVariations, a) => abVariations.concat(B.map(b => a + b)),
      []
    );
    
    return observed.split('').slice(1)
      .reduce(
        (result, digit) => multiplyArrays(result, possibleDigits[digit]),
        possibleDigits[observed[0]]
      );
  }


  const R = require('ramda');

const corrections = {
  '1': '124',  '2': '1235',  '3': '236',
  '4': '1457', '5': '24568', '6': '3569',
  '7': '478',  '8': '57890', '9': '689',
               '0': '80',
};

const getPINs = R.pipe(
  R.traverse(R.of, R.flip(R.prop)(corrections)),
  R.map(R.join('')),
);

function Keypad(idx) {
  this.board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [undefined, 0, undefined],
  ];
  
  this.adj = function(idx) {
    idx = idx == 0 ? 10 : idx - 1;
    var r = parseInt(idx / 3), c = idx % 3;
    return [
      (this.board[r]   || [])[c], 
      (this.board[r-1] || [])[c],   (this.board[r+1] || [])[c],
      (this.board[r]   || [])[c-1], (this.board[r]   || [])[c+1]
    ].filter(function(v) { return v !== undefined; });
    
  }
}

function cart_prod(X, Y) {
  var out = [];
  for (var i in X) for (var j in Y) out.push(
    [].concat.apply([], [X[i], Y[j]])
  );
  return out;                     
}

function getPINs(observed) {
  var k = new Keypad();
  return observed.split('').map(function(pressed) {
    return k.adj(+pressed);
  }).reduce(function(acc, val) {
    return cart_prod(acc, val);
  }).map(function(a) {
    return a instanceof Array ? a.join('') : '' + a;
  }).sort();
}


const a = ['08', '124', '1235', '236', '1457', '24568', '3569', '478', '57890', '689'];
const getPINs = p = o => o.length ? p(o.slice(1)).reduce((r, c) => r.concat(a[o[0]].split('').map(x => x + c)), []) : [''];

const map = new Map()
  map.set('1', ['1','2','4']);
  map.set('2', ['1','2','3','5']);
  map.set('3', ['2','3','6']);
  map.set('4', ['1','4','5','7']);
  map.set('5', ['2','4','5','6','8']);
  map.set('6', ['3','5','6','9']);
  map.set('7', ['4','7','8']);
  map.set('8', ['0','5','7','8','9']);
  map.set('9', ['6','8','9']);
  map.set('0', ['0','8']);

function getPINs(str) {
  if(!str) return []

  const res = []
  const key = str[0]
  const toCheck = str.slice(1)
  const stringsToAdd = getPINs(toCheck)
  
  if(!stringsToAdd.length) return map.get(key);
  
  for(let digit of map.get(key)) {
      for(let item of stringsToAdd) {
        res.push(digit + item)
      }
  }
  
  return res
}

var neighbours = {
  "1":["1", "2", "4"],
  "2":["1", "2", "3", "5"],
  "3":["2", "3", "6"],
  "4":["1", "4", "5", "7"],
  "5":["2", "4", "5", "6", "8"],
  "6":["3", "5", "6", "9"],
  "7":["4", "7", "8"],
  "8":["0", "5", "7", "8", "9"],
  "9":["6", "8", "9"],
  "0":["0", "8"],
}
function getPINs(observed, prefix) {
  prefix = prefix || "";
  if (observed.length == 0) return prefix;
  else return neighbours[observed[0]].reduce(function(acc, d) { return acc.concat(getPINs(observed.substring(1), prefix + d))}, []);
}

function getPINs(observed) {
  // TODO: This is your job, detective!
  newArr = [];

  observed.split('').forEach((item) => {
    newArr.push(returnArr(item));
  });

  return createPass(newArr)
  
}

function concatSingle(a, b) {
  let newArr = [];

  b.forEach((item) => {
    let i;
    if (a) {
      i = "" + a + item;
    } else {
      i = "" + item;
    }

    newArr.push(i);
  });

  return newArr;
}

function concatData(a, b) {
  let data = [];

  if (a.length) {
    a.forEach((item) => {
      data = data.concat(concatSingle(item, b));
    });
  } else {
    data = data.concat(concatSingle(a, b));
  }
  return data;
}

function createPass(a) {
  let newArr = [];

  for (let i = 0; i < a.length; i++) {
    const item = a[i];

    newArr = newArr.concat(concatData(newArr, item));
  }
  return newArr.filter((i) => i.length == a.length);
}

function returnArr(params) {
  switch (params) {
    case "1":
      return [1, 4, 2];
    case "2":
      return [1, 2, 3, 5];
    case "3":
      return [2, 3, 6];
    case "4":
      return [1, 4, 7, 5];
    case "5":
      return [4, 5, 6, 8, 2];
    case "6":
      return [9, 6, 3, 5];
    case "7":
      return [4, 7, 8];
    case "8":
      return [7, 8, 9, 5, 0];
    case "9":
      return [8, 9, 6];
    case "0":
      return [ 8, 0];
  }
}

function getPINs(observed) {
  const pin = observed.split('')
  const vars = {
    1: ['1', '2', '4'],
    2: ['1', '2', '3', '5'],
    3: ['2', '3', '6'],
    4: ['1', '4', '5', '7'],
    5: ['2', '4', '5', '6', '8'],
    6: ['3', '5', '6', '9'],
    7: ['4', '7', '8' ],
    8: ['5', '7', '8', '9', '0'],
    9: ['6', '8', '9'],
    0: ['0', '8']
  }
  if (pin.length === 1) {
    return vars[pin]
  }
  const pinRes = vars[pin[0]]
  const result = pinRes.reduce(
    (acc, rec) => {
      return [...acc, getPINs(observed.slice(1)).map(it => `${rec}${it}`)]
    }, []
  )
  return result.join().split(',')
}

function getPINs(observed) {
  var array = [];
  array[0] = observed.split('');
  var temp = PIN(array,array[0].length);
  return temp.map(function(x){return x.join('')});
}

function PIN(array,index){
  var m = [[8], [2, 4], [1, 3, 5], [2, 6], [1, 5, 7], [4, 2, 6, 8], [3, 5, 9], [4, 8], [7, 5, 9, 0], [8, 6]];
  var temp = [];
  var copy = [];
  temp = array.slice();
  index = index - 1;
  for(var  i = 0; i < array.length;i++ ){
      copy = array[i].slice();
      var p = m[copy[index]].length;
      var c = copy[index];
      console.log(copy,index,copy[index]);
      for(var j = 0; j < p;j++){
          copy[index] = m[c][j];
          temp.push(copy.slice());
          }
  }
  return index? PIN(temp,index):temp;
}

function combineMap([head, ...[headTail, ...tailTail]]) {
  if (!headTail) return head

  const combined = headTail.reduce((acc, x) => {
      return acc.concat(head.map(h => `${h}${x}`))
  }, [])

  return combineMap([combined, ...tailTail])
}

function getPINs(observed) {
  const map = {
      1: [1, 2, 4],
      2: [1, 2, 3, 5],
      3: [2, 3, 6],
      4: [1, 4, 5, 7],
      5: [2, 4, 5, 6, 8],
      6: [3, 5, 6, 9],
      7: [4, 7, 8],
      8: [5, 7, 8, 9, 0],
      9: [6, 8, 9],
      0: [8, 0],
  };

  return combineMap(String(observed).split("").map(el => map[el].map(value => String(value))));
}

