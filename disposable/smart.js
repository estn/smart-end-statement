const vscode = require('vscode');
const javascript = require('./language/javascript');
const python = require('./language/python');
const style = require('./language/style');

const smart = vscode.commands.registerCommand('smart.end.statement', () => {
  var editor = vscode.window.activeTextEditor;
  if (!editor) return

  vscode.commands.executeCommand('acceptSelectedSuggestion').then(() => {
    const languageId = editor.document.languageId;
    console.log(languageId)
    switch (languageId) {
      case 'javascript':
      case 'javascriptreact':
        console.log(111,languageId)
        javascript.hanldeJS(editor);
        break;
      case 'python':
        python.hanldePython(editor);
        break;
      case 'less':
      case 'sass':
      case 'css':
        style.hanldeStyle(editor);
        break;
      default:
        break;
    }
    return;
  })
})

module.exports = {
  smart
}