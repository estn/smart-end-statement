const vscode = require('vscode');
const util = require('../util');

function hanldePython(editor) {
  const lineIndex = editor.selection.active.line;
  const lineObject = editor.document.lineAt(lineIndex);
  const lineLength = lineObject.text.length;
  const text = lineObject.text;

  if (lineObject.isEmptyOrWhitespace) {
    return;
  }

  editor.edit((editBuilder) => {
    // 普通语句 --> 移至最后一个位置
    if (!util.isStart(text, util.PYTHON)) {
      vscode.commands.executeCommand('cursorEnd');
    }

    // 关键字开头的语句 并且不以':'结尾 --> 加':'并且换行
    if (util.isStart(text, util.PYTHON) && !util.isEnd(text, ':')) {
      editBuilder.insert(new vscode.Position(lineIndex, lineLength), ':');
      vscode.commands.executeCommand('editor.action.insertLineAfter');
    }
    // 关键字开头的语句 并且以':'结尾 --> 换行或者直接下移一行
    if (util.isStart(text, util.PYTHON) && util.isEnd(text, ':')) {
      //最后一行
      if (editor.document.lineCount == lineIndex + 1) {
        vscode.commands.executeCommand('editor.action.insertLineAfter');
      }
      //不是最后一行的时候,判断下一行是否是空行,不是空行就需要加一行，否则直接下移
      else {
        var nextObject = editor.document.lineAt(lineIndex + 1);
        if (nextObject.isEmptyOrWhitespace) {
          vscode.commands.executeCommand('cursorDown');
        } else {
          vscode.commands.executeCommand('editor.action.insertLineAfter');
        }
      }
    }
  })
}


module.exports = {
  hanldePython
}