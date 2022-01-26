/*Create a function taking a positive integer as its parameter and returning a string containing the Roman Numeral representation of that integer.

Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

Example:

solution(1000); // should return 'M'

Help:

Symbol    Value
I          1
V          5
X          10
L          50
C          100
D          500
M          1,000
Remember that there can't be more than 3 identical symbols in a row.

More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals

*/

// Solution 1
const solution = (value, sign="") => {
    if (value >= 1000) {
      sign += "M"        //concat. assignment
      value -= 1000      //subtr. assignment
    } else if (value >= 900) {
      sign += "CM"
      value -= 900
    } else if(value >= 600) {
      sign += "DC"
      value -= 600
    } else if(value >= 50) {
      sign += "L"
      value -= 50
    }
    // ... create for every condition 
    return value ? solution(value, sign) : sign
  }
  
  //call function and log
  console.log(solution(700, "The answer is: "))


// solution 2
const solution = (value) => {
    const roman = { M : 1000, CM: 900, DCCC : 800, DCC : 700, DC: 600, D : 500, CD : 400, CCC : 300, CC : 200, C : 100, XC : 90, CXXX: 80,  CXX :70, CX : 60, L: 50, XL: 40, XXX: 30, XX: 20, X:10, IX:9, XVIII: 8, VII:7, V1 : 6, V : 5, IV : 4, III: 3, II: 2, I: 1 }

    
}

// solution 3
const romanNumeralDecoder = (number) => {


}
