/*
This function should test if the factor is a factor of base.

Return true if it is a factor or false if it is not.

About factors
Factors are numbers you can multiply together to get another number.

2 and 3 are factors of 6 because: 2 * 3 = 6

You can find a factor by dividing numbers. If the remainder is 0 then the number is a factor.
You can use the mod operator (%) in most languages to check for a remainder
For example 2 is not a factor of 7 because: 7 % 2 = 1

Note: base is a non-negative number, factor is a positive number.
*/

// solution 1
const checkForFactor = (base, factor) => {
    return base % factor === 0
}
  if (checkForFactor(7, 2) == true) {
    console.log("the base has a factor")
  } else {
    console.log("the base is not a factor")
  }

// solution 2
  const checkForFactor = (base , factor) => {
  return base % factor === 1
  }
  checkForFactor(7,2)
