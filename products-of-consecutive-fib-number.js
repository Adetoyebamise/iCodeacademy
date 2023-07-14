/* DESCRIPTION:
The Fibonacci numbers are the numbers in the following integer sequence (Fn):

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

such as

F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

F(n) * F(n+1) = prod.

Your function productFib takes an integer (prod) and returns an array:

[F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)
depending on the language if F(n) * F(n+1) = prod.

If you don't find two consecutive F(n) verifying F(n) * F(n+1) = prodyou will return

[F(n), F(n+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)
F(n) being the smallest one such as F(n) * F(n+1) > prod.

Some Examples of Return:
(depend on the language)

productFib(714) # should return (21, 34, true), 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

productFib(800) # should return (34, 55, false), 
                # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
-----
productFib(714) # should return [21, 34, true], 
productFib(800) # should return [34, 55, false], 
-----
productFib(714) # should return {21, 34, 1}, 
productFib(800) # should return {34, 55, 0},        
-----
productFib(714) # should return {21, 34, true}, 
productFib(800) # should return {34, 55, false}, 
Note:
You can see examples for your language in "Sample Tests".
*/

function fibonacci(number) {
  let a = 1
  let b = 0
  let temporary

  while (number >= 0) {
    temporary = a
    a += b
    b = temporary
    number--
  }

  return b
}

function productFib(prod) {
  let fibonacciOne = fibonacci(0)
  let fibonacciTwo = fibonacci(1)
  let n = 1

  while (fibonacciOne * fibonacciTwo < prod) {
    fibonacciOne = fibonacci(n)
    n++
    fibonacciTwo = fibonacci(n)
  }

  if (fibonacciOne * fibonacciTwo === prod)
    return [fibonacciOne, fibonacciTwo, true]

  fibonacciTwo = fibonacci(n)
  return [fibonacciOne, fibonacciTwo, false]
}

function productFib(prod){
  var n = 0;
  var nPlus = 1;  
  while(n*nPlus < prod) {
    nPlus = n + nPlus;
    n = nPlus - n;
  }
  return [n, nPlus, n*nPlus===prod];
}

function productFib(prod){
  let [a, b] = [0, 1];
  while(a * b < prod) [a, b] = [b, a + b];
  return [a, b, a * b === prod];
}

function productFib(prod){
  var a = 1
  var b = 1;
  while (a*b < prod) {
    var next = a+b;
    a = b;
    b = next;
  }
  return [a, b, a*b===prod];
}

function productFib(prod){
  let a = 0;
  let b = 1;
  for (let i = 0; i < prod; i++) {
    if (a * b > prod) return [a, b, false];
    if (a * b === prod) return [a, b, true];
    [a, b] = [b, a + b];
  }
}

function productFib(prod){
  let num1 = 0,
      num2 = 1;
  
  while(num1 * num2 < prod){
    num2 = num2 + num1
    num1 = num2 - num1
  }
  return [num1, num2, num1 * num2 === prod]
}

function productFib(prod){
  //cache fibonacci numbers
  var fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377,
            610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657,
            46368, 75025, 121393, 196418, 317811, 514229, 832040,
            1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 
            24157817, 39088169, 63245986, 102334155];


  for (var i = 0, j = fib.length; i < j; i++) {
    var x = fib[i] * fib[i + 1];
    
    if (x === prod) {
      return [fib[i], fib[i + 1], true];
    }
    else if (x > prod) {
      return [fib[i], fib[i + 1], false];
    }
  }
}

function productFib( prod ) // mathy way
{
  const r = ( 1 + Math.sqrt(5) ) / 2;
  let fib1 = Math.round( Math.sqrt( prod / r ) ),
  fib2 = Math.round( fib1 * r );
  if ( fib1 * fib2 === prod ) return [ fib1, fib2, true ];
  for ( [fib1, fib2] = [0, 1]; fib1 * fib2 < prod; [fib1, fib2] = [fib2, fib1 + fib2] );
  return [ fib1, fib2, false ];
}

// x = fib(m-1), y = fib(m), n = prod;
// r = ( 1 + Math.sqrt(5) ) / 2; // r = golden ratio
// r = 1 + 1 / r, x * r = y; // properties of golden ratio and fib
// fib(m) * fib(m+1) = n;
// y * ( x + y ) = n;
// y * x + y**2 = n;
// y * y / r + y**2 = n;
// y**2 / r + y**2 = n;
// y**2 * ( 1 + 1 / r ) = n;
// y**2 * r = n;
// y**2 = n / r;
// y = Math.sqrt( n / r );

function productFib(prod){
  var findProd = function(a, b){
    if (a * b == prod) return [a, b, true];
    if (a*b > prod) return [a, b, false];
    return findProd(b, a+b);
  }
  return findProd(0, 1);
}

function productFib(prod){
  let [n,np] = [0,1];
  while (n*np<prod) [n,np] = [np, n+np];
  return [n, np, n*np===prod];
}

const productFib = (prod, n = 0, n1 = 1) =>
  n * n1 >= prod ? [n, n1, n * n1 === prod] : productFib(prod, n1, n + n1);

  function productFib(prod){
    var vFibFirst = 0;
    var vFibSecond = 0;
    var bResult = false;
    var aReturn = [];
    
    for(var i = 1; calcFib(i - 1) * calcFib(i) <= prod; i++) {}
    i--;
    vFibFirst = calcFib(i - 1);
    vFibSecond = calcFib(i);
    
    if(vFibFirst * vFibSecond == prod) bResult = true;
    else 
      {
        bResult = false;
        vFibSecond = vFibSecond + vFibFirst;
        vFibFirst = vFibSecond - vFibFirst;
      }
    
    aReturn.push(vFibFirst);
    aReturn.push(vFibSecond);
    aReturn.push(bResult);
    
    return aReturn;
  }
  
  function calcFib(numb)
  {
    var a = 1;
    var b = 1;
    var c = 2;
    if(numb == 0) c = 0;
    if(numb == 1) c = 1;
    if(numb == 2) c = 1;
    if(numb == 3) c = 2;
    for(var i = 4; i <= numb; i++)
      {
        a = b;
        b = c;
        c = a + b;
      }
    return c;
  }

  function productFib(prod)
{
  for (var [n1, n2] = [0, 1]; n1 * n2 < prod; [n1, n2] = [n2, n1+n2]);
  return [n1, n2, n1 * n2 === prod];
}

function productFib(prod) {
  let a = 0, b = 1;
  while (a * b < prod) [a, b] = [b, a + b];
  return [a, b, a * b === prod];
}

function productFib(prod){
  fib = [0,1];
  while (prod > fib[0]*fib[1]){
    fib.push(fib[0]+fib[1]);
    fib.shift();
  }
  fib.push(prod==fib[0]*fib[1]);
  return fib
}

// recursion

let productFib =f= (prod, a=0, b=1)=> prod <= a*b ? [a, b, prod == a*b] : f(prod, b, a+b)

function productFib(prod){
  let [a, b] = [0, 1];
  while (prod > a * b ) {
    [a, b] = [b, b + a]
  }
  return [a, b, a * b === prod]
}

let productFib=prod=>{
  let before = 0, next = 1;
  do [before,next]=[next,before+next]
  while ( before * next < prod )
  return [before,next,before*next==prod];
}

function productFib(p){
  return (function f(x,y,z){if(x*y>=z)return[x,y,x*y==z];return f(y,x+y,z)})(0,1,p);
}

const productFib = (p, pl = 0, l = 1) =>
p < pl * l ? [pl, l, false] : p === pl * l ? [pl, l, true] : productFib(p, l, pl + l);

function productFib(prod, curr=0, next=1){
  let _prod = curr ? curr * next : next;
  if(_prod === prod) return [curr, next, true];
  if(_prod > prod) return [curr, next, false];
  return productFib(prod, next, curr+next);
}

function productFib(prod, num1=0, num2=1){
  if (num1 * num2 >= prod) {
    return [num1, num2, (num1 * num2 === prod)];
  } else {
    return productFib(prod, num2, num1 + num2);
  }
}

function productFib(prod){
  let contador = 1;
  for (let i = 0; i < contador; i++) {
    contador++;
    const product = F(i) * F(i+1)
    if(product === prod) return [F(i),F(i+1),true]
    if(product > prod) return [F(i),F(i+1),false]
  }
}

function F(n){
  let numberOne = 0;
  let numberTwo = 1;
  let numberThree = n === 0 ? 0 : n === 1 && 1;
  for(let i = 0; i <= n-2; i++) {
    numberThree = numberOne + numberTwo; 
    numberOne = numberTwo;
    numberTwo = numberThree; 
  }
  return numberThree;
}

function productFib(prod, f = [1, 2]) {
  while (f[f.length - 1] * f[f.length - 2] < prod) f.push(f[f.length - 1] + f[f.length - 2]);
  return ( [f[f.length - 2], f[f.length - 1], f[f.length - 1] * f[f.length - 2] === prod]);

}

function productFib(prod){
  const fib = [0,1]
  
  while(fib[fib.length - 1] < prod) {
    const L = fib.length
    fib.push(fib[L - 1] + fib[L - 2]); 
  }
  
  for (let i = 0, n = fib.length; i < n; i++) {
    if ((fib[i] * fib[i+1]) === prod) {
      return ([fib[i],fib[i+1], true]);
    }
    if ((fib[i] * fib[i+1]) > prod) {
      return ([fib[i],fib[i+1], false])
    }

  }
}

