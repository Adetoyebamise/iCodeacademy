/*
Do you know how to make a spiral? Let's test it!
Classic definition: A spiral is a curve which emanates from a central point, getting progressively farther away as it revolves around the point.

Your objective is to complete a function createSpiral(N) that receives an integer N and returns an NxN two-dimensional array with numbers 1 through NxN represented as a clockwise spiral.

Return an empty array if N < 1 or N is not int / number

Examples:

N = 3 Output: [[1,2,3],[8,9,4],[7,6,5]]

1    2    3    
8    9    4    
7    6    5    
N = 4 Output: [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]

1   2   3   4
12  13  14  5
11  16  15  6
10  9   8   7
N = 5 Output: [[1,2,3,4,5],[16,17,18,19,6],[15,24,25,20,7],[14,23,22,21,8],[13,12,11,10,9]]

1   2   3   4   5    
16  17  18  19  6    
15  24  25  20  7    
14  23  22  21  8    
13  12  11  10  9
*/

// Solution
const createSpiral= (n) => {
    if (!Number.isInteger || n < 1) return []
    let returnArray = []
    for (i=0; i < n; i++) {
      returnArray[i] = Array(n)
      // console.log(returnArray[i])
    }
      let topBoundary = 0;
      let bottomBoundary = n-1;
      let leftBoundary = 0;
      let rightBoundary =  n-1;
      let counter = 1;
      let direction = 'LEFT';
      let columnx = 0;
      let rowy = 0;
  
      while (topBoundary <= bottomBoundary && leftBoundary <= rightBoundary) {
          if (direction === "LEFT" && columnx <= rightBoundary) {
              returnArray[rowy][columnx++] = counter++
          } else if (direction === "LEFT" && columnx > rightBoundary) {   //first spiral point
              direction = "DOWN"
              columnx = rightBoundary
              rowy = ++topBoundary
          } else if (direction === 'DOWN' && rowy <= bottomBoundary) {
              returnArray[rowy++][columnx] = counter++
          } else if (direction === 'DOWN' && rowy > bottomBoundary) {  //Second Spiral point
              direction = 'RIGHT'
              columnx = --rightBoundary
              rowy = bottomBoundary
          } else if (direction === 'RIGHT' && columnx >= leftBoundary) {
              returnArray[rowy][columnx--] = counter++
          } else if (direction === 'RIGHT' && columnx < leftBoundary) {  // third spiral point
              direction = 'UP'
              columnx = leftBoundary
              rowy = --bottomBoundary
          }  else if (direction === 'UP' && rowy >= topBoundary) {
              returnArray[rowy--][columnx] = counter++
          } else if (direction === 'UP' && rowy < topBoundary) {        // fourth spiral point
              direction = 'LEFT'
              columnx = ++leftBoundary
              rowy = topBoundary
          }
      }
      return returnArray
  }
  
  
  console.log(createSpiral(5))