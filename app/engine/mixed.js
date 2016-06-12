// https://zh.wikipedia.org/zh-hk/%E5%85%A8%E5%BD%A2%E5%92%8C%E5%8D%8A%E5%BD%A2
//TODO add more

// ,
// .
// ;
// +
// -
// |
// /
// \
// '
// "
// :
// ?
// <
// [
// ]
// {
// }
// !
// @
// #
// $
// %
// ^
// &
// *
// (
// )
// ~
// `
// 　
// ，
// 。
// ；
// ‘
// ’
// “
// ”
// ／
// ？
// ～
// ！
// ＠
// ＃
// ￥
// ％
// ……
// ＆
// ×
// （
// —）
// 【
// 】
// ｛
// ｝
// ｜
// 、
// 《
// 》
// ：
export const isHalfWidth = function (str, i) {
  let code = str.charCodeAt(i);
  return (code >= 33 && code <= 47) || (code >= 58 && code <= 64);
};

export const isFullWidth = function (str, i) {
  let code = str.charCodeAt(i);
      return (code >= 65281 && code <= 65295) || (code >= 65306 && code <= 65312);
};

//all refers to punctuation only
//record all of them and take the major one although that requires intermediate
export function matchMixedPunctuation(str) {
  var halfWidth = [];
  var fullWidth = [];

// TODO refactor
  for (var i=0; i<str.length; i++){
    var ch = {
      pos: i,
      word: str[i]
    };
    if(isHalfWidth(str, i)){
      halfWidth.push(ch);
    } else if (isFullWidth(str, i)) {
      fullWidth.push(ch);
    }
  }
  if(fullWidth.length === 0) return [];
  if(halfWidth.length === 0) return [];
  //prefer fullwidth
  if(fullWidth.length >= halfWidth.length){
    return halfWidth;
  } else{
    return fullWidth;
  }
}
