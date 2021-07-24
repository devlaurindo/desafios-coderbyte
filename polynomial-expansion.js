 function PolynomialExpansion(str) { 
  
   var variable = str.match(/[a-zA-Z]/gi)[0];
  
   function clean(str, arr) { // converts str = "ax^b + cx + d" into [[a, c, d], [b, 1 0]] and stored into arr
     var c = 0; // coefficient
     var e = 1; // exponential
     var regex = new RegExp("(\\+|-)?[0-9]+" + variable + "?(\\^(\\+|-)?[0-9]+)?", "i");
   var match = str.match(regex); // find anything of the form +ax^b
     var term = match[0];
    
     var ce; // store array [a, b]
     if(term.indexOf('^') !== -1)
       ce = term.split(variable + '^').map(Number);
     else {
       ce = term.split(variable).map(Number);
       if(term.indexOf(variable) !== -1) ce[1] = 1; // if x to power of 1
     }
   if(ce.length === 1) ce.push(0); // if no x
    
     arr[c].push(ce[c]);
     arr[e].push(ce[e]);
    
     if(str.length === match[0].length)
       return;
       
     clean(str.substring(match.index + match[0].length), arr);
    }
  
   function expand(arr) {
     if(arr.length === 1)
       return arr[0];
    
     var first = arr[0];
     var second = arr[1];
     var result = [[],[]];
    
     arr.shift(); // remove first element
     arr[0] = result;
    
     for(var i = 0; i < first[0].length; i ++) {
       for(var j = 0; j < second[0].length; j ++) {
         var rCoeff = first[0][i] * second[0][j]; // coefficient
         var rExp = first[1][i] + second[1][j]; // exponent
      
         var rCoeffIndex = result[1].indexOf(rExp);
         if(rCoeffIndex === -1) {
           result[0].push(rCoeff);
           result[1].push(rExp);
         } 
         else {
           result[0][rCoeffIndex] += rCoeff;
           if(result[0][rCoeffIndex] === 0) { // remove term if coefficient is 0
             result[0].splice(rCoeffIndex,1);
             result[1].splice(rCoeffIndex,1);
            }
        }
       }
     }
    
     // sort by exponent
     var sortedExp = result[1].slice().sort(function(a, b) { return b - a; });
   var sortedCoeff = result[0].slice();
     sortedCoeff.forEach(function(element, index, array) {
       array[index] = result[0][result[1].indexOf(sortedExp[index])]; 
     });
     arr[0] = [sortedCoeff, sortedExp];
    
     return expand(arr);   
    }
  
   // take input string, convert to array
   var strArr = str.split(')(').map( function(a) { return a.replace(/[\(\)]/gi, ""); });
   var arr = [];
   for(var i = 0; i < strArr.length; i ++) {
   if(arr[i] === undefined) arr[i] = [[],[]];
     clean(strArr[i], arr[i], variable);
    }
  
   // expand using array
   var resultArr = expand(arr);
  
   // convert to proper string
   var expanded = '';
   for(var i = 0; i < resultArr[0].length; i ++) {
     var coeff = resultArr[0][i];
     var exp = resultArr[1][i];
    
     if(expanded.length !== 0 && coeff > 0) expanded += '+';
     if(Math.abs(coeff) > 1) expanded += coeff;
  
     if(exp !== 0) {
       expanded += variable;
       if(exp !== 1)
       expanded += '^' + exp;
     }
    }
  
   return expanded;
 }

 function PolynomialExpansion(str) {
     var regex = /[+-]?[0-9][a-z]?(\^-?[0-9]*)?/g;
     var expRegexp = /([+-]?[0-9])([a-z])?\^?(-?[0-9]*)?/g;
     var partsStr = str.split(')(');

     var parts = [[], []];
     var letterPolynome = '';
     function getParts(parts, destList) {
         for (p of parts) {
             var expParts = new RegExp(expRegexp).exec(p);
             var mult = expParts[1];
             var letter = expParts[2];
             if (!letterPolynome && letter)
                 letterPolynome = letter;
             var power = expParts[3];
             var dest = 0;
             if (letter && power !== 0) {
                 dest += Number(power || 1);
             }
             destList.push([dest, Number(mult)]);
         }
     }
     getParts(partsStr[0].match(regex), parts[0]);
     getParts(partsStr[1].match(regex), parts[1]);

     var map = new Map();
     for (p1 of parts[0])
         for (p2 of parts[1]) {
             var mult = p1[0] + p2[0];
             var exist = 0
             if (map.has(mult))
                 exist = map.get(mult)
             map.set(mult, p1[1] * p2[1] + exist);
         }

     var polynome = [];
     for (m of map) {
         polynome.push(m);
     }
     polynome.sort((a, b) => b[0] - a[0]);
     var res = "";
     for (p of polynome) {
         if (res != '' && p[1] > 0)
             res += '+'
         if (p[1] != 1 || p[0] == 0) {
             res += p[1]
         }
         if (p[0]) {
             res += letterPolynome;
             if (p[0] != 1)
                 res += '^' + p[0];
         }
     }

     // code goes here  
     return res;

 }