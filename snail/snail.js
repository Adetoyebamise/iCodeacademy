/**
 * Snail Sort
Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
This image will illustrate things more clearly:

image here: Annotation 2023-08-04 182235
NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as en empty array inside an array [[]].
 */

function snail(array) {
  var vector = [];
  while (array.length) {
    vector.push(...array.shift());
    array.map(row => vector.push(row.pop()));
    array.reverse().map(row => row.reverse());
  }
  return vector;
}

snail = function(array) {
  var result;
  while (array.length) {
    // Steal the first row.
    result = (result ? result.concat(array.shift()) : array.shift());
    // Steal the right items.
    for (var i = 0; i < array.length; i++)
      result.push(array[i].pop());
    // Steal the bottom row.
    result = result.concat((array.pop() || []).reverse());
    // Steal the left items.
    for (var i = array.length - 1; i >= 0; i--)
      result.push(array[i].shift());
  }
  return result;
}

snail = function(array) {
  var size = array.length;
  
  if (size == 0)
    return [];

  if (size == 1)
    return array[0];
  
  var top    = array[0].slice(0, -1);
  var right  = array.slice(0, -1).map(a => a[size - 1]);
  var bottom = array[size -1].slice(1).reverse();
  var left   = array.slice(1).map(a => a[0]).reverse();
  var inner  = array.slice(1, -1).map(a => a.slice(1, -1));

  return [].concat(top, right, bottom, left, snail(inner));
}

const snail = function(array) {
  const list = [];

  while(array.length) {
    list.push(...array.shift(), ...array.map(row => row.pop()));
    
     array.reverse().map(row => row.reverse());
  }

  return list;
}

snail = function(array) {
  var maxx = array[0].length,
    maxy = maxx,
    minx = -1, miny = 0,
    x = 0, y = 0,
    result = [], dir = "r";
  
  for(var i = maxx*maxx;i>0;i--){
    result.push(array[y][x]);
    switch (dir){
      case "u": y--; break;
      case "l": x--; break;
      case "d": y++; break;
      case "r": x++; break;
    }
    if(x==maxx-1 && y==miny){ dir="d"; minx++; }
    else if(x==maxx-1 && y==maxy-1){ dir="l"; miny++;  }
    else if(x==minx && y==maxy-1){ dir="u"; maxx--; }
    else if(x==minx && y==miny){ dir="r"; maxy--; }
  }  
  return result;
}

function snail(array) {	
	var results = [];
	
	while(array.length > 0) {
		results = results.concat(array.shift());
		
		array.forEach(function (current) {
			results.push(current.pop());
		});
		
		array.forEach(function (current) {
			current.reverse();
		});
		
		array.reverse();
	}
	
	return results;
}

snail = function(arr) {
  var result = [];
  var top = 0, bottom = arr.length-1;
  var left = 0, right = arr[0].length-1;
  
  do {
    for (var i = left; i <= right; i++){result.push(arr[top][i])} // top row
    for (var i = top+1; i <= bottom; i++){result.push(arr[i][right])} // right column
    for (var i = right-1; i >= left; i--){result.push(arr[bottom][i])} // bottom row
    for (var i = bottom-1; i > top; i--){result.push(arr[i][left])} // left column
    top++; bottom--; left++; right--;
  } while (top <= bottom);
  
  return result;
}

/*## Snail Sort

 Given an `n x n` array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

 ```
 array = [[1,2,3],
 [4,5,6],
 [7,8,9]]
 snail(array) #=> [1,2,3,6,9,8,7,4,5]
 ```

 For better understanding, please follow the numbers of the next array consecutively:

 ```
 array = [[1,2,3],
 [8,9,4],
 [7,6,5]]
 snail(array) #=> [1,2,3,4,5,6,7,8,9]
 ```

 This image will illustrate things more clearly:

 <img src="http://www.haan.lu/files/2513/8347/2456/snail.png" />

 NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.*/
/**/
var snail = function (array) {
  var rotations = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];

  var currentRotation = 0;
  var seen = {};
  var result = [];

  var startx = 0;
  var starty = 0;

  while (Object.keys(seen).length < (array.length * (array[0] || []).length)) {
      console.log("enter : " + Object.keys(seen).length + " - " + (array.length * array.length));

      result = result.concat(array[startx][starty]);
      seen[startx + "-" + starty] = true;

      var rotation = rotations[currentRotation];
      var nextx = startx + rotation.x, nexty = starty + rotation.y;
      if (seen[nextx + "-" + nexty] || nextx >= array.length || nexty >= array.length || nextx < 0 || nexty < 0) {
          currentRotation = (currentRotation + 1) % 4;
          rotation = rotations[currentRotation];
      }

      startx += rotation.x;
      starty += rotation.y;
  }

  return result;
};

snail = function(array) {
  var res = [];
  while(array.length) {
    res = res.concat(array.shift())
    array = expand(array);
  }
  return res;
}


function expand(matrix){
    return matrix.reduce(function(res, arr, i){
        arr.forEach(function(n, j){
            if (!res[j]) res[j] = [];
            res[j][i] = n;
        })
        return res;
    }, []).reverse();
}snail = function(array) {
  var result = array[0].slice();
  var times = array.length;
  var i=0, j=times-1, step=1,  c=0;
  
  while (times>0) {
	  times-=1;
	  for(c=0;c<times;c++) {
		i+=step;
		result.push(array[i][j])
	  }
	  step*=-1;
	  for(c=0;c<times;c++) {
		j+=step;
		result.push(array[i][j])
	  }
  }
  return result
}

function snail(m) {
  if (m.length === 1) return m[0];
  let transpose = m => m[0].map((_, i) => m.map(r => r[i])), rotate = m => transpose(m).reverse();
  return m[0].concat(snail(rotate(m.slice(1))));
}

snail = function(array) {
  var answer = [];
  for (var size = array.length, i = 0, j = 0; size > 0; size -= 2, ++j) {
      for (var k = 0; k < size - 1; ++k, ++j) answer.push(array[i][j]);
      for (var k = 0; k < size - 1; ++k, ++i) answer.push(array[i][j]);
      for (var k = 0; k < size - 1; ++k, --j) answer.push(array[i][j]);
      for (var k = 0; k < size - 2; ++k, --i) answer.push(array[i][j]);
      if (array[i][j])                        answer.push(array[i][j]);
  }
  return answer;
}

snail = function(array) {
  const result = [];
  while (array.length) {
    result.push(...array.shift());
    if (array.length) {
      array.forEach(subArr => {
        result.push(subArr.pop());
        subArr.reverse();
      })
      array.reverse()
    }
  }
  
  return result
}

const rotate = arr => arr.length ? arr[0].map((_, i) => arr.map((_, j) => arr[j][i])) : [];
const snail = arr => arr.length ? [...arr[0], ...snail(rotate(arr.slice(1)).reverse())] : [];

snail = function(array) {

  // count the cells to know when to stop:
  var cells = 0;
  array.forEach(function(row){ row.forEach(function(cell){ cells += 1; }) });
  var result = [];
  
  var collection = new VisitedCollection();
  var grid = new Grid(array, collection);
  
  for(var i = 0;i<cells;i++)
  {
     result.push(grid.fetchInstruction());
     grid.moveInstructionPointer();
  }

  return result;
}

var VisitedCollection = function()
{
  this.visited = []; // array holding positions of visited cells
  
  /*
    Mark a cell as visited
    
    @param integer x - X coord
    @param integer y - Y coord
    @return void
  */
  this.markVisited = function(x, y)
  {
    this.visited.push({x: x, y: y});
  }
  
  /*
    Check if cell was visited
    
    @param integer x - X coord
    @param integer y - Y coord
    @return boolean
  */
  this.wasVisited = function(x, y)
  {
    for(var i = 0;i<this.visited.length;i++)
    {
      if(this.visited[i].x == x && this.visited[i].y == y)
      {
        return true;
      }
    }
    
    return false;
  }
}

/*
  Grid abstraction.
  Reused from my Befunge solution.
*/
function Grid(array, collection) {

  // holds the parsed grid
  this.grid = [];
  
  // holds the VisitedCollection object reference
  this.collection = collection;
  
  // holds the instruction pointers( 2 dimensional )
  this.instructionPointerX = 0;
  this.instructionPointerY = 0;

  // defines the current direction of movement over the grid
  // default setting is to the right
  this.movesRight = true;
  this.movesDown = false;
  this.movesLeft = false;
  this.movesUp = false;
  
  this.resetDirections = function()
  {
    this.movesRight = false;
    this.movesDown = false;
    this.movesLeft = false;
    this.movesUp = false;   
  }
  
  this.processDirections = function()
  {
    // decide which direction to go based on
    // the shape of the board
    // and which cells were already visited
    // utilize VisitedCollection reference
    if(this.nextCellNull() || this.nextAlreadyVisited())
    {
      if(this.movesRight)
      {
        this.resetDirections();
        this.movesDown = true;
      }
      else if(this.movesDown)
      {
        this.resetDirections();
        this.movesLeft = true;
      }
      else if(this.movesLeft)
      {
        this.resetDirections();
        this.movesUp = true;
      }
      else if(this.movesUp)
      {
        this.resetDirections();
        this.movesRight = true;
      }
      
    }
  }
  
  /*
    Checks whether the next fetched cell
    will be null ( doesn't exist ).
    
    @return bool
  */
  this.nextCellNull = function()
  {
    var x = this.instructionPointerX;
    var y = this.instructionPointerY;
    
    if(this.movesRight)
    {
      x += 1;
    }
    
    if(this.movesDown)
    {
      y += 1;
    }
    
    if(this.movesLeft)
    {
      x -= 1;
    }
    
    if(this.movesUp)
    {
      y -= 1;
    }
    
    return this.grid[y] == null || this.grid[y][x] == null;
  }
  
  /*
    Checks whether the next fetched cell
    was already visited.
    
    @return bool
  */
  this.nextAlreadyVisited = function()
  {
    var x = this.instructionPointerX;
    var y = this.instructionPointerY;
    
    if(this.movesRight)
    {
      x += 1;
    }
    
    if(this.movesDown)
    {
      y += 1;
    }
    
    if(this.movesLeft)
    {
      x -= 1;
    }
    
    if(this.movesUp)
    {
      y -= 1;
    }
    
    return this.collection.wasVisited(x, y);
  }
  
  this.moveInstructionPointer = function()
  {
    this.processDirections(); // decide which direction to go
    console.log('Moves right: ' +this.movesRight);
    console.log('Moves down: ' +this.movesDown);
    if(this.movesRight)
    {
      // increment the second index by one
      this.instructionPointerX += 1;
    }
    if(this.movesDown)
    {
      // increment the first index by one
      this.instructionPointerY += 1;
    }
    if(this.movesLeft)
    {
      // decrement the second index by one
      this.instructionPointerX -= 1;
    }
    if(this.movesUp)
    {
      // decrement the first index by one
      this.instructionPointerY -= 1;
    }
  }
  
  this.fetchInstruction = function()
  {
    if(this.movesRight)
    {
      // mark the cell visited
      this.collection.markVisited(this.instructionPointerX, this.instructionPointerY);
      // return the instruction
      return this.grid[this.instructionPointerY][this.instructionPointerX];
    }
    if(this.movesDown)
    {
      // mark the cell visited
      this.collection.markVisited(this.instructionPointerX, this.instructionPointerY);
      // return the instruction
      return this.grid[this.instructionPointerY][this.instructionPointerX];
    }
    if(this.movesLeft)
    {
      // mark the cell visited
      this.collection.markVisited(this.instructionPointerX, this.instructionPointerY);
      // return the instruction
      return this.grid[this.instructionPointerY][this.instructionPointerX];
    }
    if(this.movesUp)
    {
      // mark the cell visited
      this.collection.markVisited(this.instructionPointerX, this.instructionPointerY);
      // return the instruction
      return this.grid[this.instructionPointerY][this.instructionPointerX];
    }
  }
  
  // parse the array into a grid
  this.parseInstructions = function(array)
  {
    var theGrid = [];
    // split the instructions into rows
    var rows = array;
    // and then rows into individual characters
    // set it to 2 dimensional array
    
    for(var i = 0;i<rows.length;i++)
    {
      theGrid[i] = [];
      var split = rows[i];
      for(var a = 0; a<split.length;a++)
      {
        theGrid[i].push(split[a]);
      }
    }
    
    this.grid = theGrid;
  }
  
  this.parseInstructions(array);
}

rotateLeft = function(array) {
  var result = [];
  while (array[0].length > 0) {
    result.push(array.map(function(item){
      return item.pop();
    }))
  }
  return result;
}

snail = function(array) {
  if (array.length === 0) { return [] }
  var head = array.shift();
  if (array.length === 0) {
    return head;
  } else {
    array = rotateLeft(array);
    return head.concat(snail(array));
  }
}

const bToT = arr => arr ? arr.map(v => v[0])
  .reverse().concat(snail(arr.map(v => v.slice(1)))) : [];

const rToL = arr => arr[arr.length - 1] ? arr[arr.length - 1]
  .reverse().concat(bToT(arr.slice(0, -1))) : [];

const tToB = arr => arr ? arr.map(v => v[v.length - 1])
  .concat(rToL(arr.map(v => v.slice(0, -1)))) : [];

const lToR = arr => arr[0] ? arr[0].concat(tToB(arr.slice(1))) : [];

const snail = arr => arr ? lToR(arr) : [];

snail = function(array) {
  if (array.length === 0) {
    return [];
  }
  
  return [
    ...array.shift(),
    ...array.map(_ => _.pop()),
    ...snail(array.reverse().map(line => line.reverse()))
  ];
  
}

snail = function(arr)
{
    let snailArr = []; let i = 0; let j = 0; let k = 0; let c = 0;

    while(k < arr[0].length * arr.length)
    {
        //right
        for ( ; j < arr[0].length - c; j++, k++)
            snailArr[k] = arr[i][j];

        //down
        for (i++, j-- ; i <= j; i++, k++)
            snailArr[k] = arr[i][j];

        //left
        for (i--, j-- ; j >= c; j--, k++)
            snailArr[k] = arr[i][j];
	
        //top
        for (i--, j++ ; i > j; i--, k++)
            snailArr[k] = arr[i][j];

        i++; j++; c++;
    }
    return snailArr;
}

const snail = (array) => {
  const result = [];
  
  while (array.length) {
    result.push(...array.shift());
    array.forEach((it) => result.push(it.pop()));
    result.push(...(array.pop() || []).reverse());
    array.reduceRight((accum, curr) => accum.push(curr.shift()) && result, result);
  }
  
  return result;
};



const snail = array =>
  [...Array(array.length)].reduce(pre => (pre.push(...array.shift(), ...array.map(val => val.pop())), array.reverse().map(val => val.reverse()), pre), []);

  snail = function(array) {
    var snail = [];
    var direction = 0;
    var cycle = 0;
    var pointer = {x: 0, y: 0};
    
    for (var i = 0; i < array.length * array[0].length; i++) {
      snail.push( array[ pointer.y ][ pointer.x ] );
      
      // Turn by 90 degrees if a 'wall' is hit, additionally increment
      // cycle counter if necessary
      if(( direction == 0 && pointer.x == array   .length-1 - cycle )
      || ( direction == 1 && pointer.y == array[0].length-1 - cycle )
      || ( direction == 2 && pointer.x == cycle  )
      || ((direction == 3 && pointer.y == cycle+1) && ++cycle))
        direction = (direction + 1) % 4;
      
      // Moving the pointer depending on reading direction
      [ ()=>pointer.x++
      , ()=>pointer.y++
      , ()=>pointer.x--
      , ()=>pointer.y--
      ][ direction ]();
    }
    
    return snail;
  }

  snail = function(array) {
    var snail = [];
    var direction = 0;
    var cycle = 0;
    var pointer = {x: 0, y: 0};
    
    for (var i = 0; i < array.length * array[0].length; i++) {
      snail.push( array[ pointer.y ][ pointer.x ] );
      
      // Turn by 90 degrees if a 'wall' is hit, additionally increment
      // cycle counter if necessary
      if(( direction == 0 && pointer.x == array   .length-1 - cycle )
      || ( direction == 1 && pointer.y == array[0].length-1 - cycle )
      || ( direction == 2 && pointer.x == cycle  )
      || ((direction == 3 && pointer.y == cycle+1) && ++cycle))
        direction = (direction + 1) % 4;
      
      // Moving the pointer depending on reading direction
      [ ()=>pointer.x++
      , ()=>pointer.y++
      , ()=>pointer.x--
      , ()=>pointer.y--
      ][ direction ]();
    }
    
    return snail;
  }

  function recognizeDirection(number){
  
    var repeat = true
    
    while(repeat){ 
      switch(number){
          case 0:
            return "l->r"
          case 1:
            return "t->b"
          case 2:
            return "r->l"
          case 3:
            return "b->t"
      }
      number -= 4
    }
  }
  
  
  snail = function(array) {
   
     var result = [];
    
     if(array.length != 0 && array.length != 1){
    
      var up_row = 0
      var right_column = array.length
      var down_row = array.length
      var left_column = 0
      
      var iterations = array.length*2 - 1
      //iterations is the number of times we go from left to right, 
      //from right to bot... For example, for n = 3, we go left->right, up->bot, r->l, b->u, l->r
      //This makes 5 "moves", which is the value of array[0].length*2 - 1
      
      for(var i = 0; i < iterations; i++)
        
        if(recognizeDirection(i) == "l->r"){ //We are going from left to right in the array
          
          for(var y = left_column; y < right_column; y++){
            result.push(array[up_row][y])
          }
            
          up_row++;
        }else if(recognizeDirection(i) == "t->b"){ //We are going from top to bot in the array
          
          for(var y = up_row; y < down_row; y++)
            result.push(array[y][right_column - 1])
          
          
          right_column--;
        }else if(recognizeDirection(i) == "r->l"){ //We are going from right to left in the array
          
          for(var y = right_column - 1; y >= left_column; y--) 
            result.push(array[down_row - 1][y])
          
          down_row--;
        }else if(recognizeDirection(i) == "b->t"){ //We are going from bot to top in the array
          
          for(var y = down_row - 1; y >= up_row; y--)
            result.push(array[y][left_column])
        
          left_column++;
        }
          
     }else{
       return array[0]
     }
     return result
      
    
  }

  snail = function(array) {
    // Recursive solution strips off the outer layer
    // of the matrix until nothing is left.
  
    // base case
    if (array.length == 0 || array[0].length == 0) {
      return [];
    }
  
    var i, list = [];
    // top
    list = list.concat(array.shift());
    // right
    for (i = 0; i < array.length; i++) {
      list.push(array[i].pop());
    }
    // bottom
    if (array.length > 0) {
      list = list.concat(array.pop().reverse());
    }
    // left
    for (i = array.length - 1; i >= 0; i--) {
      list.push(array[i].shift());
    }
  
    return list.concat(snail(array));
  }

  snail = function(array) {
    var directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (var result = [], i = 2 * array[0].length, dir = 0, pos = [-1, 0]; i > 1; i--, dir = (dir + 1) % 4) {
      for (var l = 0, add = directions[dir]; l < Math.floor(i / 2); l++) {
        pos = [pos[0] + add[0], pos[1] + add[1]];
        result.push(array[pos[1]][pos[0]]);
      }
    }  
    return result; 
  }

  snail = function(array) {
    let result = []; // We create an array to push here numbers in a correct order
    
    while (array.length !== 0) { // We want to repeat the algorithm below until our array is empty
      
      for (let i = 0; i < array.length; i++) {  // Just iterate over the array
        if (i === 0) { // First, we just push 1st element of the array in the initially order
          result.push(...array[i]); // Don't forget to destructure or you will push an array, not numbers
        } else if (i !== array.length - 1) { // We check if the element is last. When it is we stop doing it
          result.push(array[i][array[i].length - 1]) // We push the last element of every element that isn't last
        } else { // Now variable i equals to array.length - 1, so it refers to the last element in array
          result.push(...array[i].reverse()) // We reverse the last element and push it in our result array
        }
      }
      
      // Here we delete elements that we've pushed to our result array, so we don't push it again
      array.splice(0, 1); // Just delete the first element of the array because we've pushed it entirely
      array.splice(array.length - 1, 1); // Delete the last element
      for (let i = 0; i < array.length; i++) { // We iterate over the array without first and last element
        array[i].splice(array[i].length - 1, 1); // And we just delete the last element of each element in the array
      }
      
      for (let i = array.length - 1; i >= 0; i--) { // Now we iterate over the array in the reversed order
        if (array.length === 1) { // We check if our array length is 1 
          result.push(...array[i]); // if it's so we just push the last element of the array
        } else if (i !== 0) { // If array has more than 1 element left, we check if our element isn't the first element
          result.push(array[i][0]); // And we push the first element of every element until it's the first element of the array
        }
      }
        
      // Then we clean our array from elements we've pushed to result again
      if (array.length === 1) { // We check if our array length was 1
        array.splice(0, 1); // if it was we just delete the last element of the array
      } else { // if our array length is more than 1
        for (let i = 1; i < array.length; i++) { // We iterate over all elements in the array except the first one
          array[i].splice(0, 1); // We delete every first element of every element in the array (except the first one)
        }
      }
      
    }
    
    return result; // And we return our array with numbers in snail order
  }


  function snail(array) {
    let result = [];
    let rowStart = 0;
    let rowEnd = array.length - 1;
    let colStart = 0;
    let colEnd = array[0].length - 1;
    while (rowStart <= rowEnd && colStart <= colEnd) {
        for (let i = colStart; i <= colEnd; i++) {
            result.push(array[rowStart][i]);
        }
        rowStart++;
        for (let i = rowStart; i <= rowEnd; i++) {
            result.push(array[i][colEnd]);
        }
        colEnd--;
        if (rowStart <= rowEnd) {
            for (let i = colEnd; i >= colStart; i--) {
                result.push(array[rowEnd][i]);
            }
            rowEnd--;
        }
        if (colStart <= colEnd) {
            for (let i = rowEnd; i >= rowStart; i--) {
                result.push(array[i][colStart]);
            }
            colStart++;
        }
    }
    return result;
}

snail = function(array, res = []) {
  if(array.length === 0) return res
  let last = []
  const newArr = array.map((i, index) => {
    if(index === 0) {
      res = [...res, ...i]
    }
    else if(index === array.length - 1) {
      const reverseArr = i.reverse()
      res = [...res, ...reverseArr, ...last]
    }
    else {
      res.push(i[i.length - 1])
      last.unshift(i[0])
      return i.splice(1, i.length - 2)
    }
  })
  return snail(newArr.filter(i => i !== undefined), res)
}

snail = function(array) {
  const result = [];
  const actionsCount = 4;
  
  for (let counter = 0; array.length > 0; counter++) {
    if (counter % actionsCount === 0) {
      result.push(...array.shift())
      continue;
    }
    if (counter % actionsCount === 1) {
      for (let i = 0; i < array.length - 1; i++) {
        const subArray = array[i];
        result.push(subArray.pop());
      }
      continue;
    }
    if (counter % actionsCount === 2) {
      result.push(...array.pop().reverse())
      continue;
    }
    if (counter % actionsCount === 3) {
      for (let i = array.length - 1; i > 0; i--) {
        const subArray = array[i];
        result.push(subArray.shift());
      }
    }
  }
  return result;
}

var snail = function(array) {

  const res = []

  // Flips array counter-clockwise, removing first row
  function flip() {
    const arr = array
    array = []
    for (let i = 0, colLen = arr[0].length; i < colLen; ++i) {
      array.push([])
      for (let j = 0, rowLen = arr.length - 1; j < rowLen; ++j)
        array[i].push(arr[j+1][colLen-i-1])
    }
  }

  // Push top row and rotate remaining rows
  while (array[0].length > 0) {
    array[0].forEach(el => res.push(el))
    flip()
  }
  
  return res
}

var ret;

snail = function (arr) {
  if ( !arr || (arr.length === 1 && arr[0].length === 0) ) {
    return [];
  }
  ret = [];
  destruct(arr, 0);
  return ret;
};

function destruct(arr, level) {
  var n = arr.length - level * 2,
      cur, i,
      len = arr.length;
  for (i = 0, cur = level; i < n; i++, cur++) {
    ret.push( arr[level][cur] );
  }
  for (i = 0, cur = level + 1; i < n - 1; i++, cur++) {
    ret.push( arr[cur][len - 1 - level] );
  }
  for (i = 0, cur = len - 2 - level; i < n - 1; i++, cur--) {
    ret.push( arr[len - 1 - level][cur] );
  }
  for (i = 0, cur = len - 2 - level; i < n - 2; i++, cur--) {
    ret.push( arr[cur][level] );  
  }
  if (n > 2) {
    destruct(arr, level + 1);
  }
}

snail = function(array) {
  const clockwise = [];
  
  const rows = array.length;
  const cols = array[0]?.length ?? 0;
  const expectedLength = rows * cols;
  
  let rowIndex;
  let rowsLowerLimit = 0;
  let rowsUpperLimit = rows - 1;
  
  let colIndex;
  let colsLowerLimit = 0;
  let colsUpperLimit = cols - 1;
  
  let direction = 1;
  
  while (clockwise.length < expectedLength) {
    if (direction > 0) {
      for (rowIndex = rowsLowerLimit; rowIndex <= rowsUpperLimit; ++rowIndex) {
        if (rowIndex > rowsLowerLimit) {
          clockwise.push(array[rowIndex][colsUpperLimit]);
        } else {
          for (colIndex = colsLowerLimit; colIndex <= colsUpperLimit; ++colIndex) {
            clockwise.push(array[rowIndex][colIndex]);
          }
        }
      }
      
      rowsLowerLimit = rowsLowerLimit + 1;
      colsUpperLimit = colsUpperLimit - 1;
    } else {
      for (rowIndex = rowsUpperLimit; rowIndex >= rowsLowerLimit; --rowIndex) {
        if (rowIndex < rowsUpperLimit) {
          clockwise.push(array[rowIndex][colsLowerLimit]);
        } else {
          for (colIndex = colsUpperLimit; colIndex >= colsLowerLimit; --colIndex) {
            clockwise.push(array[rowIndex][colIndex]);
          }
        }
      }
      
      rowsUpperLimit = rowsUpperLimit - 1;
      colsLowerLimit = colsLowerLimit + 1;
    }
       
    direction = -1 * direction;
  }
  
  return clockwise;
}

snail = function(array) {
  //Array that will hold our result 
  let result = [];
  
  while(array.length) {
    //Top: Push the first array to our result.
      //SHIFT removes the array from the argument.
    result.push(...array.shift())
    
    //Right: Grab the last char of each array and push to result; 
      //POP removes the last char of each array in the argument.
    for (let i = 0; i < array.length; i++) { result.push(array[i].pop()) }
    
    //Bottom: Reverse the last array or an empty arr and push to result.
      //POP removes the last array in the argument.
    result.push(...(array.pop() || []).reverse())
    
    //Left: Grab the last char of each array and push to result; Iterate in reverse to go from bottom to top.
      //SHIFT removes the first char of each array in the argument.
    for (let i = array.length - 1; i > 0; i--) { result.push(array[i].shift()) }
  }
  return result;
}

function snail(array) {
  let result = [];

  while (array.length > 0) {
    // Get elements of the top row
    result = result.concat(array.shift());

    // Get elements of the right column
    for (let i = 0; i < array.length; i++) {
      result.push(array[i].pop());
    }

    // Get elements of the bottom row (in reverse order)
    if (array.length > 0) {
      result = result.concat(array.pop().reverse());
    }

    // Get elements of the left column (in reverse order)
    for (let i = array.length - 1; i >= 0; i--) {
      result.push(array[i].shift());
    }
  }

  return result;
}

const snail = function(array) {
  if(array.length == 0 || array[0].length == 0) {
    return []
  }
  
  if(array.length == 1) {
    return array[0]
  }
  
  return [
    ...array[0],
    ...array.slice(1, -1).map(a => a[a.length-1]),
    ...array[array.length - 1].slice().reverse(),
    ...array.slice(1, -1).reverse().map(a => a[0]),
    ...snail(
      array.slice(1, -1).map(line => line.slice(1, -1))
    ),
  ]
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


class Snail {
  direction = 'right';
  x = 0;
  y = 0;

  matrix = [];
  result = [];

  constructor(matrix) {
    this.matrix = matrix;
  }
  
  getNextStepDirection(direction) {
    switch(direction) {
      case 'right':
        return 'down';
      case 'down':
        return 'left';
      case 'left':
        return 'top';
      case 'top':
        return 'right';
      default:
        throw new Error('Unknown direction!');
    }
  }
  
  getNextStepPosition(direction) {
    switch(direction) {
      case 'right':
        return new Position(this.x + 1, this.y);
      case 'down':
        return new Position(this.x, this.y + 1);
      case 'left':
        return new Position(this.x - 1, this.y);
      case 'top':
        return new Position(this.x, this.y - 1);
      default:
        throw new Error('Unknown direction!');
    }
  }
  
  canMove(initDirection, nextDirection) {
    if (initDirection === nextDirection) return false;
    
    const direction = nextDirection ? nextDirection : initDirection;
    const { x, y } = this.getNextStepPosition(direction);
    
    if(this.matrix[y] && this.matrix[y][x]) {
      this.direction = direction;
      this.x = x;
      this.y = y;
      return true;
    } else {
      return this.canMove(initDirection, this.getNextStepDirection(direction));
    }
  }
  
  move() {
    if (this.matrix[0][0] === undefined || !this.matrix || !this.matrix.length) {
      return this.result;
    }
    
    this.result.push(this.matrix[this.y][this.x]);
    this.matrix[this.y][this.x] = null;

    if (this.canMove(this.direction)) {
      return this.move();
    }

    return this.result;
  }
}

const snail = (matrix) => {
  const snail = new Snail(matrix);
  return snail.move();
}

snail = function(array) {
  let n = array[0].length
  if (n === 0){return []}
  if (n === 1){return array.flat()}
  let indexes = []
  let number = -1
  let loopCount = 0
  
  while(loopCount < n){
    for(let right = 0; right < (n - (2*loopCount)); right++){
      number++
      if(indexes.includes(number)){break}
      indexes.push(number)
      } 
    for(let down = 0; down < ((n-1)-(2*loopCount)); down++){
      number += n
      if(indexes.includes(number)){break}
      indexes.push(number)
      }
    for(let left = 0; left < ((n-1)-(2*loopCount)); left++){
      number--
      if(indexes.includes(number)){break}
      indexes.push(number)
      }
    for(let up = 0; up < ((n-2)-(2*loopCount)); up++){
      number -= n
      if(indexes.includes(number)){break}
      indexes.push(number)
      }
    loopCount++
  }
  return indexes.map(x => array.flat().at(x))
  }

  snail = arr => {
    let result = []
   
     while (arr.length) {
       result.push(...arr.shift())
       arr.forEach(item => result.push(item.pop()))
       arr.reverse().forEach(item => item.reverse())
     }
     
    return result
   }

   snail = function(arr) {
    let res = [];      
    if (arr.length <= 1) {        
        return arr[0];
    } else {
        for (let i = 0; i < arr[0].length; i++) {
            res.push(arr[0][i]);
        }
        arr.shift();
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i][arr[i].length-1]);
            arr[i].pop();
            arr[i].reverse();           
        }
        arr.reverse();
        return [...res, ...snail(arr)];
    }
}

const snail = matrix => {
  let result = [];
  let row = matrix.length;
  let col = matrix[0].length;
  let seen = [...new Array(row)].map(() => new Array(col).fill(0));
  let dr = [0, 1, 0, -1];
  let dc = [1, 0, -1, 0];
  let r = 0;
  let c = 0;
  let di = 0;
  for (let i = 0; i < row * col; i++) {
    result.push(matrix[r][c]);
    seen[r][c] = true;
    let cur_r = r + dr[di];
    let cur_c = c + dc[di];
    
    if (0 <= cur_r && cur_r < row && 0 <= cur_c && cur_c < col && !seen[cur_r][cur_c]) {
      r = cur_r;
      c = cur_c;
    } 
    else {
      di = (di + 1) % 4;
      r += dr[di];
      c += dc[di];
    }
  }
  return result;
}

const snail = (array) =>{
  const lastArray = []
  while(array.length){
    lastArray.push(...array.shift())
    for (var i = 0; i < array.length; i++){
      lastArray.push(array[i].pop())
    }
    lastArray.push(...(array.pop() || []).reverse())
    for (var i = array.length -1; i >= 0; i--){
      lastArray.push(array[i].shift())
    }
  }
  return lastArray
}

snail = function(array) {
  let n = array.length - 1;
  const loops = array.length

  let newArr = [];
  for (let count = 0; count<loops; count++) {
    //derecha
    for (let i = 0; i < n; i++) {
      newArr.push(array[0][0 + i]);
    }
    //abajo
    for (let i = 0; i < n; i++) {
      newArr.push(array[0 + i][n]);
    }
    //izquierda
    for (let i = 0; i < n; i++) {
      newArr.push(array[n][n - i]);
    }
    //arriba
    for (let i = 0; i < n; i++) {
      newArr.push(array[n - i][0]);
    }

    for (let i = 0; i < n; i++) {
      array[i + 1].shift();
    }
    for (let i = 0; i < n; i++) {
      array[n].shift();
    }
    for (let i = 0; i < n; i++) {
      array[n - 1 - i].pop();
    }
    for (let i = 0; i < n; i++) {
      array[0].shift();
    }
    array = array.filter((array) => array.length > 0);
    n = array.length - 1;

  }
  if (array.length > 0){
    newArr.push(...array[0])
  }
  
  return newArr;
}

function snail(matrix) {
  let result = [];
  if (matrix.length === 0) {
      return result;
  }
  let rowStart = 0, rowEnd = matrix.length - 1, colStart = 0, colEnd = matrix[0].length - 1;
  while (rowStart <= rowEnd && colStart <= colEnd) {
      // traverse right
      for (let i = colStart; i <= colEnd; i++) {
          result.push(matrix[rowStart][i]);
      }
      rowStart++;
      // traverse down
      for (let i = rowStart; i <= rowEnd; i++) {
          result.push(matrix[i][colEnd]);
      }
      colEnd--;
      // traverse left
      if (rowStart <= rowEnd) {
          for (let i = colEnd; i >= colStart; i--) {
              result.push(matrix[rowEnd][i]);
          }
          rowEnd--;
      }
      // traverse up
      if (colStart <= colEnd) {
          for (let i = rowEnd; i >= rowStart; i--) {
              result.push(matrix[i][colStart]);
          }
          colStart++;
      }
  }
  return result;
}

function snail(nxnArray){
	let n = nxnArray.length;
  let traversal = [];
  let nesting = 0;
  if (nxnArray[0].length === 0) {
  	return []
  }
  function traverse(n, nesting) {
    for (let i = nesting; i < n; i++) {
      traversal.push(nxnArray[nesting][i])
    }
    if (n > 1) {
      for (let i = 1 + nesting; i < n; i++) {
        traversal.push(nxnArray[i][n - 1])
      }
      for (let i = n - 2; i >= nesting; i--) {
        traversal.push(nxnArray[n - 1][i])
      }
      for (let i = n - 2; i > nesting; i--) {
        traversal.push(nxnArray[i][nesting])
      }
			traverse(n - 1, nesting + 1)
    }
  }
  traverse(n, nesting)
  return traversal;
}

function snail(arr){

  let result =[];

  for(let i=0; i<arr.length; i++){
      console.log(arr)
      result.push(arr.splice(i,1,[]));

      for(let j=0; j<arr.length; j++){
          result.push(arr[j].splice(-1,1));
      }
      for(let j=0; j<arr.length; j++){
      result.push(arr[arr.length-1].splice(-1));
      }
      arr.splice(-1);

      for(let j=arr.length-1; j>=0; j--){
          result.push(arr[j].splice(0,1));
      }
  } 
  result = result.flat(2);
  return result;   
} 

snail = function(arr) {
  var rs=arr.map(x=>x.slice()),i=0,j=0,d=[0,1],h=arr.length,w=arr[0].length,r=[]
  while(r.length<w*h){
    r.push(rs[i][j])
    rs[i][j]=null
    if(i+d[0]<0||i+d[0]>=h||j+d[1]<0||j+d[1]>=w||rs[i+d[0]][j+d[1]]===null)
      d=[d[0]?0:d[1],d[1]?0:-d[0]]
    i+=d[0],j+=d[1]
  }
  return r
}

snail = function(array) {
  let i=0
  let j=0
  let row=0
  let col=0
  let result=[""]
  let counter=0
  let dim=array.length
  //-------------------
  if(array.length==1){
    return array[0]
  }
function Right(row,col,dim){
  for(j=0;j<dim-1;j++){
    result[counter]=array[0][j]
    counter=counter+1
    }
  return result
}
  //--------------------------
  function Down(row,col,dim){
     for(i=0;i<dim-1;i++){
    result[counter]=array[i][dim-1]
    counter=counter+1
    }
  return result
  }
  //---------------------------
 
  function Left(row,col,dim){
    for(j=dim-1;j>0;j--){
    result[counter]=array[dim-1][j]
    counter=counter+1
    }
  return result 
  }
  //----------------------------
 
  function Up(row,col,dim){
    for(i=dim-1;i>0;i--){
    result[counter]=array[i][0]
    counter=counter+1
    }
  return result 
  }
  //--------------------------
  function sliceIt(array){
    array.pop()
    array.shift()
    let dim2=array.length
    for(i=0;i<dim2;i++){
       array[i].splice(0, 1);
       array[i].splice(dim-2, 1);
    }
  }
  //----------------------------
  
  function findSolution(){
    Right(i,j,dim)
    Down(i,j,dim)
    Left(i,j,dim)
    Up(i,j,dim)
   sliceIt(array)
    if(array.length==1)
      result[counter]=array[0][0]
    if(array.length==0)
      return result
    else{
      dim=array.length
      findSolution()
      }  
}

findSolution()
return result
  }

  snail = function(array) {
    const directArray = []
    const n = array.length;
    
    let borderRight = 0
    let borderDown = 0
    let borderLeft = 0
    let borderTop = 0
    
    let offsetRight = 0
    let offsetDown = 0
    let offsetLeft = 0
    let offsetTop = 0
    
    let direction = 'right'
    
    if (n === 1) {
      return array[0]
    }
    
    for (let i = 0; i < n * n; i++) {
      console.log(direction)
      switch (direction) {
        case 'right': 
          directArray.push(array[offsetTop][offsetLeft])
          if (offsetLeft === n - 1 - borderRight) {
            offsetTop += 1;
            direction = 'down';
            borderTop++;
          } else {
            offsetLeft += 1;
          }
          break;
        case 'down': 
          directArray.push(array[offsetTop][offsetLeft])
          if (offsetTop === n - 1 - borderDown) {
            offsetLeft -= 1;
            direction = 'left';
            borderRight++;
          } else {
            offsetTop += 1;
          }
          break;
  
        case 'left': 
          directArray.push(array[offsetTop][offsetLeft])
          if (offsetLeft === borderLeft) {
            offsetTop -= 1;
            direction = 'top';
            borderDown++;
          } else {
            offsetLeft -= 1;
          }
          break;
  
        case 'top':
          directArray.push(array[offsetTop][offsetLeft])
          if (offsetTop === borderTop) {
            offsetLeft += 1;
            direction = 'right';
            borderLeft++;
          } else {
            offsetTop -= 1;
          }
          break;
      }
    }
  
    return directArray
  }

  const snail = arr => {
    const result = [];
    
    while (arr.length) {
      result.push(...arr.shift());
      arr.map(el => result.push(el.pop()));
      arr.reverse().map(el => el.reverse());
    }
    
    return result;
  };

  function snail(array) {
    // enjoy
  
    const getKey = (e) => `${e.row}-${e.col}-${e.value}`;
    const flatted = array.flatMap((item, i) => {
      return item.map((e, idx) => ({ value: e, row: i, col: idx }));
    });
    if (!flatted.length) return [];
  
    const mapFlatted = new Map();
    flatted.forEach((e) => {
      mapFlatted.set(getKey(e), e);
    });
  
    let direction = "R";
    let location = {
      col: 0,
      row: 0,
    };
    let res = [];
  
    let handleDirection = (next, type = "row", isReverse = false) => {
      let data = [...mapFlatted.values()].filter(
        (e) => e[type] === location[type]
      );
      let opposite = type === "row" ? "col" : "row";
      if (isReverse) {
        data = data.reverse();
      }
      location[opposite] = data[data.length - 1][opposite];
      direction = next;
      data.forEach((e) => {
        res.push(e);
        mapFlatted.delete(getKey(e));
      });
    };
  
    while (res.length < flatted.length) {
      if (direction === "R") {
        handleDirection("D", "row");
        continue;
      }
      if (direction === "D"){
        handleDirection("L", "col");
        continue
      }
      if (direction === "L") {
        handleDirection("U", "row", true);
        continue
      }
      if (direction === "U") {
        handleDirection("R", "col", true);
        continue
      }
    }
  
    return res.map((e) => e.value);
  }

  snail = (array) => {
    let x = 0, y = 0, leftRigth = 0, downUp = 1, r = [];
    for (let i = 0; i < ((2 * array[0].length) - 1); i++) {
      const direction = i % 2;
      for (let e = 0; e < (array.length - (direction ? downUp : leftRigth)); e++) {
        if (i == 0 && e == 0) {
          r.push(array[x][y]);
          continue;
        }
        if(direction){
          Number.isInteger((i-direction) / 4) ? x++ : x--;
        }else{
          Number.isInteger(i / 4) ? y++ : y--;
        }
        r.push(array[x][y]);
      }
      direction ? downUp++ : leftRigth++;
    }
    return r;
  }

  function snail(array) {
    let result = []
    if (array.length > 0) {
      const xlength = array[0].length
      const ylength = array.length
      let total = xlength * ylength
      
  
      let y_decrement_limit = 0
      let x_decrement_limit = 0
      let xcounter = 0;
      let ycounter = 0;
  
      let increment = true;
      let iteratex = true;
  
      while (total > 0) {
        if (increment) {
          if (iteratex) {
            if (xcounter < xlength - x_decrement_limit) {
              result.push(array[ycounter][xcounter])
              total--
              xcounter++
            } else {
              iteratex = !iteratex
              xcounter--
              ycounter++
            }
          } else {
            if (ycounter < ylength - y_decrement_limit) {
              result.push(array[ycounter][xcounter])
              total--
              ycounter++
            } else {
              increment = !increment
              iteratex = !iteratex
              ycounter--
              xcounter--
              y_decrement_limit++
            }
          }
        } else {
          if (iteratex) {
            if (xcounter >= x_decrement_limit) {
              result.push(array[ycounter][xcounter])
              total--
              xcounter--
            } else {
                iteratex = !iteratex
                xcounter++
                ycounter--
                x_decrement_limit++
            }
          } else {
            if (ycounter >= y_decrement_limit) {
                result.push(array[ycounter][xcounter])
                total--
                ycounter--
            } else {
              increment = !increment
              iteratex = !iteratex
              ycounter++
              xcounter++
            }
          }
        }
      //  total-- 
      }
  
      return result
    }
    
    return array
  }

  snail = function(array) {
    // enjoy
    let sorted = []
    while (array.length > 0) {
      sorted.push(...array.shift())
      for (let i = 0; i < array.length; i++) {
        sorted.push(array[i].pop())
      }
      sorted.push(...(array.pop() || []).reverse())
      for (let i = array.length-1; i >= 0; i-- ) {
        sorted.push(array[i].shift())
      }
    }
    return sorted
  }

  const snail = (array) => {
    let i;
    let j;
    let n = array.length;
    let result = [];
  
    if (!array[0].length) return result;
  
    if (n === 1) return array[0];
  
    for (let loops = 0; loops < n - 1; loops++) {
      i = loops;
      j = loops;
  
      while (j <= n - 1 - loops) {
        result.push(array[i][j]);
        j++;
      }
  
      j--, i++;
  
      while (i <= n - 1 - loops) {
        result.push(array[i][j]);
        i++;
      }
  
      i--, j--;
  
      while (j >= loops) {
        result.push(array[i][j]);
        j--;
      }
  
      j++, i--;
  
      while (i >= loops + 1) {
        result.push(array[i][j]);
        i--;
      }
    }
  
    return result;
  };

  function snail(array) {
    return array.slice().reduce((result, row) => {
      result.push(...array.shift(), ...array.map(row => row.pop()));
      array.reverse().map(row => row.reverse());
      return result
    }, [])
  }

  function snail(array) {
    let result = [];
    while (array.length) {
      result = result.concat(array.shift());
      for (let i = 0; i < array.length; i++) {
        result.push(array[i].pop());
      }
      result = result.concat((array.pop() || []).reverse());
      for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i].shift());
      }
    }
    return result;
  }

  snail = function(array) {
    let resultArr = []
    
      if (array.length < 2) {
        return array[0]
      }
    
    if (array.length === 2) {
          resultArr.push(array[0][0])
      resultArr.push(array[0][1])
      resultArr.push(array[1][1])
      resultArr.push(array[1][0])
      return resultArr
    }
    console.log(resultArr)
    
    for (let i=0; i<array.length; i++) {
      resultArr.push(array[0][i])
    }
    console.log(resultArr)
    for (let i=1; i<array.length; i++) {
      resultArr.push(array[i][array.length-1])
    }
    console.log(resultArr)
    for (let i = array.length-2; i >= 0; i--) {
      resultArr.push(array[array.length-1][i])
    }
    console.log(resultArr)
    for (let i = array.length-2; i>0; i--) {
      resultArr.push(array[i][0])
    }
    
  
    
    if (array.length === 3) {
      resultArr.push(array[1][1])
      return resultArr
    }
    
    if (array.length === 4) {
      resultArr.push(array[1][1])
      resultArr.push(array[1][2])
      resultArr.push(array[2][2])
      resultArr.push(array[2][1])
      return resultArr
    }
    
    let secondArr = []
    
    for (let i = 1; i<array.length-1; i++) {
      let row = []
      for (let j =1; j<array.length-1; j++){
        row.push(array[i][j])
      }
      secondArr.push(row)
    }
    
  
    
    resultArr.push(snail(secondArr))
    let result=[].concat(...resultArr);
    return result
  }
  
  
  // first row, array[0][0->length]
  //last column, array[1>length][length-1]
  //last row reverse, array[length][length-2 -> 0]
  //first column in reverse, array[length-2 -> 1][0] 🐌🐌🐌🐌
  
  
   //[[1,2,3,4,5],
   //[8,9,4,5,6],
   //[7,6,5,7,8]
  //[1,2,3,4,5]
  //[1,2,3,4,5]]
  //
  //

  const snail = array => {
    let new_list = [];
    let loop = 0;
    let pos_x = 0;
    let pos_y = 0;
    let snail_length = 0;
    
    while(new_list.length != array.length * array[0].length) {
      for(let y = 0; y < array[pos_x].length - snail_length; y++){
        if(loop === 0){
          pos_y = y;
        } else if(loop % 2 === 0){
          pos_y = pos_y + 1;
        } else {
          pos_y = pos_y - 1;
        }
  
        new_list.push(array[pos_x][pos_y]);
      }
  
      snail_length++;
  
      for(let x = 0; x < array.length - snail_length; x++){
        if(loop % 2 === 0){
          pos_x = pos_x + 1;
        } else {
          pos_x = pos_x - 1;
        }
  
        new_list.push(array[pos_x][pos_y]);
      }
  
      loop++;
    }
  
    return new_list;
  }

  snail = function(array) {
    const result = []
    let totalCounter = array.length * array.length,
        rotation = 0,
        len = array.length - 1;
        
    if(array[0][0] === undefined) return result
    while (totalCounter >= 1){
      //top row
      for (let top = rotation; top < len; top++){
        result.push(array[rotation][top])
        totalCounter--
      }
      //right col
      for (let right = rotation; right < len; right++){
        result.push(array[right][len])
        totalCounter--
      }
      //bottom row
      for (let bot = len; bot > rotation; bot--){
        result.push(array[len][bot])
        totalCounter--
      }
      //left col
      for (let left = len; left > rotation; left--){
        result.push(array[left][rotation])
        totalCounter--
      }
      //last element
      if (rotation === len){
        result.push(array[rotation][len])
        totalCounter--
      }
      rotation++
      len--
    }
    return result
  }

  snail=f=(a,r=[])=>a.length?(r.push(...a.shift()),a.map(e=>r.push(e.pop())),a.reverse().map(e=>e.reverse()),f(a,r)):r

  snail = function(array) {
    let rb = 0
    let cb = 0
    let re = array.length - 1
    let ce = array[0].length - 1
    out = []
    
    while(rb <= re && cb <= ce) {
      for (let i = cb; i <= ce; i++) {
        out.push(array[rb][i])
      }
      rb += 1
      
      for (let i = rb; i <= re; i++) {
        out.push(array[i][ce])
      }
      ce -= 1
      
      if (rb <= re) {
        for (let i = ce; i >= cb; i--) {
          out.push(array[re][i])
        }
      re -= 1
      }
      
      if (cb <= ce) {
        for (let i = re; i >= rb; i--) {
          out.push(array[i][cb])
        }
      cb += 1
      }
    }
    return out
  }

  snail = function(array) {
    if (array[0].length < 2) return array[0];
    let res = []
    return move(array, res, "R");
  }
  
  function move(array, res, dir) {
    const dirClock = {"R":"D", "D": "L", "L": "U", "U": "R"};
    switch(dir) {
        case "R":
          res = [...res, ...array.shift()];
          break;
        case "D":
          array.forEach((row, index) => {
            res.push(row.pop())
          });
          break;
        case "L":
          const lastRow = array.pop();
          res = [...res, ...lastRow.reverse()];
          break;
        case "U":
          const tempUp = [];
          array.forEach((row, index) => {
            tempUp.push(row.shift())
          });
          res = [...res, ...tempUp.reverse()]
          break;
    }
    if (!array || array.length < 1) return res;
    return move(array, res, dirClock[dir]);
  }

  
