// The main idea is to count all the occurring characters in a string. If you have a string like aba, then the result should be {'a': 2, 'b': 1}.

// What if the string is empty? Then the result should be empty object literal, {}.
function count(string) {
  // TODO
  let cache = {}
  string.split("").map(content => (cache[content] = cache[content] + 1 || 1))
  return cache
}

console.log("count", count("adrenaline"))
