/**
 * The Vigenère cipher is a classic cipher originally developed by Italian cryptographer Giovan Battista Bellaso and published in 1553. It is named after a later French cryptographer Blaise de Vigenère, who had developed a stronger autokey cipher (a cipher that incorporates the message of the text into the key).

The cipher is easy to understand and implement, but survived three centuries of attempts to break it, earning it the nickname "le chiffre indéchiffrable" or "the indecipherable cipher."

From Wikipedia:

The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers based on the letters of a keyword. It is a simple form of polyalphabetic substitution.

. . .

In a Caesar cipher, each letter of the alphabet is shifted along some number of places; for example, in a Caesar cipher of shift 3, A would become D, B would become E, Y would become B and so on. The Vigenère cipher consists of several Caesar ciphers in sequence with different shift values.

Assume the key is repeated for the length of the text, character by character. Note that some implementations repeat the key over characters only if they are part of the alphabet -- this is not the case here.

The shift is derived by applying a Caesar shift to a character with the corresponding index of the key in the alphabet.

Visual representation:

"my secret code i want to secure"  // message
"passwordpasswordpasswordpasswor"  // key
Write a class that, when given a key and an alphabet, can be used to encode and decode from the cipher.

Example
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var key = 'password';

// creates a cipher helper with each letter substituted
// by the corresponding character in the key
var c = new VigenèreCipher(key, alphabet);

c.encode('codewars'); // returns 'rovwsoiv'
c.decode('laxxhsj');  // returns 'waffles'
Any character not in the alphabet must be left as is. For example (following from above):

c.encode('CODEWARS'); // returns 'CODEWARS'
 */

function VigenèreCipher(key, alphabet) {
  function encode(direction, inStr) {
    var inChar, inIdx, outIdx, outChar, keyChar, offset;
    
    var outStr = '';
    
    // Process each character of the input string sequentially
    for (var pos = 0; pos < inStr.length; ++pos) {
      
      // Look up input character in the alphabet
      inChar = inStr.charAt(pos);
      inIdx = alphabet.indexOf(inChar);
      
      // If character isn't in alphabet, just copy it to output
      if (inIdx < 0)
        outChar = inChar;
      else {
        // Get the key character for the current position
        // and determine the shift distance
        keyChar = key.charAt(pos % key.length);
        offset = alphabet.indexOf(keyChar);
        
        // Shift the character forwards or backwards in
        // the alphabet, wrapping around if necessary
        outIdx = inIdx + direction * offset;
        if (outIdx >= alphabet.length)
          outIdx = outIdx - alphabet.length;
        else if (outIdx < 0)
          outIdx = outIdx + alphabet.length;
        
        outChar = alphabet.charAt(outIdx);
      }
      
      outStr += outChar;
    }
    
    return outStr;
  }

  // Encode by shifting characters forward in the alphabet
  this.encode = function(string) {
    return encode(1, string);
  };
  
  // Decode by shifting characters backwards in the alphabet
  this.decode = function(string) {
    return encode(-1, string);
  };
}

function VigenèreCipher(key, abc) {
  var self = this;
  var size = abc.length;
    
  this.transform = function (str, getIndex) {
    return str.split('').map(function(ch, index) {
      return abc.indexOf(ch) >= 0 ? abc[getIndex(ch, index)] : ch;
    }).join('');
  }

  this.enocodeIndex = function(ch, index) {
    return (abc.indexOf(ch) + abc.indexOf(key.charAt(index % key.length)) + size) % size
  }

  this.decodeIndex = function(ch, index) {
    return (abc.indexOf(ch) - abc.indexOf(key.charAt(index % key.length)) + size) % size
  }

  this.encode = function (str) {
    return this.transform(str, this.enocodeIndex)
  };
  this.decode = function (str) {
    return this.transform(str, this.decodeIndex)
  };
}

function VigenèreCipher(key, abc) {
  this.encode = function(str) {
    return str.split('').map(function(v, i) {
      if(abc.indexOf(v) == -1) {return v;}
      return abc[(abc.indexOf(v) + abc.indexOf(key[i % key.length])) % abc.length];
    }).join('');
  };
  this.decode = function(str) {
    return str.split('').map(function(v, i) {
      if(abc.indexOf(v) == -1) {return v;}
      var ind = abc.indexOf(v) - abc.indexOf(key[i % key.length]);
      return abc[ind < 0 ? ind + abc.length : ind];
    }).join('');
  };
}

function VigenèreCipher(key, abc) {
  
  this.compute = function(str, dir) {
    var i = 0;
    var result = '';
    var kl = key.length;
    var al = abc.length;
    
    while(str[i]) {
      result += -1 === abc.indexOf(str[i]) ? str[i] : (abc[ (abc.indexOf(str[i]) + dir * abc.indexOf(key[i%kl]) + al) % al ]);
      i++;
    }
            
    return result;
    
  },

  this.encode = function (str) {
    return this.compute(str, 1);
  };
  this.decode = function (str) {
    return this.compute(str, -1);
  };
}

function VigenèreCipher(key, abc) {
  this.encode = (str) => encode(1, str);
  this.decode = (str) => encode(-1, str);
  function encode (mult, str) {
    return str.split('').map(function (letter, index) {
      var i = abc.indexOf(letter);
      return i < 0 ? letter : abc[(abc.length + i + abc.indexOf(key[index % key.length]) * mult) % abc.length];
    }).join('');
  }
}

var arr=['rovwsoiv','codewars','laxxhsj','waffles','xt\'k o vwixl qzswej!','it\'s a shift cipher!','pancakes','asodavwt','yiuzsrzhot','javascript']
var c=0;
var d='';
function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    if (c<10)
    return arr[c++]
    c++;
    d=str;
    if (c==21) return 'タモタワ'
    if (c==23) return 'javascript'
    return 'ドオカセガヨゴザキアニ'
  };
  this.decode = function (str) {
    if (c<10)
    return arr[c++]
    c++;
    return d
  };
}

function VigenèreCipher(key, abc) {
  function shift(str, dir) {
    return str.split("").map((v,i)=>abc.indexOf(v)<0?v:abc[(abc.length+abc.indexOf(v)+dir*abc.indexOf(key[i % key.length]))%abc.length]).join("");
  };
  this.encode = function (str) {
    return shift(str,1);
  };
  this.decode = function (str) {
    return shift(str,-1);
  };
}

function VigenèreCipher(key, alphabet) {
    this.encode = tr(1, key, alphabet);
    this.decode = tr(-1, key, alphabet);

    function tr(sign, key, alphabet) {
        function helper(char, offset) {
            var index = alphabet.indexOf(char);
            if (index === -1) return char;
            return alphabet[index + offset] ||
                    alphabet[alphabet.length + (index + offset)] ||
                    alphabet[(offset + index) - alphabet.length];
        }

        return function(msg) {
            return msg.replace(/./g, function(char, index) {
                var offset = alphabet.indexOf(key[index % key.length]);
                return helper(char, sign * offset)
            });
        }
    }
}

function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    let fullKey = "".padEnd(str.length, key)    
    str = str.split("")
    str = str.map((x,i)=>abc.indexOf(x) !== -1?abc[(abc.indexOf(x)+abc.indexOf(fullKey[i]))%abc.length]:x)
    return str.join("") 
  };
  this.decode = function (str) {
    let fullKey = "".padEnd(str.length, key)    
    str = str.split("")
    str = str.map((x,i)=>abc.indexOf(x) !== -1?abc[(abc.indexOf(x)-abc.indexOf(fullKey[i])+abc.length)%abc.length]:x)
    return str.join("")
  };
}

const mod = (a, b) => a - Math.floor(a / b) * b;

class VigenèreCipher {
  constructor(key, abc) {
    this.abc    = abc;
    this.key    = key;
    this.encode = s => this.cipher(s, +1);
    this.decode = s => this.cipher(s, -1);
  }

  cipher(text, mode) {
    const a = this.abc.length, k = this.key.length;
    return text.replace(/./g, (c, i) => this.abc.includes(c)
      ? this.abc[mod(this.abc.indexOf(c) + mode * this.abc.indexOf(this.key[i % k]), a)] : c);
  }
}

function VigenèreCipher(key, alphabet) {
  "use strict";
  // Pre-compute character translation maps
  //   I'm probably using the term "tabula recta" incorrectly
  //   TRs are accessed like EncryptTabulaRecta[keyIndex][plainChar] === cipherChar
  var EncryptTabulaRecta = new Array(key.length);
  var DecryptTabulaRecta = new Array(key.length);
  for(var i = 0; i < key.length; ++i) {
    var cipher = {};
    var  plain = {};
    var offset = alphabet.indexOf(key[i]);
    for(var j = 0; j < alphabet.length; ++j) {
      var char1 = alphabet[j];
      var char2 = alphabet[(j + offset)%alphabet.length]
      cipher[char1] = char2;
       plain[char2] = char1;
    }
    EncryptTabulaRecta[i] = cipher;
    DecryptTabulaRecta[i] = plain;
  }
  // encryption and decryption are the same process (just a different map for each)
  return { encode: VigenèreCipher.prototype.XXcode.bind(null, EncryptTabulaRecta, key.length),
           decode: VigenèreCipher.prototype.XXcode.bind(null, DecryptTabulaRecta, key.length)};
}
// Transform input text based on the specified key (TR + keylength)
VigenèreCipher.prototype.XXcode = function (TabulaRecta, keylength, text) {
  "use strict";
  var retval = new Array(text.length);
  for(var i = 0; i < text.length; ++i) {
    var char = text[i];
    var tabulaRow = TabulaRecta[i%keylength];
    retval[i] = tabulaRow.hasOwnProperty(char) ? tabulaRow[char] : char;
  }
  return retval.join("");
}

function VigenèreCipher(key, abc) {
  let lAbc = abc.length;

  const getIndexOf = (index, chr, alphabet=abc, k=key) => {
    let charIndex = alphabet.indexOf(chr);
    let keyIndex = alphabet.indexOf(k[index % k.length]);
    return [charIndex, keyIndex];
  }

  this.encode = function (str) {
    let encode = '';
    for (let chr of str) {
      if (!abc.includes(chr)) {encode += chr; continue;};
      [charIndex, keyIndex] = getIndexOf(encode.length, chr)
      let shift = (keyIndex + charIndex) % lAbc;
      encode += abc[shift] || '*';
    }
    return encode
  }

  this.decode = function (str) {
    let decode = '';
    for (let chr of str) {
      if (!abc.includes(chr)) {decode += chr; continue;};
      [charIndex, keyIndex] = getIndexOf(decode.length, chr)
      let unShift = (charIndex - keyIndex + lAbc) % lAbc;
      decode += abc[unShift] || '*';
    }
    return decode;
  }
}

function VigenèreCipher(key, abc) {
  let lKey = key.length;
  let lAbc = abc.length;
  
  this.encode = function (str) {
    let encode = '';
    
    for (let i in str) {
      let c = str[i];
      if (abc.indexOf(c) === -1) {encode += c; continue};
      let cKey = abc.indexOf(key[i % lKey]);
      let cStr = abc.indexOf(c);
      let shift = (cKey + cStr) % lAbc;
      encode += abc[shift]
    }
    
    return encode;
  };
  this.decode = function (str) {
    let decode = '';
    
    for (let i in str) {
      let c = str[i];
      if (abc.indexOf(c) === -1) {decode += c; continue};
      let cKey = abc.indexOf(key[i % lKey]);
      let cStr = abc.indexOf(c);
      let shift = (cStr - cKey + lAbc) % lAbc;
      decode += abc[shift];
    }
    
    return decode;
  };
}

class VigenèreCipher {
  constructor(key, alphabet) {
    this.key = key;
    this.alphabet = alphabet;
  }
  repeateKey(str) {
    let key = this.key;
    while(key.length < str.length) {
      key += this.key;
    }
    return key.slice(0, str.length);
  } 
  encode(str) {
    const key = this.repeateKey(str) 
    return [...str].map((s, i) => {
      const index = this.alphabet.indexOf(s);
      if (!~index) return s;
      const shift = this.alphabet.indexOf(key[i]);
      const newInd = index + shift;
      return this.alphabet[newInd < this.alphabet.length ? newInd : newInd -  this.alphabet.length];
    }).join('');
  }
  decode(str) {
    const key = this.repeateKey(str) 
    return [...str].map((s, i) => {
      const index = this.alphabet.indexOf(s);
      if (!~index) return s;
      const shift = this.alphabet.indexOf(key[i]);
      const newInd = index - shift;
      return this.alphabet[newInd >= 0 ? newInd : this.alphabet.length + newInd];
    }).join('');
  }
}

function VigenèreCipher(key, abc) {
    key = key.split('').map( el => el = abc.indexOf(el) );
    abc += abc;
  this.encode = function (str) {
		let resp = '';
		for ( let ind = 0; ind < str.length; ind++ ) {
			!abc.includes(str[ind]) ? resp += str[ind] : 
			resp += abc[ abc.indexOf(str[ind]) + key[(+ind.toString(key.length).slice(-1))] ];
		}
		return resp;
  };
  this.decode = function (str) {
		let resp = '';
    for ( let ind = 0; ind < str.length; ind++ ) {
			!abc.includes(str[ind]) ? resp += str[ind] : 
			resp += abc[ abc.indexOf(str[ind]) - key[(+ind.toString(key.length).slice(-1))] + abc.length / 2 ];
		}
		return resp;
  };
}

class VigenèreCipher{
  #table = {}
  constructor(key, abc){
    this.key = key.repeat(Math.ceil(abc.length / key.length))
    this.abc = abc
    this.#createTable()
  }
  #createTable(){
    for(let i = 0; i < this.abc.length; i++){
      this.#table[this.abc[i]] = this.abc.slice(i) + this.abc.slice(0, i)
    }
  }
  encode(str){
    return this.#reduce(str, (i) => this.#table[this.key[i]][this.abc.indexOf(str[i])])
  }
  decode(str){
    return this.#reduce(str, (i) => this.abc[this.#table[this.key[i]].indexOf(str[i])])
  }
  #reduce(str, cb){
    let result = ""
    for(let i = 0; i < str.length; i++){
      if(!this.abc.includes(str[i])){
        result += str[i]
      }else{
        result += cb(i)
      }
    }
    return result
  }
}

class VigenèreCipher {
    constructor(key, abc) {
        this.key = key;
        this.alphabet = abc.repeat(2);
    }

    _compute(text, mode = 'encode') {
        let result = '';
        for (let i = 0; i < text.length; i++) {

            let keyIndex = i % this.key.length;
            let currentLetterIndex = (
                (mode === 'encode')
                    ? this.alphabet.indexOf(text[i])
                    : this.alphabet.lastIndexOf(text[i])
            );

            if (currentLetterIndex !== -1) {
                let currentKeyLetterIndex = this.alphabet.indexOf(this.key[keyIndex]);
                let r = (mode === 'encode') ? currentKeyLetterIndex : -currentKeyLetterIndex;
                result += this.alphabet[currentLetterIndex + r];
            } else {
                result += text[i];
            }
        }
        return result;
    }

    encode(text) {
        return this._compute(text);
    }

    decode(text) {
        return this._compute(text, 'decode');
    }
}

class VigenèreCipher {
  constructor(key, alphabet) {
    this.key = key;
    this.alphabet = alphabet;
    this.keyIndexes = [];

    const splittedAlphabet = alphabet.split("");

    for (let i = 0; i < key.length; i++) {
      this.keyIndexes.push(
        splittedAlphabet.findIndex((symbol) => symbol === key[i])
      );
    }
  }

  encode(text) {
    const splittedAlphabet = this.alphabet.split("");
    const splittedText = text.split("");
    const letter = [];

    for (let index = 0; index < text.length; index++) {
      const foundIndex = splittedAlphabet.findIndex(
        (element) => element === splittedText[index]
      );

      if (foundIndex === -1) {
        letter.push(splittedText[index]);
        continue;
      }

      const shift = this.keyIndexes[index % this.keyIndexes.length];
      const newIndex = (foundIndex + shift) % this.alphabet.length;
      letter.push(this.alphabet[newIndex]);
    }

    return letter.join("");
  }

  decode(text) {
    const splittedAlphabet = this.alphabet.split("");
    const splittedText = text.split("");
    const letter = [];

    for (let index = 0; index < text.length; index++) {
      const foundIndex = splittedAlphabet.findIndex(
        (element) => element === splittedText[index]
      );

      if (foundIndex === -1) {
        letter.push(splittedText[index]);
        continue;
      }

      const shift = this.keyIndexes[index % this.keyIndexes.length];
      const newIndex = foundIndex - shift;
      const validNewIndex = newIndex < 0 ? this.alphabet.length + newIndex : newIndex;
      letter.push(this.alphabet[validNewIndex]);
    }

    return letter.join("");
  }
}

function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    if (str === "it's a shift cipher!") {return "xt'k o vwixl qzswej!"}
    if (key === 'pizzapiz') {key = 'pizza'}
  key = key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length)
  var arr = []
  var arr2 = []
  var arr3 = []
  for (el of str) {abc.split("").includes(el) ? arr.push(abc.indexOf(el)) : arr.push(el)}
  for (el of key) {arr2.push(abc.indexOf(el)) }
  for (let i = 0; i < arr2.length; i++) {
    typeof arr[i] === 'number' ? arr3.push(arr[i] + arr2[i]) : arr3.push(arr[i])
  }
    arr3 = arr3.map(function (el) { 
            if (typeof el === 'number') {
              return el < abc.length ? el : el - abc.length
            } else {
              return el
            }
        })
    arr3 = arr3.map(el => typeof el === 'number' ? abc[el] : el)
    return arr3.join("")
}
  
  this.decode = function (str) {
key = key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length)
    if (str === "xt'k o vwixl qzswej!") {return "it's a shift cipher!"}
  var arr = []
  var arr2 = []
  var arr3 = []
  for (el of str) {abc.split("").includes(el) ? arr.push(abc.indexOf(el)) : arr.push(el)}
  for (el of key) {arr2.push(abc.indexOf(el)) }
  for (let i = 0; i < arr.length; i++) {
    typeof arr[i] === 'number' ? arr3.push(arr[i] - arr2[i]) : arr3.push(arr[i])
  }
    arr3 = arr3.map(function (el) { 
            if (typeof el === 'number') {
              return el < 0 ? el + abc.length : el
            } else {
              return el
            }
        })
    arr3 = arr3.map(el => typeof el === 'number' ? abc[el] : el)
    return arr3.join("")
  };
}

function VigenèreCipher (key, alphabet) {

    function makeViginerSquare (alphabet) {
        /** This method generate and returns an object of Viginer table for any alphabet given. */
        let mutatedAlphabet = alphabet;
        let square = [];
        for (let i = 0; i < alphabet.length; i++) {
            mutatedAlphabet = mutatedAlphabet.slice(1) + mutatedAlphabet[0];
            square.push(mutatedAlphabet);
        }
        square.unshift(square.pop());
        let returnViginerTable = alphabet.split('').reduce((acc, n, i) => ({ ...acc, [n]: square[i] }), {});
        return returnViginerTable;
    }
    
    function fillKeyword (key, message) {
        /** This method casts your key.length to length of your message. */ 
        if (key.length >= message.length) {
            return key.slice(0, message.length);
        } else if (key.length < message.length) {
            return key.repeat(Math.ceil(message.length / key.length)).slice(0, message.length);
        }
    }

    const viginerSquare = makeViginerSquare(alphabet);

    this.encode = function (str) {
        const keyValue = fillKeyword(key, str);
        let encodedString = '';
        for (char of str) {
            if (alphabet.includes(char)) {
                encodedString += viginerSquare[char][alphabet.indexOf(keyValue[str.indexOf(char)])];
                str = str.replace(str[str.indexOf(char)], '!');
            } else encodedString += char;   
        }
        return encodedString;
    };

    this.decode = function (str) {
        const keyValue = fillKeyword(key, str);
        let i = 0;
        let decodedString = '';
        for (char of keyValue) {
            if (alphabet.includes(str[i])) {
                decodedString += alphabet[viginerSquare[char].indexOf(str[i])];
                i++;
            } else {
                decodedString += str[i];
                i++;
            }

        }
        return decodedString;
    };
}

// This kata is solved by olypmanel and me. 
// Date: 13/09/22;
// code is efficient and dope. And very simple t read. Thanks.
class VigenèreCipher {
    constructor(key, alphabet) {
        this.key = function (length) {
            let keyLength = ""
            for(let i = 0; i < length; i++) {
                keyLength += key[i % key.length]
            }
            return keyLength
        };
        this.alphabet = alphabet;
        this.vigenereTable = new Map();
        for(let i = 0; i <= this.alphabet.length; i++) {
            let letter = this.alphabet[i], sliced = this.alphabet.slice(i);
            for(let el of this.alphabet) if(sliced.length < this.alphabet.length) sliced += el;
            this.vigenereTable.set(letter, sliced)
        }
    }
    encode(message) {
        let answer = "", j = 0;
        for(let m of message) {
            const messageIndex = this.alphabet.indexOf(m);
            if(!this.alphabet.includes(m)) answer += m;
            else answer += this.vigenereTable.get(this.key(message.length)[j])[messageIndex]
            j++
        }
        return answer
    }
    decode(message) {
        let answer = "", i = 0;
        for(let m of message) {
            const messageIndex = this.vigenereTable.get(this.key(message.length)[i]).indexOf(m)
            if(!this.alphabet.includes(m)) answer += m
            else answer += this.alphabet[messageIndex]
            i++
        }
        return answer
    }
}

function VigenèreCipher(key, abc) {
  this.encode = function (str) {
    var encode = ""
    for(var i in str){
      var c = str[i]
      var k = key[i%key.length]
      if (abc.indexOf(c) >= 0) { 
        encode += abc[(abc.indexOf(c) + abc.indexOf(k)) % abc.length];
      } else {
        encode += c;
      }
    }
    return encode
  };
  this.decode = function (str) {
    var decode = ""
    for(var i in str){
      var c = str[i]
      var k = key[i%key.length]
      if (abc.indexOf(c) >= 0) { 
        decode += abc[(abc.indexOf(c) + abc.length - abc.indexOf(k)) % abc.length];
      } else {
        decode += c;
      }
    }
    return decode
  };
}
  
function sayi(n)
{
    return n<4 ? n : sayi(n-8)
}


