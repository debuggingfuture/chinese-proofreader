import engine from './engine/engine';
import segment from './engine/segment';
import _ from 'lodash';

import POSTAG from 'segment/lib/POSTAG.js';
import {matchMixedPunctuation} from './engine/mixed';

// 开始分词
// console.log(examples);
//

//TODO dynamic algo later
//TODO more relastic POS detection
function checkSlideWindow(sw) {
  if(sw.length>=2){
    return (_.includes([POSTAG.D_V,0],sw[0].p))
     && (_.includes([POSTAG.D_V,0],sw[1].p))
  }
  return false;

}
//get all at once
// find consecutive single char & break again? but rest nouns also important

export default class ProofReader {
  constructor() {
  }
  findNewWords(text) {
    let words = engine.doSegment(text,  {
        stripStopword: false
      });
    let slideWindow = [];
    let found = [];
    console.log(words);
    for(var i=0;i<words.length;i++){
        if(words[i].w.length === 1 && words[i].p !== POSTAG.D_W && words[i].p !== 'stop'){
          slideWindow.push(words[i]);
        } else {
          if(checkSlideWindow(slideWindow)){
            found.push(slideWindow);
          }
          slideWindow = [];
        }
      }
    return found.map(sw=>{
      return {
        pos: 0,
        word: sw.map(w=>w.w).join('')
      }
    });
  }
  proofread(textByHash) {
    var words = [];
    var mixed = [];

    _.forEach(textByHash, (v,k)=>{
      var newWords = this.findNewWords(v);
      console.log('newWords');

      if(!_.isEmpty(newWords)){
              console.log(newWords);
        words.push({
          'hash': k,
          'words': newWords
          // newWords
        });
      }

      mixed.push({
        'hash': k,
        'words': matchMixedPunctuation(v)
      });
      console.log('mixed');
      console.log(mixed);
    });
    return {
      words: words,
      mixedPunctuation: mixed
    };
  }
}
