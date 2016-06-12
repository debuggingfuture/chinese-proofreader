//Quick hack before webpack fix
function extendIfNode() {

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
    var isNode = false;
    // Export the Underscore object for **CommonJS**, with backwards-compatibility
    // for the old `require()` API. If we're not in CommonJS, add `_` to the
    // global object.
    if (typeof __webpack_require__ !== 'function') {
            isNode = true;

            var fs = require('fs');

            require.extensions['.txt'] = function (module, filename) {
                module.exports = fs.readFileSync(filename, 'utf8');
            };
    } else {
    }
}
extendIfNode();

// 载入模块
var Segment = require('segment');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();


segment.loadDict(require('../../dict/jieba.txt'),true);
segment.loadDict(require('../../dict/dict2.txt'),true);
segment.loadDict(require('../../dict/dict3.txt'),true);

segment.loadStopwordDict(require('../../dict/check_stop_words.txt'),true);

segment.use({

  // 类型
  type: 'optimizer',

  // segment.use() 载入模块，初始化时执行
  init: function (segment) {
    console.log('init Opt');
    // segment 为当前的Segment实例
  },

  // 优化
  doOptimize: function (words) {

    //TODO dynamic algo later
    // function checkSlideWindow(sw) {
    //   if(sw.length>=2){
    //     return (sw[0].p === 0 && sw[0].w.length ===1)
    //      && (sw[1].p  === 0 && sw[1].w.length ===1)
    //   }
    //   return false;
    //
    // }
    // console.log('doOptimize');
    // console.log(words);
    // console.log('endOptimize');
    // //get all at once
    // // find consecutive single char & break again? but rest nouns also important
    // var slideWindow = [];
    // for(var i=0;i<words.length;i++){
    //   if(words[i].p === 0 && words[i].w.length === 1){
    //     slideWindow.push(words[i]);
    //   } else {
    //     slideWindow = [];
    //   }
    //   if(checkSlideWindow(slideWindow)){
    //     // console.log('window!');
    //     // console.log(slideWindow);
    //   }
    // }

    // console.log(words);
    // words 为分词结果的单词数组，如：[{w: '中文', p: 1048576}, {w: '分词', p: 4096}]
    // 返回一个新的数组用来替换旧的数组
    return words;
  }

})

// var examples = require('./examples');


// TODO port back
function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

export default segment;
