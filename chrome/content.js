/*
* @Author: lu
* @Date:   2016-06-11 14:09:30
* @Last Modified by:   han4wluc
* @Last Modified time: 2016-06-11 18:39:26
*/

// var tokenize = function(inputText){
  // if(inputText.includes('教育')){
  //   var newHtml = replace(node.nodeValue, '教育');
  // }
// }

// console.log($('body').text());

var ProofReader = {
  proofread: function(hashes){

    var words = [{
      pos: 123,
      word: '国外'
    },
    {
      pos: 123,
      word: '产品'
    }];

    var words2 = [{
      pos: 123,
      word: '教育'
    },
    {
      pos: 123,
      word: '出'
    }];

    var hashObjects = [];
    for (var key in hashes){
      hashObjects.push({
        hash: key,
        paragraph: hashes[key]
      });
    }
    var wrongWords = hashObjects.map(function(hashObj){
      return {
        hash: hashObj.hash,
        words: words
      }
    });
    var mixedPunctuation = hashObjects.map(function(hashObj){
      return {
        hash: hashObj.hash,
        words: words2,
      }
    });

    return {
      words: wrongWords,
      mixedPunctuation: mixedPunctuation,
    }
  }
}

var entireContent = $('body').text();

var getWrongWords = function(input){
  return ['教育', '购了', '中自'];
}

var replace = function(inputText, replaceWord){
  var regex = new RegExp(replaceWord, 'g');
  var replaceResult = '<span class="error-underline">' + replaceWord + '<span class="tooltiptext">Grammar Error</span>' + '</span>';
  // var replaceResult = '<span class="error-underline">' + replaceWord + '</span>';
  return inputText.replace(replaceWord, replaceResult);
}

var paragraphs = {};
var hashes = {};

function recursiveReplace(node) {

  // $(node).addClass('gfsd');
  // console.log(node);

  if (node.nodeType == 3 && node.nodeValue.trim().length > 2) { // text node

    // console.log(node);

    var paragraph = node.nodeValue.trim();

    var hash = 'h' + (Math.random()+'').substring(2);

    paragraphs[hash] = paragraph;
    hashes[hash] = paragraph;
    // hashes.push({
    //   hash: hash,
    //   paragraph: paragraph,
    // });

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

// var expected = analyzeWrongWords(hashes);
// console.log('hashes', hashes)
var expected = ProofReader.proofread(hashes);

// console.log('expected', expected);

// expected.words,  expected.mixedPunctuations
var joinWordsAndPunc = function(words, mixedPunctuations){

  var combinedObjects = words.concat(mixedPunctuations);

  var uniqueCombinedObjectes = [];

  combinedObjects.forEach(function(wrongObj){
    var hashes = uniqueCombinedObjectes.map(function(object){
      return object.hash;
    })
    var index = hashes.indexOf(wrongObj.hash);
    if(index === -1){
      uniqueCombinedObjectes.push(wrongObj);
    } else {
      uniqueCombinedObjectes[index].words = uniqueCombinedObjectes[index].words.concat(wrongObj.words);
    }
  });

  console.log('combined', uniqueCombinedObjectes);
  return uniqueCombinedObjectes;
}

// var wrongWordsObj = expected.words;
var wrongWordsObj = joinWordsAndPunc(expected.words, expected.mixedPunctuation);
  console.log('wrongWordsObj', wrongWordsObj);

wrongWordsObj.forEach(function(wordObj){
  var node = $('.'+wordObj.hash);
  var paragraph = node.text();


  var newHtml = paragraph;
  wordObj.words.forEach(function(wordWithPos){
    //todo use position
    newHtml = replace(newHtml, wordWithPos.word);
  });
 
  // ['国外', '教育', '这个', '媒体'].forEach(function(word){
  //   //todo use position
  //   newHtml = replace(newHtml, word);
  // });


  // console.log(newHtml);
  node.html(newHtml);
})

// ['国外', '教育'].forEach(function(word){
//   //todo use position
//   newHtml = replace(newHtml, word);
// });

// setTimeout(function(){
//   hashes.forEach((function(hash){
//     var node = $('.'+hash);
//     var paragraph = node.text();
//     var newHtml = replace(paragraph, '教育');
//     node.html(newHtml);
//   }))
// },100)

// console.log('paragraphs', paragraphs);

