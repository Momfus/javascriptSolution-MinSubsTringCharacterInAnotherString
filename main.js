/* Exercise:

   I have the function MinWindowSubstring(StrArr) that take the array of strings stores in strArr, which will contain only two strings, the first paramter being the
string N and the second parameter being a string K of some characters, and your goal is to determine the smallest substring of N that contains all the characters in K.
For example: if strArr is ["aaabaaaddae", "aed"] then the smallest substring of N that contains the characters a,e, and d is "dae" located at the end of the string.
So for this example your programa should return the string dae.

ANother example: if strArr is ["aabdccdbcacd", "aad"] then the smallest substring of N that contains all of the characters in K is "aabd" which is located at the 
beggining of the string. Both parameters will be strings raning in length from 1 to 50 characters and all of K's characters will exist somewhere in the string N. 
Both string will only contains lowercase alphabetic characters.

*/

function MinWindowSubstring(StrArr) {
   const N = StrArr[0];
   const K = StrArr[1];
 
   // Initialize variables to store the start and end indices of the smallest substring
   let start = 0;
   let end = N.length;
 
   // Initialize a variable to store the character frequencies in the substring
   let substringCharCount = getCharCount(K);
 
   // Initialize variables to store the start and end indices of the current substring
   let substringStart = 0;
   let substringEnd = 0;
 
   // Initialize a variable to store the character frequencies in the current substring
   let currentCharCount = {};
 
   for (let i = 0; i < N.length; i++) {

     // Add the current character to the current substring
     const char = N[i];

     currentCharCount[char] = countCharacterValue(currentCharCount, char);

     substringEnd++;
 
     // Check if the current substring contains all the characters in K
     while (containsAllChars(substringCharCount, currentCharCount)) {
       // Update the start and end indices of the smallest substring if necessary
       if (substringEnd - substringStart < end - start) {
         start = substringStart;
         end = substringEnd;
       }
 
       // Remove the first character from the current substring
       const firstChar = N[substringStart];
       currentCharCount[firstChar]--;
       substringStart++;
     }
   }
 
   // Return the smallest substring
   return N.substring(start, end);
 }

// <<< Helpers functions >>>

// get the character count for a given string
function getCharCount(str) {
  const charCount = {};
  for (const char of str) {

  charCount[char] = countCharacterValue(charCount, char);

  }
  return charCount;
}

// Helper function to check if a given character count object contains all the characters in another character count object
function containsAllChars(charCount1, charCount2) {
  for (const char in charCount1) {
    if (!charCount2[char] || charCount2[char] < charCount1[char]) {
      return false;
    }
  }
  return true;
}

// Small helper to count the characters in an specific count character object
function countCharacterValue(countCharObject, char){

  return (!countCharObject[char] )? 1: ( countCharObject[char] + 1 );

}