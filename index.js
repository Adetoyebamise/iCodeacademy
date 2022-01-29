// Solution

const convertPoint = (loc) => {
  const column = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5,
    f:6,
    g:7,
    h:8,
  }
  const letter = loc.charAt(0)
  const num = loc.charAt(1)

  return [Number(num), column[letter]]
}

console.log(convertPoint("d3"))

const getMoves = (loc) => {
  moves = []
  moves.push([loc[0] + 1, loc[1] - 2])
  moves.push([loc[0] + 1, loc[1] + 2])
  moves.push([loc[0] - 1, loc[1] - 2])
  moves.push([loc[0] - 1, loc[1] + 2])
  moves.push([loc[0] + 2, loc[1] - 1])
  moves.push([loc[0] + 2, loc[1] + 1])
  moves.push([loc[0] - 2, loc[1] - 1])
  moves.push([loc[0] - 2, loc[1] + 1])

  return moves
}

console.log(getMoves("d3"))

const checkMoves = moves => {
  return moves.filter( move => {
    return move[0] >= 1 && move[0] <= 8 && move[1] >= 1 && move[1] <= 8
  })
}

console.log(checkMoves("d3"))

const knightMove = (start, end) => {
  startSquare = convertPoint(start)
  endSquare = convertPoint(end)
  const board = {}
  board[JSON.stringify(startSquare)] = 0
  const quest = [startSquare]
  while (!(quest[0][0] === endSquare[0]) && quest[0][0] === endSquare[1]) {
    const loc = quest.shift()
    const moves = getMoves((loc))
    moves.forEach( move => {
      quest.push(move)
      board[JSON.stringify(move)] = board[JSON.stringify(loc)]
    })
  }
  return console.log(board[JSON.stringify(endSquare)])
}

console.log(knightMove("d3", "b2"))