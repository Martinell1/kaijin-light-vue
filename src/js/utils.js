export function fmtMarkDown(str=''){
  let result = str.replace(/[![].+\][\(]http\:\/\/qiniu\.kaijinx\.top\/.+[\)]/, '') //处理图片
  result = result.replace(/#+[ ].+/g, '')      //处理目录
  result = result.replace(/`{3}[^`]*`{3}/, '') //处理代码块
  return result
}