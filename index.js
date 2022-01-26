function checkForFactor (base, factor) {
    return base%factor===0
  }
  
  if (checkForFactor(7, 2) == true) {
    console.log("the base has a factor")
  } else {
    console.log("the base is not a factor")
  }
  
  // const checkForFactor = (base , factor) => {
  // return base % factor === 1
  // }
  
  // checkForFactor(7,2)