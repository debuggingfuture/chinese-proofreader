/*
* @Author: lu
* @Date:   2016-06-11 14:09:30
* @Last Modified by:   han4wluc
* @Last Modified time: 2016-06-11 17:19:54
*/

// var tokenize = function(inputText){
  // if(inputText.includes('教育')){
  //   var newHtml = replace(node.nodeValue, '教育');
  // }
// }

// console.log($('body').text());
var entireContent = $('body').text();

var getWrongWords = function(input){
  return ['教育', '购了', '中自'];
}

var replace = function(inputText, replaceWord){
  var regex = new RegExp(replaceWord, 'g');
  var replaceResult = '<span class="error-underline">' + replaceWord + '</span>';
  return inputText.replace(replaceWord, replaceResult);
}

var paragraphs = {};
var hashes = [];

function recursiveReplace(node) {

  // $(node).addClass('gfsd');
  // console.log(node);

  if (node.nodeType == 3 && node.nodeValue.trim().length > 2) { // text node

    // console.log(node);

    var paragraph = node.nodeValue.trim();

    var hash = 'h' + (Math.random()+'').substring(2,5);

    paragraphs[hash] = paragraph;
    hashes.push(hash);

    $(node).parent().addClass(hash);

    // var wrongWords = getWrongWords(paragraph);

    // var newHtml = paragraph;
    // wrongWords.forEach(function(value){
    //   newHtml = replace(newHtml, value);
    // })

    // $(node).replaceWith(newHtml);

  } else if (node.nodeType == 1) { // element
    $(node).contents().each(function () {
        recursiveReplace(this);
    });
  }
}

recursiveReplace(document.body);

var analyzeWrongWords = function(){
  var expected = {
    "words":[
      {
        "hash":"aaa",
        "words":[{
          pos: 123,
          word: '国外'
        },
        {
          pos: 123,
          word: '产品'
        }]
      },
      {
        "hash":"bbb",
        "words":[{
          pos: 123,
          word: '教育'
        }]
      }
    ],
  }
  return expected;
}

var expected = analyzeWrongWords(hashes);



var wrongWordsObj = expected.words;
wrongWordsObj.forEach(function(wordObj){
  var node = $('.'+wordObj.hash);
  var paragraph = node.text();

  var newHtml = paragraph;
  wordObj.words.forEach(function(wordWithPos){
    //todo use position
    newHtml = replace(newHtml, wordWithPos.word);
  });
  node.html(newHtml);
})

// setTimeout(function(){
//   hashes.forEach((function(hash){
//     var node = $('.'+hash);
//     var paragraph = node.text();
//     var newHtml = replace(paragraph, '教育');
//     node.html(newHtml);
//   }))
// },100)

// console.log('paragraphs', paragraphs);

