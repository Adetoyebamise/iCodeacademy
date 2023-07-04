// DESCRIPTION:
// Greed is a dice game played with five six-sided dice. Your mission, should you choose to accept it, is to score a throw according to these rules. You will always be given an array with five six-sided dice values.

//  Three 1's => 1000 points
//  Three 6's =>  600 points
//  Three 5's =>  500 points
//  Three 4's =>  400 points
//  Three 3's =>  300 points
//  Three 2's =>  200 points
//  One   1   =>  100 points
//  One   5   =>   50 point
// A single die can only be counted once in each roll. For example, a given "5" can only count as part of a triplet (contributing to the 500 points) or as a single 50 points, but not both in the same roll.

// Example scoring

//  Throw       Score
//  ---------   ------------------
//  5 1 3 4 1   250:  50 (for the 5) + 2 * 100 (for the 1s)
//  1 1 1 3 1   1100: 1000 (for three 1s) + 100 (for the other 1)
//  2 4 4 5 4   450:  400 (for three 4s) + 50 (for the 5)
// In some languages, it is possible to mutate the input to the function. This is something that you should never do. If you mutate the input, you will not be able to pass all the tests.

function score(dice) {
  const result = [
    {
      value: 1,
      repetitions: 0,
      singlePoints: 100,
      triplePoints: 1000,
    },
    {
      value: 2,
      repetitions: 0,
      singlePoints: 0,
      triplePoints: 200,
    },
    {
      value: 3,
      repetitions: 0,
      singlePoints: 0,
      triplePoints: 300,
    },
    {
      value: 4,
      repetitions: 0,
      singlePoints: 0,
      triplePoints: 400,
    },
    {
      value: 5,
      repetitions: 0,
      singlePoints: 50,
      triplePoints: 500,
    },
    {
      value: 6,
      repetitions: 0,
      singlePoints: 0,
      triplePoints: 600,
    },
  ]

  dice.forEach(die => {
    result[die - 1].repetitions += 1
  })

  const totalPoints = result
    .map(die => {
      if (die.repetitions > 3) return die.triplePoints + die.singlePoints * die.repetitions

      if (die.repetitions === 3) return die.triplePoints

      return die.singlePoints * die.repetitions
    })
    .reduce((total, value) => total + value, 0)

  return totalPoints
}

function score(dice) {
  let result = 0
  let arr2 = []

  const arr1 = dice.sort((a, b) => a - b)
  for (let i = 1; i < 7; i++) {
    arr2.push(arr1.slice(arr1.indexOf(i), arr1.lastIndexOf(i) + 1))
  }
  let arr = arr2.map(v => v.length)
  for (let j = 0; j < 5; j++) {
    if (arr[0] >= 3) {
      result += 1000
      arr[0] -= 3
    }
    if (arr[0] > 0) {
      result += 100
      arr[0] -= 1
    }
    if (arr[1] >= 3) {
      result += 200
      arr[1] -= 3
    }
    if (arr[2] >= 3) {
      result += 300
      arr[2] -= 3
    }
    if (arr[3] >= 3) {
      result += 400
      arr[3] -= 3
    }
    if (arr[4] >= 3) {
      result += 500
      arr[4] -= 3
    }
    if (arr[4] > 0) {
      result += 50
      arr[4] -= 1
    }
    if (arr[5] >= 3) {
      result += 600
      arr[5] -= 3
    }
  }
  return result
}

function score(dice) {
  var dc = [0, 0, 0, 0, 0, 0]
  var tdr = [1000, 200, 300, 400, 500, 600]
  var sdr = [100, 0, 0, 0, 50, 0]
  dice.forEach(function (x) {
    dc[x - 1]++
  })
  return dc.reduce(function (s, x, i) {
    return s + (x >= 3 ? tdr[i] : 0) + sdr[i] * (x % 3)
  }, 0)
}

function score(dice) {
  var six = 0,
    five = 0,
    four = 0,
    three = 0,
    too = 0,
    one = 0
  var i = 0
  while (i < 5) {
    if (dice[i] == 6) {
      six++
    }
    if (dice[i] == 5) {
      five++
    }
    if (dice[i] == 4) {
      four++
    }
    if (dice[i] == 3) {
      three++
    }
    if (dice[i] == 2) {
      too++
    }
    if (dice[i] == 1) {
      one++
    }
    i++
  }
  var r = 0
  if (one > 2) {
    r += 1000
    one -= 3
  }
  if (six > 2) {
    r += 600
  }
  if (five > 2) {
    r += 500
    five -= 3
  }
  if (four > 2) {
    r += 400
  }
  if (three > 2) {
    r += 300
  }
  if (too > 2) {
    r += 200
  }
  r += one * 100
  r += five * 50
  return r
}

function score(dice) {
  if (dice.length !== 5) return 0

  let diceStr = dice.sort().join("")
  let score = 0
  const rules = [
    { reg: /111/, score: 1000 },
    { reg: /666/, score: 600 },
    { reg: /555/, score: 500 },
    { reg: /444/, score: 400 },
    { reg: /333/, score: 300 },
    { reg: /222/, score: 200 },
    { reg: /1/, score: 100 },
    { reg: /5/, score: 50 },
  ]

  rules.forEach(rule => {
    while (rule.reg.test(diceStr)) {
      diceStr = diceStr.replace(rule.reg, "")
      score += rule.score
    }
  })

  return score
}

function score(dice) {
  var score = [0, 0, 0, 0, 0, 0]

  dice.forEach(function (die) {
    ++score[die - 1]
  })

  return score.reduce(function (total, n, i) {
    switch (i + 1) {
      case 1:
        return total + Math.floor(n / 3) * 1000 + (n % 3) * 100

      case 5:
        return total + Math.floor(n / 3) * 500 + (n % 3) * 50

      default:
        return total + Math.floor(n / 3) * (i + 1) * 100
    }
  }, 0)
}

function score(dice) {
  var sum = 0
  dice = dice.sort()
  for (var i = 0; i < dice.length; i++) {
    if (dice[i] == dice[i + 1] && dice[i + 1] == dice[i + 2]) {
      switch (dice[i]) {
        case 1:
          sum += 1000
          break
        case 6:
          sum += 600
          break
        case 5:
          sum += 500
          break
        case 4:
          sum += 400
          break
        case 3:
          sum += 300
          break
        case 2:
          sum += 200
      }
      i = i + 2
      continue
    } else if (dice[i] == 1) {
      sum += 100
    } else if (dice[i] == 5) {
      sum += 50
    }
  }
  return sum
}

function score(dice) {
  var v = {
    111: 1000,
    222: 200,
    333: 300,
    444: 400,
    555: 500,
    666: 600,
    1: 100,
    5: 50,
  }

  var s =
    dice
      .sort()
      .join("")
      .match(/(([1-6])\2\2)|(1|5)/g) || []
  return s.reduce(function (a, e) {
    return a + v[e]
  }, 0)
}

const score = dice =>
  (
    dice
      .sort()
      .join(``)
      .match(/(\d)\1{2}|[15]/g) || []
  ).reduce((pre, val) => pre + 100 * ({ 111: 10, 1: 1, 5: 0.5 }[val] || val[0]), 0)

function score(dice) {
  return [6, 5, 4, 3, 2, 1]
    .map(n => {
      return { n: n, count: dice.filter(die => die === n).length }
    })
    .reduce((state, next) => {
      if (next.count > 2) {
        state += next.n === 1 ? 1000 : next.n * 100
      }

      if (next.n === 1 || next.n === 5) {
        var mod = next.count % 3
        state += next.n === 1 ? mod * 100 : mod * 50
      }

      return state
    }, 0)
}

function score(dice) {
  var dict = {}
  dice.forEach(die => (dict[die] = (dict[die] || 0) + 1))
  var score = 0
  Object.keys(dict).forEach(calcScore)
  function calcScore(dieValue) {
    var count = dict[dieValue]
    if (dieValue == 1) {
      score += Math.floor(count / 3) * 1000 + (count % 3) * 100
    } else if (dieValue == 5) {
      score += Math.floor(count / 3) * 500 + (count % 3) * 50
    } else {
      score += Math.floor(count / 3) * 100 * dieValue
    }
  }
  return score
}

function score(dice) {
  return (
    dice
      .sort()
      .join("")
      .match(/(\d)\1{2}|[15]/g) || []
  ).reduce((a, b) => (a += 100 * ({ 111: 10, 5: 0.5 }[b] || b[0])), 0)
}

function score(dice) {
  var count = dice.reduce(
    function (acc, v) {
      acc[v - 1]++
      return acc
    },
    [0, 0, 0, 0, 0, 0]
  )

  return [
    [3, 1, 1000],
    [3, 6, 600],
    [3, 5, 500],
    [3, 4, 400],
    [3, 3, 300],
    [3, 2, 200],
    [1, 1, 100],
    [1, 5, 50],
  ].reduce(function (res, rule) {
    while (count[rule[1] - 1] >= rule[0]) {
      res += rule[2]
      count[rule[1] - 1] -= rule[0]
    }
    return res
  }, 0)
}

function score(dice) {
  var v = [0, 0, 0, 0, 0, 0]
  var s = 0
  for (i = 0; i < dice.length; i++) {
    v[dice[i] - 1] = v[dice[i] - 1] + 1
    if (v[dice[i] - 1] == 3) {
      s += dice[i] == 1 ? 1000 : dice[i] * 100
      v[dice[i] - 1] = 0
    }
  }
  return s + v[0] * 100 + v[4] * 50
}

const score = dice => {
  const points = {
    // declare possible points combos
    5: 50,
    1: 100,
    222: 200,
    333: 300,
    444: 400,
    555: 500,
    666: 600,
    111: 1000,
  }

  let total = 0 // declare total to be returned from function

  // reformat input data
  const { singles, triplets } = dice.reduce(
    (acc, die) => {
      const count = dice.filter(num => num === die).length // check how many times element repeats
      const acceptableSingles = [1, 5] // these are the only singles you get points for

      if (count >= 3 && acc.triplets.length < 3) acc.triplets.push(die)
      else if (acceptableSingles.includes(die)) acc.singles.push(die)

      return acc
    },
    { singles: [], triplets: [] }
  )

  if (singles.length) singles.forEach(num => (total += points[num]))
  if (triplets.length) total += points[parseInt(`${triplets[0]}${triplets[0]}${triplets[0]}`)]

  return total
}
