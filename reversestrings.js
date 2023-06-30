// Given a string str, reverse it and omit all non-alphabetic characters.

// Example
// For str = "krishan", the output should be "nahsirk".

// For str = "ultr53o?n", the output should be "nortlu".

// Input/Output
// [input] string str
// A string consists of lowercase latin letters, digits and symbols.

// [output] a string

const solution = str =>
  str
    .replace(/[^a-z]+/gi, '')
    .split('')
    .reverse()
    .join('')
console.log("solution" , solution("0gzxxis__8ej5qz}[h0bunc^k*lh$vm7u&ds{cd_4"))