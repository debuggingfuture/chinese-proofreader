# chinese-proofreader
Chrome Extension proofreading Chinese on the Web


## Design
Try to make everything modularized and pluggable.
- Tokenize Engine
 - Default: ported node-segment
 - Potential: [nodejieba](https://github.com/yanyiwu/nodejieba)/[Nacl](http://stackoverflow.com/questions/1666957/is-there-any-way-to-use-c-in-chrome-extension)

## Resources
- [node-segment](https://github.com/leizongmin/node-segment/) (以盤古分詞组件的词库為基礎)
- [萌典數據](https://github.com/g0v/moedict-data) 原始資料來源為教育部《重編國語辭典修訂本》（CC BY-ND 3.0 臺灣授權）、《臺灣閩南語常用詞辭典》（CC BY-ND 3.0 臺灣授權）及《臺灣客家語常用詞辭典》（授權聲明），詳請見
