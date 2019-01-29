const vscode = require('vscode');
const util = require('../util');

function hanldeStyle(editor) {
  var lineIndex = editor.selection.active.line;
  var lineObject = editor.document.lineAt(lineIndex);
  var lineLength = lineObject.text.length;
  var text = lineObject.text;
  //当不以分号结束时, 进行处理
  if (text.charAt(lineLength - 1) !== ';' && !lineObject.isEmptyOrWhitespace) {
    editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(lineIndex, lineLength), ';');
      vscode.commands.executeCommand('cursorEnd');
    })
  }

  //分号结束直接将鼠标移到最后一个字符
  else if (lineObject.text.charAt(lineLength - 1) === ';') {
    vscode.commands.executeCommand('cursorEnd');
  }
}


module.exports = {
  hanldeStyle
}