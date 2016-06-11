var expect = require('chai').expect;
import ProofReader from '../proofreader.js';
describe('Proofreader', function() {
  var pr = new ProofReader();
  // http://www.appledaily.com.tw/realtimenews/article/fun/20150118/544300/
  //pbm1: 副評
  //pbm2: ) 半型
  // var input = {
  //   "hash1": "有位網友幫朋友買東西，想用超商取貨時可隨意取名這點，填了個「我是智障」來陷害朋友，但沒想到朋友堅持不去領貨，這名網友只好厚著臉皮自己去領，結果被店員邊結帳邊笑，讓他說「下次不去那家了」。",
  //   "hash2": "網友s12081208在PTT的StupidClown版發文說，有朋友託他幫忙買東西，於是就想到以前常常有人用便利商店去取貨，然後把買家名字改成一些很奇怪名字的案例，於是自己就取了個「我是智障」想叫朋友去取貨，但是沒想到朋友回他說「我不要去拿 你自己想辦法」，這名網友因為擔心如果不拿也要不到錢、還會被發警告副評之類等原因，只好自己厚著臉皮去了那間商店，等到店員問「請問大名?」時，網友回「我是智障」，瞬間三個店員噗疵了一聲，還問「原來那個智障就是你哦」，讓他快離開萬惡的便利商店。",
  //   "hash3": "這名網友也說他之後又去那間便利商店，結果又遇到同樣的店員在笑，讓他說「幹下次不去那家了QAQ」。其他網友看到後則是說「哈哈哈，你看看你...害人不成反害己齁」、「表人反被表」、「原po耍憨啊哈哈」。（即時新聞中心／綜合報導)"
  // }

  it('should detect typos', function () {
    var expected = {
      "words":[
        {
          "hash":"hash2",
          "words":[{
            pos: 123,
            word: '副評'
          }]
        },
      ],
      "mixedPunctuation":[
        {
          "hash":"hash3",
          "words":[{
            pos: 456,
            word: ')'
          }]
        }
      ]
    }
      expect(pr.proofread(input)).to.equal(expected);
  });
});
