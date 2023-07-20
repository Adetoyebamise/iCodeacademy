/*How can you tell an extrovert from an introvert at NSA?
Va gur ryringbef, gur rkgebireg ybbxf ng gur BGURE thl'f fubrf.

I found this joke on USENET, but the punchline is scrambled. Maybe you can decipher it?
According to Wikipedia, ROT13 is frequently used to obfuscate jokes on USENET.

For this task you're only supposed to substitute characters. Not spaces, punctuation, numbers, etc.

Test examples:

"EBG13 rknzcyr." -> "ROT13 example."

"This is my first ROT13 excercise!" -> "Guvf vf zl svefg EBG13 rkprepvfr!"
*/

function rot13(str) {
  let s1 = "abcdefghijklmnopqrstuvwxyz";
  let s2 = "NOPQRSTUVWXYZABCDEFGHIJKLM".toLowerCase();
  const replaced = str.replace(/[a-z]/gi, v => {
    let upper = v === v.toUpperCase();
    return upper
      ? s2[s1.indexOf(v.toLowerCase())].toUpperCase()
      : s2[s1.indexOf(v.toLowerCase())].toLowerCase();
  });
  return replaced;
}

function rot13(str) {
  return str.replace(/[a-z]/ig, function(x){
    return String.fromCharCode(x.charCodeAt(0) + (x.toLowerCase() <= 'm' ? 13: -13));
  });
}

function rot13(str) {
  return str.split('').map(function(e) {
    return /[A-Ma-m]/.test(e) ? String.fromCharCode(e.charCodeAt(0) + 13) :
           /[N-Zn-z]/.test(e) ? String.fromCharCode(e.charCodeAt(0) - 13) : e;
  }).join('');
}

function rot13(str) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
   var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
   return str.replace(/[a-z]/gi, c => a[b.indexOf(c)])
 }

 const rot13 = str =>
  str.replace(/[a-z]/gi, val => String.fromCharCode(val.charCodeAt() + (/[a-m]/i.test(val) ? 13 : -13)));

  function rot13(str) {
    var code = {
       A: "N",
       B: "O",
       C: "P",
       D: "Q", 
       E: "R",
       F: "S",
       G: "T",
       H: "U",
       I: "V",
       J: "W",
       K: "X",
       L: "Y",
       M: "Z",
       N: "A",
       O: "B",
       P: "C",
       Q: "D",
       R: "E",
       S: "F",
       T: "G",
       U: "H",
       V: "I",
       W: "J",
       X: "K",
       Y: "L",
       Z: "M",
       a: "n",
       b: "o",
       c: "p",
       d: "q",
       e: "r",
       f: "s",
       g: "t",
       h: "u",
       i: "v",
       j: "w",
       k: "x",
       l: "y",
       m: "z",
       n: "a",
       o: "b",
       p: "c",
       q: "d",
       r: "e",
       s: "f",
       t: "g",
       u: "h",
       v: "i",
       w: "j",
       x: "k",
       y: "l",
       z: "m"
     };
     var splitStr = str.split("");
     for (var i = 0; i < splitStr.length; i++){
         for (var prop in code){
             if (prop === splitStr[i]){
                 splitStr[i] = code[prop];
                break;
             }
         }
     }
     var codeman = splitStr.join('');
     return codeman;
   }

   const rot13 = str => str.replace(/[a-z]/g, decryptLowerLetter).replace(/[A-Z]/g, decryptUpperLetter);

const decryptLowerLetter = letter => decryptLetter(letter, 97);

const decryptUpperLetter = letter => decryptLetter(letter, 65);

const decryptLetter = (letter, index) => String.fromCharCode((letter.charCodeAt(0) - index + 13) % 26 + index);

function rot13(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      
      if(str.charAt(i).match(/[a-z]/)) {
        const newCode = code - 13;
        
        if(newCode < 97) {
          const c = 123 - (97 - newCode);
          res += String.fromCharCode(c);
          
        } else {
          res += String.fromCharCode(newCode);
        }
        
      } else if(str.charAt(i).match(/[A-Z]/)) {
        const newCode = code - 13;
        
        if(newCode < 65) {
          const c = 91 - (65 - newCode);
          res += String.fromCharCode(c);
          
        } else {
          res += String.fromCharCode(newCode);
        }
        
      } else {
        res += str.charAt(i);
      }
  }
  return res;
}

function rot13(str) {
  var dict = {"A":"N","B":"O","C":"P","D":"Q","E":"R","F":"S","G":"T","H":"U","I":"V","J":"W","K":"X","L":"Y","M":"Z","N":"A","O":"B","P":"C","Q":"D","R":"E","S":"F","T":"G","U":"H","V":"I","W":"J","X":"K","Y":"L","Z":"M","a":"n","b":"o","c":"p","d":"q","e":"r","f":"s","g":"t","h":"u","i":"v","j":"w","k":"x","l":"y","m":"z","n":"a","o":"b","p":"c","q":"d","r":"e","s":"f","t":"g","u":"h","v":"i","w":"j","x":"k","y":"l","z":"m"}
  return str.split("").map(x=> dict[x] ? dict[x] : x).join("");
}

function rot13(str) {
  var alpha = 'abcdefghijklmnopqrstuvwxyz', rot13 = 'nopqrstuvwxyzabcdefghijklm';
  return str.replace(/[a-z]/gi, function(m) {
    var lower = m.toLowerCase();
    return lower == m ? rot13[alpha.indexOf(lower)] : rot13[alpha.indexOf(lower)].toUpperCase();
  });
}

const ALPHABET = 'a'.repeat(26).replace(/./g, (_, idx) => String.fromCharCode('a'.charCodeAt() + idx))
                    .repeat( 4).replace(/(.)(?=.*\1.*\1)/g, l => l.toUpperCase());

const rot13 = str => str.replace(/[a-z]/gi, l => ALPHABET[ALPHABET.indexOf(l) + 13]);

function rot13 (str) {
  var rot = function (offset) { return function (c) {
    return String.fromCharCode((c.charCodeAt(0) - offset + 13) % 26 + offset);
  }; };
  return str.replace(/[a-z]/g, rot(97)).replace(/[A-Z]/g, rot(65));
}

function rot13(cypher) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return cypher.replace(/[a-z]/gi, c => b[a.indexOf(c)])
}

const rot13 = s => s.replace(/[a-z]/gi, x => String.fromCharCode(x.charCodeAt() + (/[a-m]/i.test(x) ? 13 : -13)));

function rot13(str) {
  return [...str].map(char => {
    if (/^[A-Za-z]+$/.test(char)) {
      return String.fromCharCode(char.charCodeAt() + (char.toLowerCase() <= 'm' ? 13 : -13)); 
    } 
    return char;
  }).join('')
} 

function rot13(str) {
  let dic ={ A: 'N',
  B: 'O',
  C: 'P',
  D: 'Q',
  E: 'R',
  F: 'S',
  G: 'T',
  H: 'U',
  I: 'V',
  J: 'W',
  K: 'X',
  L: 'Y',
  M: 'Z',
  N: 'A',
  O: 'B',
  P: 'C',
  Q: 'D',
  R: 'E',
  S: 'F',
  T: 'G',
  U: 'H',
  V: 'I',
  W: 'J',
  X: 'K',
  Y: 'L',
  Z: 'M',
  a: 'n',
  b: 'o',
  c: 'p',
  d: 'q',
  e: 'r',
  f: 's',
  g: 't',
  h: 'u',
  i: 'v',
  j: 'w',
  k: 'x',
  l: 'y',
  m: 'z',
  n: 'a',
  o: 'b',
  p: 'c',
  q: 'd',
  r: 'e',
  s: 'f',
  t: 'g',
  u: 'h',
  v: 'i',
  w: 'j',
  x: 'k',
  y: 'l',
  z: 'm' }
  return str.split('').map(c=>{return dic[c] ? dic[c] : c}).join('')
}

function rot13(str) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const rot13Alphabet = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

  let result = "                                                              ";
  
  for (let i = 0; i < str.length; i++) {
    let indexOfLetter = alphabet.indexOf(str.charAt(i));
    if (indexOfLetter != -1) {
      result += rot13Alphabet[indexOfLetter];
    } else {
      result += str.charAt(i);
    }
  }

  return result.trim();
}

function rot13(str) {
  const low = str.toLowerCase().replace(/[a-z]/g, (v) => String.fromCharCode(((v.charCodeAt() - 84) % 26) + 97));
  return Array.from(low).map((v, i) => (str[i] === str[i].toLowerCase() ? v : v.toUpperCase())).join('');
}

function rot13(str) {
  const low = str.replace(/[a-z]/g, (v) => String.fromCharCode(((v.charCodeAt() - 84) % 26) + 97));
  return low.replace(/[A-Z]/g, (v) => String.fromCharCode(((v.toLowerCase().charCodeAt() - 84) % 26) + 97).toUpperCase());
}

function rot13(str) {
  let rot13Str = '';
  for (let char of str) {
    let code = char.charCodeAt(0);
//    if (/[A-Ma-m]/.test(char))      rot13Str += String.fromCodePoint(code + 13);
//    else if (/[N-Zn-z]/.test(char)) rot13Str += String.fromCodePoint(code - 13);
    if (/[A-Za-z]/.test(char))
      rot13Str += String.fromCodePoint( code + 13 - 26 * ((code % (65 + 32 * ((code - 65) / 32 | 0))) / 13 | 0) );
    else
      rot13Str += char;
  }
  return rot13Str;
}
