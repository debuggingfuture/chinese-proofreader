var expect = require('chai').expect;
import {matchMixedPunctuation} from './mixed';
describe('Mixed punctuation check', function() {
  it('should match nothing for basic input',function () {
    expect(matchMixedPunctuation('')).to.eql([]);
    expect(matchMixedPunctuation('測試')).to.eql([]);
  });
  it('should match nothing for consisten usage of punctuations',function () {
    expect(matchMixedPunctuation('測，試。')).to.eql([]);
    expect(matchMixedPunctuation('測,試.')).to.eql([]);
  });

  it('should match halfwidth in same count of half/fulwidth punctuations', function () {
    var output = matchMixedPunctuation('（測試)');
    var expected = '';
    expect(output).to.eql([
      {
        pos: 3,
        word: ')'
      }
    ]);
  });

  it('should match halfwidth if lesser in mixed punctuations', function () {
    var output = matchMixedPunctuation('我們，來，（測試)');
    var expected = '';
    expect(output).to.eql([
      {
        pos: 8,
        word: ')'
      }
    ]);
  });
  it('should match fullwidth if lesser in mixed punctuations', function () {
    var output = matchMixedPunctuation('我們,來,(測試）');
    var expected = '';
    expect(output).to.eql([
      {
        pos: 8,
        word: '）'
      }
    ]);
  });
  it('should match exist of both halfwidth and fullwidth alphanumeric in text ', function () {

      // expect(pr.proofread(input)).to.equal(expected);
  });
  it('should not match exist of both chinese / english in text', function () {

      // expect(pr.proofread(input)).to.equal(expected);
  });
});
