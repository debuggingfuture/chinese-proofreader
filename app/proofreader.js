import engine from './engine/engine';
import _ from 'lodash';
export default class ProofReader {
  constructor() {
  }
  findNewWords(text) {
    return engine.doSegment(text).filter(v=>_.isUndefined(v.p)).map(v=>
      {
        return {
          'pos': 0,
          'word': v.w
        }

    });
  }
  proofread(textByHash) {
    var words = [];

    _.forEach(textByHash, (v,k)=>{
      var newWords = this.findNewWords(v);
      console.log(newWords);
      words.push({
        'hash': k,
        'words': newWords
        // newWords
      });
    });
    return {
      words: words
    };
  }
}
