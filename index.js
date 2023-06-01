/*A string is considered to be in title case if each word in the string is either (a) capitalised (that is, only the first letter of the word is in upper case) or (b) considered to be an exception and put entirely into lower case unless it is the first word, which is always capitalised.

Write a function that will convert a string into title case, given an optional list of exceptions (minor words). The list of minor words will be given as a string with each word separated by a space. Your function should ignore the case of the minor words string -- it should behave in the same way even if the case of the minor word string is changed.

###Arguments (Haskell)

First argument: space-delimited list of minor words that must always be lowercase except for the first word in the string.
Second argument: the original string to be converted.
###Arguments (Other languages)

First argument (required): the original string to be converted.
Second argument (optional): space-delimited list of minor words that must always be lowercase except for the first word in the string. The JavaScript/CoffeeScript tests will pass undefined when this argument is unused.
###Example

titleCase('a clash of KINGS', 'a an the of') // should return: 'A Clash of Kings'
titleCase('THE WIND IN THE WILLOWS', 'The In') // should return: 'The Wind in the Willows'
titleCase('the quick brown fox') // should return: 'The Quick Brown Fox'
*/

// Solution : 
const capitalizeFirstWord = (wordle) => {
    //state of the first letter in the string
    newCapitalizeWord = []
    newCapitalizeWord.push(wordle[0].toUpperCase())
    //state of the rest on the other string
    for( index = 1; index < wordle.length; index++){
    newCapitalizeWord.push(wordle[index])
    }
    return newCapitalizeWord.join("")
  }
  
  console.log(capitalizeFirstWord("kilofeshe"))
  
  const changeTitleCase = (title, minorWords) => {
    if(title) {
      const minorArray = minorWords ? minorWords.split(" ").map(wordle => wordle.toLowerCase()) : [""]
      titleArray = title.split(" ")      // have an arrray prpotype to tweak
      finalTitle = []
      titleArray.map(wordle => {
        if(minorArray.includes(wordle.toLowerCase())) {
        finalTitle.push(wordle.toLowerCase())
        } else {
        finalTitle.push(capitalizeFirstWord(wordle))
      }
    })
    finalTitle[0] = capitalizeFirstWord(finalTitle[0])
    return finalTitle
    } else return title
  }
  
  console.log(changeTitleCase("all things must pass", "nice vibes"))