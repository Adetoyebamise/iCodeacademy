// The main idea is to count all the occurring characters in a string. If you have a string like aba, then the result should be {'a': 2, 'b': 1}.

// What if the string is empty? Then the result should be empty object literal, {}.
function count(string) {
  // TODO
  let cache = {}
  string.split("").map(content => (cache[content] = cache[content] + 1 || 1))
  return cache
}

console.log("count", count("adrenaline"))

const count =
  string =>
    string.split("").reduce(
      (acc, val) => (acc[val] ? (acc[val]++) : (acc[val]=1), acc),
      {}
    );

    function count (string) {  
      return string.split("").reduce(function (counts, char) {
        counts[char] = ++counts[char] || 1;
        return counts;
      }, {});
    }

    function count(str) {  
      return (m = {}, str.split('').forEach((c) => m[c] = (m[c] || 0) + 1), m);
   }

   function count (string) {  
    return string.split('').reduce(function(o,v){ o[v] ? o[v]++ : (o[v] = 1); return o; }, {});
  }

  function count (string) {  
    let result = {};
  
    for(let i = 0; i < string.length; i++) {
      result[string[i]] = result[string[i]] + 1 || 1;
    }
  
  return result;
  }

  function count (string) {  
    var newString=string.toLowerCase();
    var characterCount={};
    var alphabets="abcdefghijklmnopqrstuvwxyz";
    function countPos(char){
      var count=0;
      var pos=newString.indexOf(char);
      while(pos!==-1){
        count++;
        pos = newString.indexOf(char, pos + 1);
      }
      return count;
    }
    for(var i=0; i<alphabets.length; i++)
    {
      var value=countPos(alphabets.charAt(i));
      if(value){
        characterCount[alphabets.charAt(i)]=value;
      }
    }
    return characterCount;
  }

  function count (string) {  
    var a = {};
    for (var i = 0 ; i< string.length; i++){
      a[string[i]]?a[string[i]]++:a[string[i]]=1;
    }
    return a;
 }

 