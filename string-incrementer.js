// DESCRIPTION:
// Your job is to write a function which increments a string, to create a new string.

// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:

// foo -> foo1

// foobar23 -> foobar24

// foo0042 -> foo0043

// foo9 -> foo10

// foo099 -> foo100

// Attention: If the number has leading zeros the amount of digits should be considered.

function incrementString(input) {
  if(isNaN(parseInt(input[input.length - 1]))) return input + '1';
  return input.replace(/(0*)([0-9]+$)/, function(match, p1, p2) {
    var up = parseInt(p2) + 1;
    return up.toString().length > p2.length ? p1.slice(0, -1) + up : p1 + up;
  });
}

let incrementString = str => str.replace(/([0-8]|\d?9+)?$/, (e) => e ? + e + 1 : 1)

const incrementString = s => s.replace(/[0-8]?9*$/, m => String(++m));

function incrementString(input) {
  return input.replace(/([0-8]?)(9*)$/, function(s, d, ns) {
      return +d + 1 + ns.replace(/9/g, '0');
    });
}

function incrementString(str){
	var c = str[str.length-1];
		switch(c){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8': return str.substring(0, str.length-1) + (parseInt(c)+1);
            case '9': return incrementString(str.substring(0, str.length-1)) + 0;
            default: return str+"1";
                }
}

function incrementString (strng) {
  return strng.replace(/[\d]*$/, i => String(+i + 1).padStart(i.length, 0));

}

const incrementString = strng =>
  strng.replace(/[0-8]?9*$/, val => ++val);


  function incrementString (str) {
    str = str.split('');
    if (isNaN(str[str.length - 1]) === false) {
      for (var i = str.length - 1; i >= 0; --i) {
        if (isNaN(str[i]) === false) {
          var num = +str[i];
          if (num !== 9) {
            str.splice(i, 1, (++num).toString());
            break;
          }
          str.splice(i, 1, '0');
        } else if (isNaN(str[i + 1]) === false && str[i + 1] === '0') {
          str.splice(i + 1, 0, '1');
        } else {
          break;
        }
      }
    } else {
      str.push('1');
    }
    return str.join('');
  }

  function incrementString(input) {
    return input.replace(/\d*$/, function(n) {
      var x = ~~n + 1
      return ('0000000' + x).slice(-Math.max(n.length, String(x).length))
    })
  }

  function incrementString (strng) {
    return strng.replace(/(\d*)$/, (_, p1) => p1 ? String(+p1 + 1).padStart(p1.length, 0) : 1);
  }

  const incrementString = s => s.replace(/[0-8]?9*$/, m => ++m);

  function incrementString (input) {
    var body = input.slice(0, -1)
    var lastDigit = input.slice(-1).match(/[0-9]/)
    if (lastDigit === null)    { return input + "1";                       }
    if (lastDigit != "9")      { return body + (parseInt(lastDigit) + 1);  }
    else                       { return incrementString(body) + "0";       }
}

function incrementString (string) {
  const value = string.split('')

  // if the last value of a given string is not a number
  // then we can just return back early with 1 at the end.
  if (isNaN(value[value.length - 1])) return `${string}1`

  let characterPosition = value.length - 1
  let character = value[characterPosition]
  let characterNumber = Number(character)

  // If the last value is less than or equal to 8, then
  // we only need to increase that value by one and
  // return the updated value.
  if (characterNumber <= 8) {
    value[characterPosition] = characterNumber + 1
    return value.join('')
  }

  let lastChangedValue = characterNumber
  value[characterPosition] = 0

  // iterate through  all  the  values in the  string from right
  // to left, as long as the  current value is a 9, increase and
  // carry the one. When the value is no longer a 9, then return
  // the response.
  //
  // If the last number  (first) is a 9, then splice in a 1 at
  // the next left position.
  while (true) {
    characterPosition -= 1
    character = value[characterPosition]
    characterNumber = Number(character)

    if (!isNaN(character) && characterNumber === 9) {
      lastChangedValue = characterNumber
      value[characterPosition] = 0
      continue
    }

    if (lastChangedValue === 9 && !isNaN(character) && characterNumber <= 8) {
      value[characterPosition] = characterNumber + 1
      return value.join('')
    }

    value.splice(characterPosition + 1, 0, 1)
    return value.join('')
  }
}

const incrementString = str => str.replace(/([0-8]?)(9*)$/, num => num ? Number(num) + 1 : 1);

function incrementString (strng) {
  var m = strng.match(/^(\w*?)(\d*)$/);
  var next = (parseInt('0'+m[2], 10) + 1) + '';
  return m[1] + m[2].slice(0, -next.length) + next;
}

