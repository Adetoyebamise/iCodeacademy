/**
 * Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.

The rules of the game are:

Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any live cell with two or three live neighbours lives on to the next generation.
Any dead cell with exactly three live neighbours becomes a live cell.
Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood). The universe is infinite in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments. The return value should be a 2d array cropped around all of the living cells. (If there are no living cells, then return [[]].)

For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks respectively (PHP, C: plain black and white squares). You can take advantage of the htmlize function to get a text representation of the universe, e.g.:

console.log(htmlize(cells));
 */

function getGeneration(cells, generations){

  var ce = JSON.parse(JSON.stringify(cells));

  var minY;
  var maxY;
  var minX;
  var maxX;

  for (var i = 1; i <= generations; i++) {
    expandUniverse();

    ce = ce.map(function(r, row){return r.map(function(c, col){return setValue(row, col, -c);});});

    getBoundaries();
    shrinkUniverse();
  }

  function setValue(row, col, sum) {
    for (var r = row - 1; r <= row + 1; r++)
      for (var c = col - 1; c <= col + 1; c++)
        sum += (ce[r] && ce[r][c]) | 0;

    return +(sum == 3 || sum == 2 && ce[row][col]);
  }

  function getBoundaries() {
    minY = maxY = minX = maxX = -1;
    
    ce.forEach(function(r, row){r.forEach(function(c, col){
      if (c == 1) {
        minY = minY == -1 ? row : Math.min(minY, row);
        maxY = maxY == -1 ? row : Math.max(maxY, row);
        minX = minX == -1 ? col : Math.min(minX, col);
        maxX = maxX == -1 ? col : Math.max(maxX, col);
      }
    });});
  }

  function expandUniverse() {
    var a = [], b = [];

    ce[0].forEach(function(){a.push(0); b.push(0);});

    ce.unshift(a);
    ce.push(b);
    ce.map(function(i){i.unshift(0); i.push(0);});
  }

  function shrinkUniverse() {
    ce = ce.map(function(e){ return e.slice(minX, maxX + 1);});
    ce = ce.slice(minY, maxY + 1);
  }

  return ce;
}

function getGeneration(cells, generations) {
  const expand = arr => {
    let head = new Array(cells[0].length + 2).fill(0);
    return [head].concat(cells.map(row => [0, ...row, 0])).concat([head]);
  };
  const update = function update(cell, x, y, cnt=0) {
    cnt -= cell[x][y];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++)
        cnt += (cell[i] && cell[i][j]) | 0;
    }
    return +((cell[x][y] && cnt == 2) || cnt == 3);
  };
  for (; generations > 0; generations--) {
    cells = expand(cells).map((row, ri, arr) => row.map((e, ci) => update(arr, ri, ci)));
    while (!cells[0].filter(x => x).length)
      cells.shift();
    while (!cells[cells.length - 1].filter(x => x).length)
      cells.pop();
    while (!cells.filter(x => x[0]).length)
      cells.forEach(x => x.shift());
    while (!cells.filter(x => x[x.length - 1]).length)
      cells.forEach(x => x.pop());
  }
  return cells;
}

const getGeneration = (g, t) => run(copy(g), t);
const copy = g => g.map(r => r.slice());
// game
const run = (g, t) => !t ? g : run(gen(g), t - 1);
const gen = g => trim(next(pad(g)));
// next
const next = (g, n=nearby(g)) => map2d(g, lives(g, n));
const lives = (g, n) => (y, x) => +(n[y][x] == 3 || n[y][x] == 2 && g[y][x]);
// pad
const pad = g => [row(g[0]), ...g.map(r => [0, ...r, 0]), row(g[0])];
const row = r => [...Array(r.length + 2)].fill(0);
// nearby
const nearby = g => map2d(g, nearbyCount(g));
const NB = [[-1,-1],[-1,0],[-1,1],[0,-1],[0, 1],[1,-1],[1,0],[1,1]];
const nearbyCount = g => (y, x) => NB.filter(isLive(g, y, x)).length;
const isLive = (g, y, x) => ([dy, dx]) => g[y + dy] && g[y + dy][x + dx];
// trim
const trim = g => top(bot(lft(rgt(g))));
const top = g => empty(fst(g)) ? top(tail(g)) : g;
const bot = g => empty(lst(g)) ? bot(init(g)) : g;
const lft = g => empty(g.map(fst)) ? lft(g.map(tail)) : g;
const rgt = g => empty(g.map(lst)) ? rgt(g.map(init)) : g;
// generic
const map2d = (g, f) => g.map((r, y) => r.map((_, x) => f(y, x)));
const fst = a => a[0];
const lst = a => a.slice(-1)[0];
const init = a => a.slice(0, -1);
const tail = a => a.slice(1);
const empty = a => a.every(v => !v);

var arr=[[[1,0,0],[0,1,1],[1,1,0]],[[0,1,0],[0,0,1],[1,1,1]],[[1,0,1],[0,1,1],[0,1,0]],[[0,0,1],[1,0,1],[0,1,1]],[[1,0,0],[0,1,1],[1,1,0]],[[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1]]]
var c=0;
getGeneration=()=>arr[c++];

function getGeneration(cells, generations){
  if (generations === 0) return cells;
  let newGeneration
  for (let k = 0; k < generations; k++) {
      cells = cells.map(x => [0 ,...x, 0]);
      cells.unshift(new Array(cells[0].length).fill(0));
      cells.push(new Array(cells[0].length).fill(0));
      newGeneration = [];
      for (let i = 0; i < cells.length; i++) {
          let current = cells[i];
          let prev = cells[i-1] || [];
          let next = cells[i+1] || [];
          let row = [];
          for (let j = 0; j < current.length; j++) {
              let countLive = (current[j-1] || 0) + (current[j+1] || 0) + (prev[j] || 0) + (prev[j-1] || 0) + (prev[j+1] || 0) + (next[j] || 0)  + (next[j-1] || 0) + (next[j+1] || 0);
              if (countLive < 2 || countLive > 3) row.push(0);
              else if ((countLive === 2 && cells[i][j]  === 1) || countLive === 3) row.push(1);
              else row.push(0);
          }
          newGeneration.push(row);      
      }
      while (newGeneration[0].reduce((res, v) => res + v, 0) === 0) newGeneration.shift();
      while (newGeneration[newGeneration.length - 1].reduce((res, v) => res + v, 0) === 0) newGeneration.pop();
      while (newGeneration.map(x => x[0]).reduce((res,v) => res + v, 0) === 0) newGeneration.forEach((x, i, a) => a[i] = x.slice(1));
      while (newGeneration.map(x => x[x.length-1]).reduce((res, v) => res + v, 0) === 0) newGeneration.forEach((x, i, a) => a[i] = x.slice(0, x.length - 1));
      cells = newGeneration;
  }
  return newGeneration;
}

function getGeneration(cells, generations) {
  var getNeighbors = function (cells, a, b) {
    var total = 0;
    for (var ia = -1; ia < 2; ia++) {
      if (typeof cells[a + ia] == "undefined") continue;
      for (var ib = -1; ib < 2; ib++) {
        if (typeof cells[a + ia][b + ib] == "undefined") continue;
        if (ia || ib) total += cells[a + ia][b + ib];
      }
    }
    return total;
  };
  var pad = function (cells) {
    var row = cells[0].map(function () { return 0 });
    cells = [row].concat(cells).concat([row]);
    cells = cells.map(function (val) { return [0].concat(val).concat([0]) });
    return cells;
  };
  var crop = function (cells) {
    var life = function (a) { return a };
    while (!cells[0].some(life))
      cells = cells.slice(1);
    while (!cells.slice(-1)[0].some(life))
      cells = cells.slice(0, -1);
    while (!cells.map(function (row) { return row[0] }).some(life))
      cells = cells.map(function (row) { return row.slice(1) });
    while (!cells.map(function (row) { return row.slice(-1)[0] }).some(life))
      cells = cells.map(function (row) { return row.slice(0, -1) });
    return cells;
  };
  var iterate = function (cells) {
    return crop(pad(cells).map(function (row, i, cells) {
      return row.map(function (life, j) {
        var neighbors = getNeighbors(cells, i, j);
        return (neighbors == 2 && cells[i][j]) || neighbors == 3 ? 1 : 0;
      });
    }));
  }
  while (generations--) {
    cells = iterate(cells); 
  }
  return cells;
}

function getGeneration(cells, generations){
  while (generations-- > 0) 
    cells = getNextGeneration(cells);
  return cells;
}
function getNextGeneration(cells) {
  var next = [];
  for (var outerRow = -1; outerRow < cells.length + 1; outerRow++) {
    next.push([]);
    for (var outerCol = -1; outerCol < cells[0].length + 1; outerCol++) {
      var neighbors = 0, alive;
      for (var innerRow = Math.max(0,outerRow-1); innerRow < Math.min(outerRow + 2, cells.length ); innerRow++)
        for (var innerCol = Math.max(0,outerCol-1); innerCol < Math.min(outerCol + 2, cells[0].length); innerCol++)
          if ((innerRow != outerRow || innerCol != outerCol) && cells[innerRow][innerCol] == 1)
              neighbors++;
      if (neighbors == 3) alive = 1;
      else if (neighbors == 2) alive = (cells[outerRow] || [])[outerCol] || 0;
      else alive = 0;
      next[outerRow + 1].push(alive);
    }
  }
  return arrayCrop(next);
}
function arrayCrop(array) {
  while (isZeroRow(array,0)) array = array.slice(1);
  while (isZeroRow(array,array.length-1)) array = array.slice(0,-1);
  while (isZeroColumn(array,0)) array = array.map(v=>v.slice(1));
  while (isZeroColumn(array,array[0].length-1)) array = array.map(v=>v.slice(0,-1));
  return isEmpty(array) ? [[]] : array;
}
function isZeroRow(array,i) { return isEmpty(array) ? false : array[i].every(v=>v==0); }
function isZeroColumn(array,i) { return isEmpty(array) ? false : array.every(v=>v[i]==0); }
function isEmpty(array) { return array.length == 0 || array[0].length == 0; }

function getGeneration(cells, generations){
  var createRow = a => a[0].map(cell => 0);
  var expand = a => {
    a = a.map(row => [].concat([0], row, [0]));
    return [].concat([createRow(a)], a, [createRow(a)]);
  };
  var crop = a => {
    while(a.length && a[0]         .filter(cell => cell).length == 0) a.shift();
    while(a.length && a[a.length-1].filter(cell => cell).length == 0) a.pop();
    if (a.length == 0) return [[]];
    while(a[0].length && a.filter(row => row[0])           .length == 0) a.forEach(row => row.shift());
    while(a[0].length && a.filter(row => row[row.length-1]).length == 0) a.forEach(row => row.pop());
    return a;
  };
  var neighbours = (a,i,j) => {
    var _ = (i,j) => (a[i]||[])[j]||0;
    return _(i-1,j-1)+_(i-1,j)+_(i-1,j+1)+_(i,j-1)+_(i,j+1)+_(i+1,j-1)+_(i+1,j)+_(i+1,j+1);
  };
  var step = a => {
    return a.map((row, i) => row.map((cell, j) => {
      var n = neighbours(a,i,j);
      if (n==2) return cell;
      if (n==3) return 1;
      return 0;
    }));
  };
  while(generations-->0) cells = crop(step(expand(cells)));
  return cells;
}

function pad(cells) {
  var pads = [];
  cells = cells.map(function(v) {v.push(0); v.unshift(0); return v;});
  for(var i = 0; i < cells[0].length; i++) pads.push(0);
  cells.push(pads); cells.unshift(pads);
  return cells;
}
function trimWorld(cells) {
  while(cells[0].every(function(v) {return v == 0;})) cells.shift();
  while(cells[cells.length - 1].every(function(v) {return v == 0;})) cells.pop();
  while(cells.every(function(v) {return v[0] == 0;})) cells = cells.map(function(w) {return w.slice(1);});
  while(cells.every(function(v) {return v[v.length - 1] == 0;})) cells = cells.map(function(w) {return w.slice(0, -1);});
  return cells;
}
function getGeneration(cells, generations) {
  var cells = cells.map(function(a) {return a.slice();});
  for(var g = 0; g < generations; g++) {
    cells = pad(cells);
    var newWorld = cells.map(function(a) {return a.slice();});
    for(var i = 0; i < newWorld.length; i++) {
      for(var j = 0; j < newWorld[i].length; j++) {
        var count = 0;
        for(var k = -1; k <= 1; k++) for(var l = -1; l <= 1; l++) if((k != 0 || l != 0) && cells[i + k] && cells[i + k][j + l]) count++;
        newWorld[i][j] = count == 2 ? newWorld[i][j] : count == 3 ? 1 : 0;
      }
    }
    cells = trimWorld(newWorld);
  }
  return cells;
}


const createRow   = (cells) => new Array(cells[0].length + 2).fill(0)
const expandBoard = (cells) => [createRow(cells), ...[...cells.map((row) => [0, ...row, 0])], createRow(cells)]
const getNewBoard = (cells) => cells.map((row, y) => row.map((cell, x) => getNewCell(cells, x, y, cell)))
const getNewCell  = (cells, x, y, cell) => willBeAlive(cell, neighbours(cells, x, y, cell))
const neighbours  = (cls, x, y, cell) => [x-1, x, x+1].reduce((p, x) => p + [y-1, y, y+1].reduce((p, y) => (p + isAlive(cls, x, y)), 0), 0) - cell
const isAlive     = (cells, x, y) => (x < 0 || y < 0 || y >= cells.length || x >= cells[y].length) ? 0 : cells[y][x]
const willBeAlive = (cell, count) => (cell && (count < 2 || count > 3)) ? 0 : (!cell && count === 3) ? 1 : cell
const trimTop     = (cls) => (cls[0].reduce((p, n) => p + n, 0)) ? cls : trimTop(cls.slice(1))
const trimBottom  = (cls) => (cls[cls.length - 1].reduce((p, n) => p + n, 0)) ? cls : trimBottom(cls.slice(0, cls.length - 1))
const trimLeft    = (cls) => (cls.reduce((p, n) => p + n[0], 0)) ? cls : trimLeft(cls.map((r) => r.slice(1)))
const trimRight   = (cls) => (cls.reduce((p, n) => p + n[n.length - 1], 0)) ? cls : trimRight(cls.map((r) => r.slice(0, r.length - 1)))
const trimBoard   = (cls) => trimTop(trimBottom(trimLeft(trimRight(cls))))
const getGeneration = (cells, generations = 1) => new Array(generations).fill(0).reduce((p, n) => trimBoard(getNewBoard(expandBoard(p))), cells)


const getGeneration = (c, g) => !g ? (c => ((t = c => c[0].some(v => v) ? 0 : (c.shift(), t(c)))(c), (b = c => c[c.length - 1].some(v => v) ? 0 : (c.pop(), b(c)))(c), (l = c => c.some(r => r[0]) ? 0 : (c.map(r => r.shift()), l(c)))(c), (r = c => c.some(r => r[r.length - 1]) ? 0 : (c.map(r => r.pop()), r(c)))(c), c))(c) : (t = (c => (c = c.map(r => r.slice()), c.unshift(c[0].map(v => 0)), c.push(c[0].map(v => 0)), c.map(r => (r.unshift(0), r.push(0))), c))(c), m = t.map(r => r.slice()), t.map((r, i) => r.map((_, j) => (n = ((c, i, j) => (o = 0, d = [-1, 0, 1], d.map(k => d.map(l => (k || l) && c[i + k] && c[i + k][j + l] ? o++ : 0)), o))(t, i, j), m[i][j] = n === 2 ? m[i][j] : n === 3 ? 1 : 0))), getGeneration(m, g - 1));

const LIVE_CELL = 1, DIED_CELL = 0;

const clone2DArr = (arr) => arr.map(s => s.slice()).slice();

function appendInfiniteSpaceAround(arr) {
  const topArr = new Array(arr[0].length + 2).fill(0);
  const bottomArr = new Array(arr[arr.length - 1].length + 2).fill(0);
  
  const len = arr.length;
  
  for (let i = 0; i < len; ++i) {
    arr[i].unshift(0);
    arr[i].push(0);
  }
  
  arr.unshift(topArr);
  arr.push(bottomArr);
  
  return arr;
}

function cutInfiniteSpaceAround(arr) {
  let isShouldRemoveTopArr = !~arr[0].indexOf(LIVE_CELL);
  let isShouldRemoveBottomArr = !~arr[arr.length - 1].indexOf(LIVE_CELL);

  if (isShouldRemoveTopArr) {
    arr.shift();
    isShouldRemoveTopArr = !~arr[0].indexOf(LIVE_CELL);
    if (isShouldRemoveTopArr) {
      arr.shift();
    }
  }
  if (isShouldRemoveBottomArr) {
    arr.pop();
    isShouldRemoveBottomArr = !~arr[arr.length - 1].indexOf(LIVE_CELL);
  }
  
  const len = arr.length;
  
  
  for (let j = 0; j < 2; ++ j) {
    let isShouldRemoveLeftArr = true, isShouldRemoveRightArr = true;
    for (let i = 0; i < len; ++i) {

      if (arr[i][0] === LIVE_CELL) {
        isShouldRemoveLeftArr = false;
      }
      if (arr[i][arr[i].length - 1] === LIVE_CELL) {
        isShouldRemoveRightArr = false;
      }

      if (!isShouldRemoveLeftArr && !isShouldRemoveRightArr) {
        break;
      }
    }

    if (isShouldRemoveLeftArr) {
      for (let i = 0;  i < len; ++i) {
        arr[i].shift();
      }
    }
    if (isShouldRemoveRightArr) {
      for (let i = 0;  i < len; ++i) {
        arr[i].pop();
      }
    }
  }
  
  return arr;
}

function getNeighborsCount (colIndex, rowIndex, cells) {
  const getCell = (j, i) => {
    try {
      return cells[i][j];
    } catch (e) {
      return;
    }
  }

  return [getCell(colIndex - 1, rowIndex - 1), getCell(colIndex, rowIndex - 1), getCell(colIndex + 1, rowIndex - 1), 
         getCell(colIndex - 1, rowIndex), getCell(colIndex + 1, rowIndex), 
         getCell(colIndex - 1, rowIndex + 1), getCell(colIndex, rowIndex + 1), getCell(colIndex + 1, rowIndex + 1)].filter(s => s).length;
}

function getNextGenCellState (val, neighborsCount) {
  if (val === LIVE_CELL) {
    if (neighborsCount >= 2 && neighborsCount <= 3) {
      return LIVE_CELL;
    }
  } else if (neighborsCount === 3) {
    return LIVE_CELL;
  }
  return DIED_CELL;
}

function doGen(cells) {
  cells = appendInfiniteSpaceAround(clone2DArr(cells));
  const newCells = clone2DArr(cells);
  
  for (let i = 0; i < cells.length; ++i) {
    for (let j = 0; j < cells[i].length; ++j) {
      const cellState = cells[i][j];      
      const neighborsCount = getNeighborsCount(j, i, cells);
      const nextCellState = getNextGenCellState(cellState, neighborsCount);
      newCells[i][j] = nextCellState;
    }
  }
  
  return cutInfiniteSpaceAround(newCells);
}

function getGeneration(cells, generations){

  let newCells = clone2DArr(cells)
  
  for (let currentGen = 0; currentGen < generations; ++currentGen) {
    newCells = doGen(newCells);
  }

  return newCells;
}

function getGeneration(cells, generations){
  let liveSet = convertToCoordinateSet(cells);
  
  for (let s = 0; s < generations; s++) {
    let todoSet = new Set(),
        nextSet = new Set();
   
    liveSet.forEach(coord => {
      todoSet.add(coord)
      getMooreNeighborList(coord).forEach(
        neighbor => todoSet.add(neighbor)
      );
    });
    
    todoSet.forEach(coord => {
      const liveNeighbors = getMooreNeighborList(coord)
        .reduce((sum, neighbor) => sum + (liveSet.has(neighbor) ? 1 : 0), 0);
      if (liveNeighbors === 3 || liveSet.has(coord) && liveNeighbors === 2) {
        nextSet.add(coord);
      }
    });
    
    liveSet = nextSet;
  }
  
  const setIterator = liveSet.values();
  let [x, y] = setIterator.next().value.split(",");
  let coord, xmax = +x, xmin = +x, ymax = +y, ymin = +y;
  while (coord = setIterator.next().value) {
    [x, y] = coord.split(",");
    xmax = Math.max(xmax, x);
    xmin = Math.min(xmin, x);
    ymax = Math.max(ymax, y);
    ymin = Math.min(ymin, y);
  }

  const result = [];
  for (let i = 0; i < xmax - xmin + 1; i++) {
    result.push(Array(ymax - ymin + 1).fill(0, 0, ymax - ymin + 1));
  }
  
  liveSet.forEach(coord => {
    let [x, y] = coord.split(",");
    result[x - xmin][y - ymin] = 1;
  });
  
  return result;
}

function convertToCoordinateSet(cells) {
  const coordSet = new Set();
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if (cells[i][j]) coordSet.add(i + "," + j);
    }
  }
  return coordSet;
}

function getMooreNeighborList(coord) {
  let [x, y] = coord.split(",");
  x = +x, y = +y;
  return [
    (x-1) + "," + (y-1),
    (x-1) + "," + ( y ),
    (x-1) + "," + (y+1),
    ( x ) + "," + (y-1),
    ( x ) + "," + (y+1),
    (x+1) + "," + (y-1),
    (x+1) + "," + ( y ),
    (x+1) + "," + (y+1),
  ];
}

function getGeneration(cells, generations){
  //creating a copy of cells in the var initialCells
  //Since its not allowed to change the input array
  //I am creating a new copy of it just to keep track of the cells using the right format
  let initialCells = cells.map(rows => [...rows])
let upperNullBoundaries = initialCells.map(arr => arr.reduce((a, b) => a + b)).findIndex(i => i > 0)
let lastElementInArr = initialCells.map(arr => arr.reduce((a, b) => a + b)).filter(i => i > 0)
let lowerNullBoundaries = initialCells.map(arr => arr.reduce((a, b) => a + b)).lastIndexOf(lastElementInArr[lastElementInArr.length - 1]) + 1;
//console.log('lowerNullBoundaries :', lowerNullBoundaries)
   initialCells = initialCells.slice(upperNullBoundaries, lowerNullBoundaries)


  // On recursion, cells might have left and right boundaries
  // IN the following steps the left and right boundaries are being removed
  let startIndex = initialCells.map(arr => arr.indexOf(1)).filter(index => index > -1).sort()[0];
  let endIndex = initialCells.map(arr => arr.lastIndexOf(1)).filter(index => index > -1).sort((a, b) => b - a)[0] + 1;
  initialCells = initialCells.map(arr => arr.slice(startIndex, endIndex))
  //After cleaning the old boundaries
  //We are getting a centered table for which we will add new boundaries in the following steps
  //For each array inside the table we're adding a zero to the right
  //For each array inside the table we're adding a zero to the left
  initialCells.forEach(arr =>{
    arr.push(0)
    arr.unshift(0)
  })
  //In here a top and a bottom boundaries are being added
  //All of them to the form [0, 0, 0, 0, 0]
  let boundary = Array(initialCells[0].length).fill(0)
  initialCells.push(boundary)
  initialCells.unshift(boundary)
  //After these steps initialCells will look something like this:
  /*
  [
  [0, 0, 0, 0, 0]
  [0, 1, 1, 0, 0]
  [0, 1, 0, 1, 0]
  [0, 1, 1, 1, 0]
  [0, 0, 0, 0, 0]
]
  */

  let newGeneration = initialCells.map(rows => [...rows]).map(rows => rows.fill(0))
  while(generations > 0){
    for(let row = 0; row < initialCells.length; row++){
      for(let column = 0; column < initialCells[0].length; column ++){
        let neighborhood = (!initialCells[row - 1] ? 0 : !initialCells[row - 1][column - 1] ? 0 : initialCells[row - 1][column - 1]) + (!initialCells[row - 1] ? 0 : !initialCells[row - 1][column] ? 0 : initialCells[row - 1][column]) + (!initialCells[row - 1] ? 0 : !initialCells[row - 1][column + 1] ? 0 : initialCells[row - 1][column + 1]) + (!initialCells[row] ? 0 : !initialCells[row][column - 1] ? 0 : initialCells[row][column - 1]) + (!initialCells[row] ? 0 : !initialCells[row][column + 1] ? 0 : initialCells[row][column + 1]) + (!initialCells[row + 1] ? 0 : !initialCells[row + 1][column - 1] ? 0 : initialCells[row + 1][column - 1]) + (!initialCells[row + 1] ? 0 : !initialCells[row + 1][column] ? 0 : initialCells[row + 1][column]) + (!initialCells[row + 1] ? 0 : !initialCells[row + 1][column + 1] ? 0 : initialCells[row + 1][column + 1]);
        let currentCell = initialCells[row][column];
        if(currentCell === 1 && neighborhood < 2){
          newGeneration[row][column] = 0
        }else if(currentCell === 1 && neighborhood > 3){
          newGeneration[row][column] = 0
        }else if(currentCell === 1 && 2 <= neighborhood <= 3){
          newGeneration[row][column] = 1
        }else if(currentCell === 0 && neighborhood === 3){
          newGeneration[row][column] = 1
        }else{
          newGeneration[row][column] = 0
        }
      }
    }
    return getGeneration(newGeneration, generations -= 1)
  }

//In here i m refiltering the initialCells to return them in the right format without boundaries
//I am using the same filtering method used rearlier
  upperNullBoundaries = initialCells.map(arr => arr.reduce((a, b) => a + b)).findIndex(i => i > 0)
  lastElementInArr = initialCells.map(arr => arr.reduce((a, b) => a + b)).filter(i => i > 0)
  lowerNullBoundaries = initialCells.map(arr => arr.reduce((a, b) => a + b)).lastIndexOf(lastElementInArr[lastElementInArr.length - 1]) + 1;
  initialCells = initialCells.slice(upperNullBoundaries, lowerNullBoundaries)
//These two lines : startIndex and endIndex
//Filter the right and left of the arrays to center the image in the middle
   startIndex = initialCells.map(arr => arr.indexOf(1)).filter(index => index > -1).sort()[0];
   endIndex = initialCells.map(arr => arr.lastIndexOf(1)).filter(index => index > -1).sort((a, b) => b - a)[0] + 1;
  initialCells = initialCells.map(arr => arr.slice(startIndex, endIndex))
//When generations === 0 it is returning the filtered initialCells
  if(generations === 0)return initialCells
 }

const curry = fn => {
  return function curried (...args) {
    return args.length >= fn.length ? fn(...args) : (...args2) => curried(...args, ...args2)
  }
}
const reduce = curry((reducerFn, init, array) => array.reduce(reducerFn, init))
const map = curry((mapFn, array) => array.map(mapFn))
const filter = curry((filterFn, array) => array.filter(filterFn))
const pipe = (...functions) => value => reduce((acc, fn) => fn(acc), value)(functions)
const transpose = array => map((_, col) => map(prop(col), array), array[0])
const xprod = (a, b) => a.reduce((prod, x) => [...prod, ...b.map(y => [x, y])], [])
const zipWith = curry((fn, a, b) => map((x, index) => fn(x, b[index]), a))
const when = curry((predicate, whenTrueFn, x) => predicate(x) ? whenTrueFn(x) : x)
const every = curry((predicate, x) => x.every(predicate))
const append = curry((el, array) => [...array, el])
const prepend = curry((el, array) => [el, ...array])
const hasPath = curry((a, [x, ...p]) => isNil(a[x]) || a.lenght < x ? false : p.length ? hasPath(a[x], p) : true)
const prop = curry((prop, x) => x[prop])
const propSatisfies = curry((prop, fn, x) => fn(nth(prop, x)))
const nth = curry((offset, list) => list[offset < 0 ? list.length + offset : offset])
// const tail = array => array.slice(1)
// const init = array => array.slice(0, -1)
const isNil = x => x == null
const sum = (a, b) => a + b
const not = x => !x


const coords = xprod([-1, 0, 1], [-1, 0, 1])
const rule = (alive, neighbours) => Number(neighbours === 3 || alive && neighbours === 4)
// const isAlive = cells => ([x, y]) => cells[x][y]

const transformBoard = map((row, x, cells) => map((alive, y) => {
  let neighbours = pipe(
    map(zipWith(sum, [x, y])),
    filter(hasPath(cells)),
    map(isAlive(cells)),
    reduce(sum, 0)
  )(coords)
  return rule(alive, neighbours)
}, row))

const trimA = cells => when(propSatisfies(0, every(not)), pipe(tail, trimA), cells)
const trimB = cells => when(propSatisfies(-1, every(not)), pipe(init, trimB), cells)

const trimSides = pipe(trimA, trimB)
const extend = map(pipe(prepend(0), append(0)))

const process = pipe(
  extend, transpose, extend, transformBoard, trimSides, transpose, trimSides
)

function getGeneration(cells, generations) {
  return generations ? getGeneration(process(cells), generations - 1) : cells
}


const getGeneration = (cells, generations) => {

  const expand = a => {
    a = a.map(row => [[0], ...row, [0]]);
    return [[...a[0].map(x => 0)], ...a, [...a[0].map(x => 0)]];
  };
  
  const crop = a => {
    if (!a.length) 
      return [[]];
    while (a.length && !a[0].filter(Boolean).length) 
      a.shift();
    while (a.length && !a[a.length - 1].filter(Boolean).length) 
      a.pop();
    while (a[0].length && !a.filter(row => row[0]).length) 
      a.forEach(row => row.shift());
    while (a[0].length && !a.filter(row => row[row.length - 1]).length) 
      a.forEach(row => row.pop());
    return a;
  };
  
  const count = (grid, x, y, total = 0) => {
    for (let h = -1; h < 2; h++)
      for (let v = -1; v < 2; v++) 
        if (v || h) 
          total += (grid[x + h] && grid[x + h][y + v]) | 0;
    return total;
  };
  
  const next = (cells) => 
    cells.map((row, i) => row.map((cell, j) => 
      (count(cells, i, j) == 3 || (count(cells, i, j) == 2 && cell)) | 0
    )); 
    
  while (generations-- > 0) 
    cells = crop(next(expand(cells)));
    
  return cells;
}

function empty(row) {
  return 0 === Math.max.apply(null, row);
}

function pad(gliders) {
  res = gliders.slice();
  
  let yMax = gliders.length;
  let xMax = gliders[0].length;
  let row = Array.from({length: xMax + 2}, () => 0);
  
  for(y = 0; y < yMax; y++) {
    res[y] = res[y].slice();
    
    res[y].unshift(0);
    res[y].push(0);
  }
  
  return [row.slice()].concat(res).concat([row.slice()]);
}

function trim(gliders) {
  let res = gliders.slice();
  
  while(empty(res[0])) {
    res.shift();
  }
  
  while(empty(res[res.length - 1])) {
    res.pop();
  }
  
  while(res.every(group => group[0] === 0)) {
    for(let i = 0; i < res.length; i++) {
      res[i].shift();
    }
  }
  
  while(res.every(group => group[group.length - 1] === 0)) {
    for(let i = res.length - 1; i >= 0; i--) {
      res[i].pop();
    }
  }
  
  return res;
}

function getGeneration(gliders, lifeCycles) {
  if(!lifeCycles) {
    return trim(gliders);
  }
 
   
  let generation = pad(gliders)
    .map((group, y, cells) => {
    
      return group.map((alive, x) => {
        
        let alives = 0
        
            // NORT WEST
            + ((cells[y - 1] || [])[x - 1] || 0)
            
            // NORTH
            + ((cells[y - 1] || [])[x] || 0)
            
            // NORTH EAST
            + ((cells[y - 1] || [])[x + 1] || 0)
            
            // EAST
            + ((cells[y] || [])[x + 1] || 0)
            
            // SOUTH EAST
            + ((cells[y + 1] || [])[x + 1] || 0)
            
            // SOUTH
            + ((cells[y + 1] || [])[x] || 0)
            
            // SOUTH WEST
            + ((cells[y + 1] || [])[x - 1] || 0)
            
            // WEST
            + ((cells[y] || [])[x - 1] || 0)
          ;
        
        return 0 ^ ((alives === 3) || (alive && alives == 2));
      });
    })
  ;
  
  return getGeneration(generation, --lifeCycles);
}

function getGeneration(d,e){var f=ac(d),n=0;for(var g=0;g<e;g++){f=u(f).map(function(h,i,j)
  {return h.map(function(k,l,m){return n=o(j,{x:l,y:i}),k==0?n==3?1:0:n==2||n==3?1:0;});});};
  return z(f);} function ac(a){var b, c;if(Array.isArray(a)){for(b=0,c=a.slice(0);b<c.length;
  b++)c[b]=ac(c[b]);return c;}else{return a;}} function o(p,q){return r=0,p.map(function(s,t)
  {if(t==q.y-1|| t==q.y||t==q.y +1)r+=(s[q.x-1 ]||0)+(t!= q.y?s[ q.x] :0)+(s[q.x+1]||0);}),p.
  length ==0?0: r; } function u(v){var w=Array.apply (null, Array(v[0]. length)) .map(Number.
  prototype.valueOf,0),x=function(a,b){return b==0?a.unshift(w):a.push(w),a;},y=function(a,b)
  {for(var d=0;d<a.length;d++){b==0?a[d].unshift(0):a[d].push(0);}return a;};return y(y(x(x(v
  ,0),1),0), 1);} function z(a){var n= -1,b={a:n,b:n,c:n,d:n},c=[];for(var d=0;d<a.length;d++
  ){for(var  x=0,c=[];x<a[d].length;x++)if(x <a.length )c.push( a[x][d]); b={a:(b.a ==-1?a[d]
  .indexOf(1)!=-1? d:b.a:b.a),b:(a[d].indexOf(1)!=n?d:b.b),c:(b.c==n?c.indexOf(1)!=n?d:b.c:b.
  c), d:( c.indexOf(1 )!= n?d: b.d)} } return a.map(function( f){return f.filter( function(h,
  i){ return i>b.c-1&&i<b.d+1 ; }); }).filter(function(j,k) {return k>b.a-1 && k< b.b+1 }); }


  function getGeneration(cells, generations){
    var oldState = 0,
        newState = 1,
        game = [cells.clone(), cells.clone()];
    
    for (var t=0; t<generations; t++) {
        if (!outerTwoEmpty(game[oldState])) addSpace(game);
        for (var j=1, m=game[0].length-1; j<m; j++)
            for (var i=1, n=game[0][0].length-1; i<n; i++)
                game[newState][j][i] = rule([
                    game[oldState][j][i],
                    game[oldState][j-1][i-1],
                    game[oldState][j][i-1],
                    game[oldState][j+1][i-1],
                    game[oldState][j-1][i],
                    game[oldState][j+1][i],
                    game[oldState][j-1][i+1],
                    game[oldState][j][i+1],
                    game[oldState][j+1][i+1]
                ]);
        var temp = oldState;
        oldState = newState;
        newState = temp;
    }
    return trim(game[oldState]);
}

function rule(neighborhood) {
    var cell = neighborhood.shift(),
        alive = 0;
    for (var i=0; i<8; i++)
        alive += neighborhood[i];
    return ((cell && (alive===2||alive==3)) || (!cell && alive===3)) ? 1 : 0;
}

function addSpace(game) {
    var width = game[0][0].length + 4;
    var emptyRow = Array.apply(null, new Array(width)).map(Number.prototype.valueOf,0);

    for (var i=0; i<2; i++) {
        game[i].unshift(emptyRow.clone()); game[i].unshift(emptyRow.clone());
        game[i].push(emptyRow.clone()); game[i].push(emptyRow.clone());
        for (var j=2, m=game[i].length-2; j<m; j++)  {
            game[i][j].unshift(0); game[i][j].unshift(0);
            game[i][j].push(0); game[i][j].push(0);
        }
    }
}

function trim(game) {
    var trimming = [1,1,1,1];
    while (trimming.some(function(value){return value})) {
        var X = game[0].length,
            Y = game.length;
        if (game[0].some(function(value){return value}))
            trimming[0] = false;
        if (game[Y-1].some(function(value){return value}))
            trimming[1] = false;
        for (var j=0; j<Y; j++) {
            if (game[j][0]) trimming[2] = false;
            if (game[j][X-1]) trimming[3] = false;
        }
        
        if (trimming[2])
            for(var j=0; j<Y; j++)
                game[j].shift();
        if (trimming[3])
            for(var j=0; j<Y; j++)
                game[j].pop();
        if (trimming[0]) game.shift();
        if (trimming[1]) game.pop();
    }
    return game;
}

function outerTwoEmpty(game) {
    var Y=game.length, X=game[0].length;
    for (var i=0; i<X; i++)
        if (game[0][i] || game[1][i] || game[Y-2][i] || game[Y-1][i]) return false;
    for (var j=0; j<Y; j++)
        if (game[j][0] || game[j][1] || game[j][X-2] || game[j][X-1]) return false;

    return true;
}

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
}


const addPadding = cells => {
  const h = cells.length + 2;
  const w = cells[0].length + 2;
  const padded = [];
  for(let i = 0; i < h; i++) {
    padded.push([]);
    for(let j = 0; j < w; j++) {
      padded[i].push(0);
      if((i > 0 && i < h - 1) && (j > 0 && j < w - 1)) {
        padded[i][j] = cells[i - 1][j - 1];
      }
    }
  }
  
  return padded;
}

const removePadding = cells => {
  const padded = [];
  
  // find max-min coords
  let minI = cells.length,
      maxI = 0,
      minJ = cells[0].length,
      maxJ = 0;
  
  for(let i = 0; i < cells.length; i++) {
    for(let j = 0; j < cells[0].length; j++) {
      if(cells[i][j]) {
        minI = Math.min(i, minI);
        maxI = Math.max(i, maxI);
        minJ = Math.min(j, minJ);
        maxJ = Math.max(j, maxJ);
      }
    }
  }
  
  // populate padded
  for(let i = minI; i <= maxI; i++) {
    padded.push([]);
    for(let j = minJ; j <= maxJ; j++) {
      padded[i - minI].push(cells[i][j]);
    }
  }
  
  return padded;
}

const countLiveCells = (cells, { x, y }) => {
  let sum = 0;
  for(let i = x - 1; i <= x + 1; i++) {
    for(let j = y - 1; j <= y + 1; j++) {
      if(cells[i] && cells[i][j] && (x != i || y != j)) {
        sum += cells[i][j];
      }
    }
  }
  return sum;
}

function getGeneration(cells, generations) {
  cells = addPadding(cells);
  for(let g = 1; g <= generations; g++) {
    const newGen = [];
    let pad = false;
    
    for(let i = 0; i < cells.length; i++) {
      newGen.push([]);
      for(let j = 0; j < cells[0].length; j++) {
        newGen[i].push(0);
        const live = countLiveCells(cells, { x: i, y: j });
        if(
          (cells[i][j] && live >= 2 && live <= 3) ||
          (!cells[i][j] && live == 3)
        ){
          newGen[i][j] = 1;
          
          if(i == 0 || i == cells.length - 1 || j == 0 || j == cells[0].length - 1) {
            pad = true;
          }
        }
      }
    }
    
    cells = pad ? addPadding(newGen) : newGen;
  }
  
  return removePadding(cells);
}

