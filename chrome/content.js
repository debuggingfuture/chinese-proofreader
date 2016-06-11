/*
* @Author: lu
* @Date:   2016-06-11 14:09:30
* @Last Modified by:   han4wluc
* @Last Modified time: 2016-06-11 15:36:44
*/

// var tokenize = function(inputText){
  // if(inputText.includes('教育')){
  //   var newHtml = replace(node.nodeValue, '教育');
  // }
// }

var getWrongWords = function(){
  return ['教育', '购了', '中自'];
}

var replace = function(inputText, replaceWord){
  var regex = new RegExp(replaceWord, 'g');
  var replaceResult = '<span class="error-underline">' + replaceWord + '</span>';
  return inputText.replace(replaceWord, replaceResult);
}

function recursiveReplace(node) {
  if (node.nodeType == 3) { // text node

    var wrongWords = getWrongWords();

    var newHtml = node.nodeValue;
    wrongWords.forEach(function(value){
      newHtml = replace(newHtml, value);
    })

    $(node).replaceWith(newHtml);
    
  } else if (node.nodeType == 1) { // element
    $(node).contents().each(function () {
        recursiveReplace(this);
    });
  }
}

recursiveReplace(document.body);
