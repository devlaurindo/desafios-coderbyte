function palindrome(str) {
    /* remove special characters, spaces and make lowercase*/
    var removeChar = str.replace(/[^A-Z0-9]/ig, "").toLowerCase();
  
    /* reverse removeChar for comparison*/
    var checkPalindrome = removeChar.split('').reverse().join('');
  
    /* Check to see if str is a Palindrome*/
     return (removeChar === checkPalindrome);
  }