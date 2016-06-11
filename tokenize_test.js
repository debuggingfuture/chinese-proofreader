// 载入模块
var Segment = require('segment');
// 创建实例
var segment = new Segment();

// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
//dynamic load
var dicts = require.context('./dict',false,/.*txt$/);
// segment.loadDict(dicts('./jieba.txt'));

var examples = require('./examples');

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

// 开始分词
console.log(examples);

console.log(segment.doSegment(examples[0]));
console.log(segment.doSegment('这是一个基于Node.js的中文分词模块。'));
