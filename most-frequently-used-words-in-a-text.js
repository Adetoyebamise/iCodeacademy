/**
 * Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

Assumptions:
A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
Matches should be case-insensitive, and the words in the result should be lowercased.
Ties may be broken arbitrarily.
If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
Examples:
top_3_words("In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.")
# => ["a", "of", "on"]

top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
# => ["e", "ddd", "aa"]

top_3_words("  //wont won't won't")
# => ["won't", "wont"]
Bonus points (not really, but just for fun):
  1. Avoid creating an array whose memory footprint is roughly as big as the input text.
  2  Avoid sorting the entire array of unique words.
 */

  function topThreeWords(text) {
    const arr = []
    text = text.toLowerCase().split` `.map(v=>{
      if (v===`'`) return ''
      return v.replace(/[^'a-z]/gi,'')
    }).filter(v=>v)
    const obj = text.reduce((a,b)=>(a[b]=a[b]?a[b]+1:1,a),{})
    for (let i in obj){
      arr.push([i,obj[i]])
    }
    return arr.sort((a,b)=>b[1]-a[1]).slice(0,3).map(v=>v[0])
  }

  // 07.09.2018
let topThreeWords = text => {
  let dict = new Map();
  text.replace(/[A-z']+(?=[ ]+|$)/g, match => {
      let word = match.toLowerCase();
      dict.set(word, dict.has(word) ? dict.get(word) + 1 : 1);
  });
  dict.delete("'");
  return [...dict].sort((a, b) => b[1] - a[1]).map(a => a[0]).slice(0, 3);
};

function topThreeWords(text) {
  let words = {}
  text.toLowerCase().replace(/([A-Za-z][A-Za-z']*)/g, match => {
    let c = words[match] || 0
    words[match] = ++c
  })
  return Object
          .keys(words)
          .sort(function(a,b){return words[b]-words[a]})
          .slice(0,3)
}

const topThreeWords = text => {
  let total = (text.toLowerCase().match(/\b[a-z']+\b/g)||[]).reduce((acc,cur) => (acc[cur] = (acc[cur]||0) + 1, acc), {});
  return Object.keys(total).sort((a,b) => total[b] - total[a]).slice(0,3);
};

function topThreeWords(text) {
  text = text.replace(/\,/g, '')
  text = text.replace(/\./g, '')
  text = text.replace(/\?/g, '')
  text = text.replace(/\!/g, '')
  text = text.replace(/  /g, ' ')
  text = text.replace(/\\/g, '')
  text = text.replace(/\//g, '')
  text = text.trim()
  text = text.toLowerCase()
  array = text.split(' ')
  hash = {}

  // return if just ''
  if (array[0] == '') return []

  // put in hash
  for (word of array) {
    if (word in hash) {
      hash[word] += 1
    }
    else hash[word] = 1
  }

  // get rid of single quote matches
  delete hash["'"]

  // copy to array
  let arrayToSort = []
  for (key in hash) arrayToSort.push([key, hash[key]])

  // sort the array by frequency
  let sorted = arrayToSort.sort((a, b) => b[1] - a[1])

  // get the top three
  let result = []
  for (let i = 0; i < 3; i += 1) {
    if (sorted[i]) result.push(sorted[i][0])
  }
  return result
}

function topThreeWords(text) {
  const occurences = text
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .split(/\s+/)
    .filter(w => w)
    .filter(w => w !== "'")
    .reduce((acc, v) => {
      acc[v] = (acc[v] || 0) + 1
      return acc
    }, {})
 
  return Object.entries(occurences)
    .sort((a,b) => b[1] - a[1])
    .map(c => c[0])
    .slice(0,3)
}

function topThreeWords(text) {
  let words = {}
  text.toLowerCase().replace(/([A-Za-z][A-Za-z']*)/g, match => {
    let c = words[match] || 0
    words[match] = ++c
  })
  keysSorted = Object.keys(words).sort(function(a,b){return words[b]-words[a]})
  return keysSorted.slice(0,3)
}

const topThreeWords = text => {
  const obj = {};
  text.toLowerCase().replace(/(\w'?)+/g, val => (obj[val] = -~obj[val], val));
  return Object.keys(obj).sort((a, b) => obj[b] - obj[a]).slice(0, 3);
};

topThreeWords=(a,b=a.toLowerCase().split(/[ ,./]+/))=>b.filter((e,i)=>i==b.indexOf(e)).filter(a=>/[a-z]+/.test(a)).map(a=>[a,b.filter(b=>b==a).length]).sort((a,b)=>b[1]-a[1]).slice(0,3).map(a=>a[0]);


class TextParser {

  constructor(breakSymbs) {
    const toMap = (map, symb) => map[symb] = 1 && map;
    this.dict = breakSymbs.reduce(toMap, {});
  }
  
  topThreeWords(text) {
    const top = {};
    text += ' ';
    
    for(let i = 0, word = ''; i < text.length; i++) {
      const symbol = text[i].toLowerCase();
      const inDict = !!(this.dict[symbol]);

      if(inDict && word && word != "'") 
        top[word] = top[word] ? top[word] + 1 : 1;
      
      word = inDict ? '' : word += symbol;
    }
    
    return this.extractWords(top);
  }
  
  extractWords(top) {
      const byCount = (l, r) => top[r] - top[l];
      
      return Object
        .keys(top)
        .sort(byCount)
        .slice(0, 3);
  }
  
}

const breakSymbs = [' ', ',', '.', '\/', '/',];
const textParser = new TextParser(breakSymbs);
const topThreeWords = textParser.topThreeWords.bind(textParser);