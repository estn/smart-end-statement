const vscode = require("vscode");
const util = require("../util");

function hanldeJS(editor) {
  var lineIndex = editor.selection.active.line;
  var lineObject = editor.document.lineAt(lineIndex);
  var lineLength = lineObject.text.length;
  var text = lineObject.text;
  //当不以分号结束时, 进行处理
  if (text.charAt(lineLength - 1) !== ";" && !lineObject.isEmptyOrWhitespace) {
    editor.edit(editBuilder => {
      //关键字开头，并且该语句没有结束
      if (util.isStart(text, util.JAVA_SCRIPT) && !util.isEnd(text, "{")) {
        editBuilder.insert(new vscode.Position(lineIndex, lineLength), "{");
        editBuilder.insert(new vscode.Position(lineIndex, lineLength), "\n");

        let blankSpace = util.blankSpace(text);
        for (let i = 0; i < blankSpace; i++) {
          editBuilder.insert(new vscode.Position(lineIndex, lineLength), " ");
        }
        
        editBuilder.insert(new vscode.Position(lineIndex, lineLength), "}");
        vscode.commands.executeCommand("editor.action.insertLineAfter");
      }

      //关键字开头并且语句结束
      else if (util.isStart(text, util.JAVA_SCRIPT) && util.isEnd(text, "{")) {
        //最后一行
        if (editor.document.lineCount == lineIndex + 1) {
          vscode.commands.executeCommand("editor.action.insertLineAfter");
        }
        //不是最后一行的时候,判断下一行是否是空行,不是空行就需要加一行，否则直接下移
        else {
          var nextObject = editor.document.lineAt(lineIndex + 1);
          if (nextObject.isEmptyOrWhitespace) {
            vscode.commands.executeCommand("cursorDown");
          } else {
            vscode.commands.executeCommand("editor.action.insertLineAfter");
          }
        }
      }

      //不以关键字开头直接插入';' 并且鼠标移到最后一个位置
      else {
        editBuilder.insert(new vscode.Position(lineIndex, lineLength), ";");
        vscode.commands.executeCommand("cursorEnd");
      }
    });
  }

  //分号结束直接将鼠标移到最后一个字符
  else if (lineObject.text.charAt(lineLength - 1) === ";") {
    vscode.commands.executeCommand("cursorEnd");
  }
}

module.exports = {
  hanldeJS
};
