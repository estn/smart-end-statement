const JAVA_SCRIPT = "javascript";
const PYTHON = "python";
const keywordPython = [
  "if",
  "for",
  "while",
  "def",
  "class",
  "elif",
  "else",
  "with"
];
const keywordJavascript = [
  "if",
  "for",
  "while",
  "function",
  "component",
  "constructor"
];

function isStart(text, language) {
  let keyword;
  if (language === JAVA_SCRIPT) {
    keyword = keywordJavascript;
  }

  if (language === PYTHON) {
    keyword = keywordPython;
  }
  return keyword.some(item => {
    return text.indexOf(item) > -1;
  });
}

function isEnd(text, symbol) {
  text = text.trim();
  if (text.charAt(text.length - 1) === symbol) {
    return true;
  }
  return false;
}

/**
 * 查询字符串中第一个非空字符的索引
 * @param {string} str 字符串
 */
function blankSpace(str) {
  let length = str.length;
  for (let i = 0; i < length; i++) {
    if (str[i] !== " ") {
      return i;
    }
  }
}

module.exports = {
  isEnd,
  isStart,
  JAVA_SCRIPT,
  PYTHON,
  blankSpace
};
