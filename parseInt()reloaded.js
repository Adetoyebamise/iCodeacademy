/**
 * In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

Examples:

"one" => 1
"twenty" => 20
"two hundred forty-six" => 246
"seven hundred eighty-three thousand nine hundred and nineteen" => 783919
Additional Notes:

The minimum number is "zero" (inclusively)
The maximum number, which must be supported is 1 million (inclusively)
The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
All tested numbers are valid, you don't need to validate them
 */

const words = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90
};
const mult = { hundred: 100, thousand: 1000, million: 1000000 };
function parseInt(str) {
  return str.split(/ |-/).reduce(function(value, word) {
    if (words[word]) value += words[word];
    if (mult[word])
      value += mult[word] * (value % mult[word]) - (value % mult[word]);
    return value;
  }, 0);
}

function parseInt(s) {
  s=s.replace(/ and/gi,'');
  var ans='';
  if (s=='one million') return 1000000;
  if (s=='zero') return 0;
  var c=false;
  if (s.indexOf('thousand')!=-1)
    c=true;
  var arr=s.split(' ');
  if (c)
  {
    var t=[];
    var i=0;
    while (arr[i]!='thousand')
      t.push(arr[i++]);
    var d=false;
    if (t.indexOf('hundred')!=-1)
      d=true;
    if (d)
    {
      if (t[0]=='one') ans+=1;
      if (t[0]=='two') ans+=2;
      if (t[0]=='three') ans+=3;
      if (t[0]=='four') ans+=4;
      if (t[0]=='five') ans+=5;
      if (t[0]=='six') ans+=6;
      if (t[0]=='seven') ans+=7;
      if (t[0]=='eight') ans+=8;
      if (t[0]=='nine') ans+=9;
      
      if (t.length==2)
        ans+='00';
      else
      {
        var k=t[2].split('-')
        if (k.length==1)
        {
          if (k[0]=='one') ans+='01';
          if (k[0]=='two') ans+='02';
          if (k[0]=='three') ans+='03';
          if (k[0]=='four') ans+='04';
          if (k[0]=='five') ans+='05';
          if (k[0]=='six') ans+='06';
          if (k[0]=='seven') ans+='07';
          if (k[0]=='eight') ans+='08';
          if (k[0]=='nine') ans+='09';
          if (k[0]=='ten') ans+='10';
          if (k[0]=='eleven') ans+='11';
          if (k[0]=='twelve') ans+='12';
          if (k[0]=='thirteen') ans+='13';
          if (k[0]=='fourteen') ans+='14';
          if (k[0]=='fifteen') ans+='15';
          if (k[0]=='sixteen') ans+='16';
          if (k[0]=='seventeen') ans+='17';
          if (k[0]=='eighteen') ans+='18';
          if (k[0]=='nineteen') ans+='19';
          if (k[0]=='twenty') ans+='20';
          if (k[0]=='thirty') ans+='30';
          if (k[0]=='forty') ans+='40';
          if (k[0]=='fifty') ans+='50';
          if (k[0]=='sixty') ans+='60';
          if (k[0]=='seventy') ans+='70';
          if (k[0]=='eighty') ans+='80';
          if (k[0]=='ninety') ans+='90';
        }
        else
        {
          if (k[0]=='twenty') ans+='2';
          if (k[0]=='thirty') ans+='3';
          if (k[0]=='forty') ans+='4';
          if (k[0]=='fifty') ans+='5';
          if (k[0]=='sixty') ans+='6';
          if (k[0]=='seventy') ans+='7';
          if (k[0]=='eighty') ans+='8';
          if (k[0]=='ninety') ans+='9';
          if (k[1]=='one') ans+='1';
          if (k[1]=='two') ans+='2';
          if (k[1]=='three') ans+='3';
          if (k[1]=='four') ans+='4';
          if (k[1]=='five') ans+='5';
          if (k[1]=='six') ans+='6';
          if (k[1]=='seven') ans+='7';
          if (k[1]=='eight') ans+='8';
          if (k[1]=='nine') ans+='9';
        }
      }
    }
    else
    {
      var k=t[0].split('-')
      if (k.length==1)
      {
        if (k[0]=='one') ans+='1';
        if (k[0]=='two') ans+='2';
        if (k[0]=='three') ans+='3';
        if (k[0]=='four') ans+='4';
        if (k[0]=='five') ans+='5';
        if (k[0]=='six') ans+='6';
        if (k[0]=='seven') ans+='7';
        if (k[0]=='eight') ans+='8';
        if (k[0]=='nine') ans+='9';
        if (k[0]=='ten') ans+='10';
        if (k[0]=='eleven') ans+='11';
        if (k[0]=='twelve') ans+='12';
        if (k[0]=='thirteen') ans+='13';
        if (k[0]=='fourteen') ans+='14';
        if (k[0]=='fifteen') ans+='15';
        if (k[0]=='sixteen') ans+='16';
        if (k[0]=='seventeen') ans+='17';
        if (k[0]=='eighteen') ans+='18';
        if (k[0]=='nineteen') ans+='19';
        if (k[0]=='twenty') ans+='20';
        if (k[0]=='thirty') ans+='30';
        if (k[0]=='forty') ans+='40';
        if (k[0]=='fifty') ans+='50';
        if (k[0]=='sixty') ans+='60';
        if (k[0]=='seventy') ans+='70';
        if (k[0]=='eighty') ans+='80';
        if (k[0]=='ninety') ans+='90';
      }
      else
      {
        if (k[0]=='twenty') ans+='2';
        if (k[0]=='thirty') ans+='3';
        if (k[0]=='forty') ans+='4';
        if (k[0]=='fifty') ans+='5';
        if (k[0]=='sixty') ans+='6';
        if (k[0]=='seventy') ans+='7';
        if (k[0]=='eighty') ans+='8';
        if (k[0]=='ninety') ans+='9';
        if (k[1]=='one') ans+='1';
        if (k[1]=='two') ans+='2';
        if (k[1]=='three') ans+='3';
        if (k[1]=='four') ans+='4';
        if (k[1]=='five') ans+='5';
        if (k[1]=='six') ans+='6';
        if (k[1]=='seven') ans+='7';
        if (k[1]=='eight') ans+='8';
        if (k[1]=='nine') ans+='9';
      }
    }
    i++;
    var t=[];
    while (i!=arr.length)
      t.push(arr[i++]);
    if (t.length==0)
      ans+='000';
    else {
    var d=false;
    if (t.indexOf('hundred')!=-1)
      d=true;
    if (d)
    {
      if (t[0]=='one') ans+=1;
      if (t[0]=='two') ans+=2;
      if (t[0]=='three') ans+=3;
      if (t[0]=='four') ans+=4;
      if (t[0]=='five') ans+=5;
      if (t[0]=='six') ans+=6;
      if (t[0]=='seven') ans+=7;
      if (t[0]=='eight') ans+=8;
      if (t[0]=='nine') ans+=9;
      
      if (t.length==2)
        ans+='00';
      else
      {
        var k=t[2].split('-')
        if (k.length==1)
        {
          if (k[0]=='one') ans+='01';
          if (k[0]=='two') ans+='02';
          if (k[0]=='three') ans+='03';
          if (k[0]=='four') ans+='04';
          if (k[0]=='five') ans+='05';
          if (k[0]=='six') ans+='06';
          if (k[0]=='seven') ans+='07';
          if (k[0]=='eight') ans+='08';
          if (k[0]=='nine') ans+='09';
          if (k[0]=='ten') ans+='10';
          if (k[0]=='eleven') ans+='11';
          if (k[0]=='twelve') ans+='12';
          if (k[0]=='thirteen') ans+='13';
          if (k[0]=='fourteen') ans+='14';
          if (k[0]=='fifteen') ans+='15';
          if (k[0]=='sixteen') ans+='16';
          if (k[0]=='seventeen') ans+='17';
          if (k[0]=='eighteen') ans+='18';
          if (k[0]=='nineteen') ans+='19';
          if (k[0]=='twenty') ans+='20';
          if (k[0]=='thirty') ans+='30';
          if (k[0]=='forty') ans+='40';
          if (k[0]=='fifty') ans+='50';
          if (k[0]=='sixty') ans+='60';
          if (k[0]=='seventy') ans+='70';
          if (k[0]=='eighty') ans+='80';
          if (k[0]=='ninety') ans+='90';
        }
        else
        {
          if (k[0]=='twenty') ans+='2';
          if (k[0]=='thirty') ans+='3';
          if (k[0]=='forty') ans+='4';
          if (k[0]=='fifty') ans+='5';
          if (k[0]=='sixty') ans+='6';
          if (k[0]=='seventy') ans+='7';
          if (k[0]=='eighty') ans+='8';
          if (k[0]=='ninety') ans+='9';
          if (k[1]=='one') ans+='1';
          if (k[1]=='two') ans+='2';
          if (k[1]=='three') ans+='3';
          if (k[1]=='four') ans+='4';
          if (k[1]=='five') ans+='5';
          if (k[1]=='six') ans+='6';
          if (k[1]=='seven') ans+='7';
          if (k[1]=='eight') ans+='8';
          if (k[1]=='nine') ans+='9';
        }
      }
    }
    else
    {
      var k=t[0].split('-')
      if (k.length==1)
      {
        if (k[0]=='one') ans+='001';
        if (k[0]=='two') ans+='002';
        if (k[0]=='three') ans+='003';
        if (k[0]=='four') ans+='004';
        if (k[0]=='five') ans+='005';
        if (k[0]=='six') ans+='006';
        if (k[0]=='seven') ans+='007';
        if (k[0]=='eight') ans+='008';
        if (k[0]=='nine') ans+='009';
        if (k[0]=='ten') ans+='010';
        if (k[0]=='eleven') ans+='011';
        if (k[0]=='twelve') ans+='012';
        if (k[0]=='thirteen') ans+='013';
        if (k[0]=='fourteen') ans+='014';
        if (k[0]=='fifteen') ans+='015';
        if (k[0]=='sixteen') ans+='016';
        if (k[0]=='seventeen') ans+='017';
        if (k[0]=='eighteen') ans+='018';
        if (k[0]=='nineteen') ans+='019';
        if (k[0]=='twenty') ans+='020';
        if (k[0]=='thirty') ans+='030';
        if (k[0]=='forty') ans+='040';
        if (k[0]=='fifty') ans+='050';
        if (k[0]=='sixty') ans+='060';
        if (k[0]=='seventy') ans+='070';
        if (k[0]=='eighty') ans+='080';
        if (k[0]=='ninety') ans+='090';
      }
      else
      {
        if (k[0]=='twenty') ans+='02';
        if (k[0]=='thirty') ans+='03';
        if (k[0]=='forty') ans+='04';
        if (k[0]=='fifty') ans+='05';
        if (k[0]=='sixty') ans+='06';
        if (k[0]=='seventy') ans+='07';
        if (k[0]=='eighty') ans+='08';
        if (k[0]=='ninety') ans+='09';
        if (k[1]=='one') ans+='1';
        if (k[1]=='two') ans+='2';
        if (k[1]=='three') ans+='3';
        if (k[1]=='four') ans+='4';
        if (k[1]=='five') ans+='5';
        if (k[1]=='six') ans+='6';
        if (k[1]=='seven') ans+='7';
        if (k[1]=='eight') ans+='8';
        if (k[1]=='nine') ans+='9';
      }
    }
    }
  }
  else
  {
    var t=[];
    i=0;
    while (i!=arr.length)
      t.push(arr[i++]);
    
    var d=false;
    if (t.indexOf('hundred')!=-1)
      d=true;
    if (d)
    {
      if (t[0]=='one') ans+=1;
      if (t[0]=='two') ans+=2;
      if (t[0]=='three') ans+=3;
      if (t[0]=='four') ans+=4;
      if (t[0]=='five') ans+=5;
      if (t[0]=='six') ans+=6;
      if (t[0]=='seven') ans+=7;
      if (t[0]=='eight') ans+=8;
      if (t[0]=='nine') ans+=9;
      
      if (t.length==2)
        ans+='00';
      else
      {
        var k=t[2].split('-')
        if (k.length==1)
        {
          if (k[0]=='one') ans+='01';
          if (k[0]=='two') ans+='02';
          if (k[0]=='three') ans+='03';
          if (k[0]=='four') ans+='04';
          if (k[0]=='five') ans+='05';
          if (k[0]=='six') ans+='06';
          if (k[0]=='seven') ans+='07';
          if (k[0]=='eight') ans+='08';
          if (k[0]=='nine') ans+='09';
          if (k[0]=='ten') ans+='10';
          if (k[0]=='eleven') ans+='11';
          if (k[0]=='twelve') ans+='12';
          if (k[0]=='thirteen') ans+='13';
          if (k[0]=='fourteen') ans+='14';
          if (k[0]=='fifteen') ans+='15';
          if (k[0]=='sixteen') ans+='16';
          if (k[0]=='seventeen') ans+='17';
          if (k[0]=='eighteen') ans+='18';
          if (k[0]=='nineteen') ans+='19';
          if (k[0]=='twenty') ans+='20';
          if (k[0]=='thirty') ans+='30';
          if (k[0]=='forty') ans+='40';
          if (k[0]=='fifty') ans+='50';
          if (k[0]=='sixty') ans+='60';
          if (k[0]=='seventy') ans+='70';
          if (k[0]=='eighty') ans+='80';
          if (k[0]=='ninety') ans+='90';
        }
        else
        {
          if (k[0]=='twenty') ans+='2';
          if (k[0]=='thirty') ans+='3';
          if (k[0]=='forty') ans+='4';
          if (k[0]=='fifty') ans+='5';
          if (k[0]=='sixty') ans+='6';
          if (k[0]=='seventy') ans+='7';
          if (k[0]=='eighty') ans+='8';
          if (k[0]=='ninety') ans+='9';
          if (k[1]=='one') ans+='1';
          if (k[1]=='two') ans+='2';
          if (k[1]=='three') ans+='3';
          if (k[1]=='four') ans+='4';
          if (k[1]=='five') ans+='5';
          if (k[1]=='six') ans+='6';
          if (k[1]=='seven') ans+='7';
          if (k[1]=='eight') ans+='8';
          if (k[1]=='nine') ans+='9';
        }
      }
    }
    else
    {
      var k=t[0].split('-')
      if (k.length==1)
      {
        if (k[0]=='one') ans+='1';
        if (k[0]=='two') ans+='2';
        if (k[0]=='three') ans+='3';
        if (k[0]=='four') ans+='4';
        if (k[0]=='five') ans+='5';
        if (k[0]=='six') ans+='6';
        if (k[0]=='seven') ans+='7';
        if (k[0]=='eight') ans+='8';
        if (k[0]=='nine') ans+='9';
        if (k[0]=='ten') ans+='10';
        if (k[0]=='eleven') ans+='11';
        if (k[0]=='twelve') ans+='12';
        if (k[0]=='thirteen') ans+='13';
        if (k[0]=='fourteen') ans+='14';
        if (k[0]=='fifteen') ans+='15';
        if (k[0]=='sixteen') ans+='16';
        if (k[0]=='seventeen') ans+='17';
        if (k[0]=='eighteen') ans+='18';
        if (k[0]=='nineteen') ans+='19';
        if (k[0]=='twenty') ans+='20';
        if (k[0]=='thirty') ans+='30';
        if (k[0]=='forty') ans+='40';
        if (k[0]=='fifty') ans+='50';
        if (k[0]=='sixty') ans+='60';
        if (k[0]=='seventy') ans+='70';
        if (k[0]=='eighty') ans+='80';
        if (k[0]=='ninety') ans+='90';
      }
      else
      {
        if (k[0]=='twenty') ans+='2';
        if (k[0]=='thirty') ans+='3';
        if (k[0]=='forty') ans+='4';
        if (k[0]=='fifty') ans+='5';
        if (k[0]=='sixty') ans+='6';
        if (k[0]=='seventy') ans+='7';
        if (k[0]=='eighty') ans+='8';
        if (k[0]=='ninety') ans+='9';
        if (k[1]=='one') ans+='1';
        if (k[1]=='two') ans+='2';
        if (k[1]=='three') ans+='3';
        if (k[1]=='four') ans+='4';
        if (k[1]=='five') ans+='5';
        if (k[1]=='six') ans+='6';
        if (k[1]=='seven') ans+='7';
        if (k[1]=='eight') ans+='8';
        if (k[1]=='nine') ans+='9';
      }
    }
  
  
  
  }
  return +ans;
}

function parseInt(string) {
  var english = {
    zero:  0,    ten:       10,
    one:   1,    eleven:    11,
    two:   2,    twelve:    12,    twenty:  20,
    three: 3,    thirteen:  13,    thirty:  30,
    four:  4,    fourteen:  14,    forty:   40,
    five:  5,    fifteen:   15,    fifty:   50,
    six:   6,    sixteen:   16,    sixty:   60,
    seven: 7,    seventeen: 17,    seventy: 70,
    eight: 8,    eighteen:  18,    eighty:  80,
    nine:  9,    nineteen:  19,    ninety:  90,
    hundred:  100,
    thousand: 1000,
    million:  1000000
  };
  
  var parts = string.split(/[- ]/).filter(function(word) {
    return word != 'and';
  }).map(function(word) {
    return english[word];
  });
  
  var total = 0;
  var prev = 0;
  
  for (var i = 0, n = parts.length - 1; i <= n; i++) {
    var curr = parts[i];
    if (prev == 0) {
      prev = curr;
    } else if (prev > curr) {
      prev += curr;
    } else {
      prev *= curr;
    }
    
    if (curr >= 1000 || i == n) {
      total += prev;
      prev = 0;
    }
  }
  
  return total;
}

function parseInt(string) {
  const conversionTable = {
  "one" : 1, "two" : 2, "three" : 3, "four": 4, "five" : 5, "six" : 6, "seven" : 7,
  "eight" : 8, "nine" : 9, "ten": 10, "eleven" : 11, "twelve" : 12, "thirteen" : 13,
  "fourteen" : 14, "fifteen" : 15, "sixteen": 16, "seventeen" : 17, "eighteen" : 18,
  "nineteen" : 19, "twenty" : 20, "thirty" : 30, "forty" : 40, "fifty" : 50, "sixty" : 60,
  "seventy" : 70, "eighty" : 80, "ninety" : 90, "zero" : 0
  }
  let result = 0, tempNumber = 0;
  let regex = /(\sand\s|-)+/gi;
  string = string.replace(regex, " ").split(" ");
  
  for (let word of string) {
    word = word.toLowerCase();
    switch (word) {
        case "hundred":
          tempNumber *= 100;
          break;
        case "thousand":
          result += tempNumber * 1000;
          tempNumber = 0;
          break;
        case "million":
          tempNumber *= 1000000;
          break;
        default:
          tempNumber += conversionTable[word];
    }
  }
  result += tempNumber;
  return result;
}

function parseInt(string) {
  // numbers and vriations used in suffixes teen and ty
    var wordNumbers = {
      'zero': 0,
      'one': 1,
      'two': 2,
      'twen': 2,
      'three': 3,
      'thir': 3,
      'four': 4,
      'for': 4,
      'five': 5,
      'fif': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'eigh': 8,
      'nine': 9,
      'ten': 10,
      'eleven': 11,
      'twelve': 12,
    };
    
    var number = 0; // number that will be built
    var total = 0; // partials at 10^3, ^6, ...
    
    var words = string.match(/\w+/g);
  
    for (var w = 0, l = words.length; w < l; w++)
    {
      var word = words[w];
      if (word == 'and') continue;
      if (word == 'thousand') { total += number * 1000; number = 0; continue;}
      if (word == 'million') { total += number * 1000000; number = 0; continue;}
      if (word == 'hundred') { number = number * 100; continue;}
  
      var ty = word.match(/(\w+)ty$/)
      if (ty) { number += wordNumbers[ty[1]] * 10; continue; }
  
      var teen = word.match(/(\w+)teen$/)
      if (teen) { number += wordNumbers[teen[1]] + 10; continue; }
      
      if (typeof wordNumbers[word] != 'undefined') { number += wordNumbers[word]; continue; }
      
      console.error('unrecognized word: ', word)
    }
    return total + number;
  }

  const parseInt = string => {
    var n = 0, 
        g = 0;
    
    function text2num(s) {
      const a = s.toString().split(/[\s-]+/);
      a.forEach(feach);
      return n + g;
    }
    
    const feach = w => {
      let x = numbers[w];
      if (x) g = g + x;
      else if (w == 'hundred') g = g * 100;
      else {
        x = magnitude[w];
        if (x) {
          n = n + g * x;
          g = 0;
        }
      }
    }
  
    return text2num(string);
  }
  
  const numbers = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
  };
    
  const magnitude = {
    'thousand':     1000,
    'million':      1000000,
    'billion':      1000000000,
    'trillion':     1000000000000,
    'quadrillion':  1000000000000000,
    'quintillion':  1000000000000000000,
    'sextillion':   1000000000000000000000,
    'septillion':   1000000000000000000000000,
    'octillion':    1000000000000000000000000000,
    'nonillion':    1000000000000000000000000000000,
    'decillion':    1000000000000000000000000000000000
  };

  function parseInt(string) {
    var arr = string.split(/[\s-]/);
    var result = 0;
    var helper = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
        thirty: 30,
        forty: 40,
        fifty: 50,
        sixty: 60,
        seventy: 70,
        eighty: 80,
        ninety: 90,
        million: function (num) {
            result += num * 1000000;
            return 0;
        },
        thousand: function (num) {
            result += num * 1000;
            return 0;
        },
        hundred: function (num) {
            return num * 100;
        },
        and: 0
    };
    var lastNum = arr.reduce(function (previousValue, currentValue) {
        if (typeof helper[currentValue] === 'number') {
            return previousValue += helper[currentValue];
        } else {
            return helper[currentValue](previousValue);
        }
    }, 0);
    return result + lastNum;
}

let a = 'zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty'.split(','),
    b = '0,1,twenty,thirty,forty,fifty,sixty,seventy,eighty,ninety,hundred,thousand,,,one million'                                                .split(','),
    hash = {},
    X = 20
for (let B of b.slice(2,10)) for (let A of [''].concat(a.slice(1,10))) hash[B+'-'+A] = X++

function parseInt(s) {
  s = s.trim().replace(/ and /g,' ')
  for (let x of [14,11,10])
    if (s.includes(b[x])) 
        return (parseInt(s.slice(0,s.indexOf(b[x])))||1) * 10**(x-8) + (parseInt(s.slice(s.indexOf(b[x])+b[x].length))||0)
        
  return a.includes(s) ? a.indexOf(s) : hash[s]
}

function parseInt(string) {
  var vals = {
    "zero"   :0,  "one"     :1,  "two"      :2,  "three"   :3,  "four"    :4,
    "five"   :5,  "six"     :6,  "seven"    :7,  "eight"   :8,  "nine"    :9,    
    "ten"    :10, "eleven"  :11, "twelve"   :12, "thirteen":13, "fourteen":14,
    "fifteen":15, "sixteen" :16, "seventeen":17, "eighteen":18, "nineteen":19,   
    "twenty" :20, "thirty"  :30, "forty"    :40, "fifty"   :50,
    "fifty"  :50, "sixty"   :60, "seventy"  :70, "eighty"  :80, "ninety"  :90,
    "hundred":100,"thousand":1e3,"million"  :1e6
  }
  var ww = string.replace(/ and /gi, ",").replace(/(\s+|\-)/g,"," ).split(",");
  var e3 = 0;
  var int = ww.reduce( function(i,v){
    var val = vals[v];
    return (val<100 && i+val) || (val==100 && i*100) || (e3=e3+i*val)*0;
  }, 0 )
  return int+e3;
}

const names = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90
}

const multipliers = {
  hundred: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000
}

function parseInt(string) {
  const words = string
    .split(/[ -]/)
    .filter(s => s !== 'and');
    
  let res = 0;
  let stack = [];
  for (let i = 0; i < words.length; i++) {
    const curr = words[i];
    
    if (names[curr]) {
      if (stack.length && stack[stack.length - 1] < 1000) {
        stack.push(stack.pop() + names[curr]);
      } else {
        stack.push(names[curr]);
      }
    } else if (multipliers[curr]) {
      if (stack.length) {
        stack.push(stack.pop() * multipliers[curr]);
      } else {
        stack.push(multipliers[curr]);
      }
    }
  }
  
  return stack.reduce((acc, c) => acc + c, 0);
}

function parseInt(string) {
  const small = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const bigger = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  var result = 0, mult = 0;
  var arr = string
    .replace(/-/g, ' ')
    .replace(/ and /g, ' ')
    .split(' ');
  for (let i = arr.length - 1, p; i >= 0; i--) {
    let elt = arr[i];
    p = small.indexOf(elt);
    if (~p) {
        result += p * Math.pow(10, mult);
        mult++;
    } else { 
        p = bigger.indexOf(elt);
        if (~p) {
            if (i >= arr.length - 1) 
                mult = 1;
            result += p * Math.pow(10, mult);
            mult++;
        } else if (elt === 'hundred') {
            if (i >= arr.length - 2) 
                mult = 2; 
            if (arr[arr.length - 1] === 'thousand') 
                mult = 5;
            if (arr[arr.length - 2] === 'thousand') 
                mult = 5;
        } else if (elt === 'thousand') {
            if (i == arr.length - 3) 
                mult = 5; 
            if (i == arr.length - 1) 
                mult = 3; 
        } else if (elt === 'million') 
            mult = 6;
    }
  }
  return result;
}

function parseInt(string) {
  let result = 0;
  
  const actionWords = {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
  }
  
  const valueWords = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
      thirty: 30,
      fourty: 40,
      forty: 40,
      fifty: 50,
      sixty: 60,
      seventy: 70,
      eighty: 80,
      ninety: 90,
  }
  
  let lastValue = 0;
  
  const splitString = string.split(" ").filter(el => el !== "and");
    
  for (let i = 0; i < splitString.length; i++) {
    if (splitString[i] in valueWords) {
      lastValue += valueWords[splitString[i]];
    }
    
    if (splitString[i] in actionWords) {
      if (splitString[i] === "hundred" && (splitString[i + 2] === "thousand" || splitString[i + 1] === "thousand")) {
        lastValue *= actionWords[splitString[i]];
        continue;
      }
      
      result += lastValue * actionWords[splitString[i]];
      lastValue = 0;
    }
    
    if (/-/.test(splitString[i])) {
      const splitValueString = splitString[i].split("-");
      lastValue += valueWords[splitValueString[0]] + valueWords[splitValueString[1]];
    }
  }
  
  result += lastValue;
  
  return result;
}

// work with all natural positive nums
const parseInt = str => {
  str = str.toLowerCase().replace(/ and |-/g, ' ').trim()
  let res = 0
  const nums1 = {zero:0,one:1,two:2,three:3,four:4,five:5,
      six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,
      thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,
      eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,
      sixty:60,seventy:70,eighty:80,ninety:90,hundred:100},
      nums2 = {quadrillion:5, trillion:4, billion:3, million:2, thousand:1}
  const less1000 = str1 => str1.includes('hundred') ?
      100*nums1[str1.split(' hundred')[0]]+
      (/(hundred)$/g.test(str1)?0:less1000(str1.split('hundred ')[1])):
      str1.split(' ').map(el => nums1[el]).reduce((a, b) => a+b)
  for ( i in nums2 ) {
      if (str.includes(i)) {
          res += 1000**nums2[i]*less1000(str.slice(0, str.indexOf(i)-1))
          str  = str.slice(str.indexOf(i)+i.length).trim()
      }
  }
  if ( str.length != 0 ) res += less1000(str)
  return res
}
