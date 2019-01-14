const vscode = require('vscode');

function activate(context) {

	var disposable = vscode.commands.registerCommand('smart.end.statement', () => {
		var editor = vscode.window.activeTextEditor
		if (!editor) return

		vscode.commands.executeCommand('acceptSelectedSuggestion').then(() => {
			var lineIndex = editor.selection.active.line
			var lineObject = editor.document.lineAt(lineIndex)
			var lineLength = lineObject.text.length

			//add some char to the end
			if (lineObject.text.charAt(lineLength - 1) !== ';' && !lineObject.isEmptyOrWhitespace) {
				editor.edit((editBuilder) => {
					if (isStartKeyword(lineObject.text)) {
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '{')
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '\n')
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '}')
						vscode.commands.executeCommand('editor.action.insertLineAfter')
					} else {
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), ';')
					}
				})
			} 
			//if line end with ';' then go to end 
			else if(lineObject.text.charAt(lineLength - 1) === ';') {
				vscode.commands.executeCommand('cursorEnd')
			}
			
			return;
		})
	})
	context.subscriptions.push(disposable)
}

function isStartKeyword(text) {
	return ['if', 'for', 'while'].some(item => {
		return text.indexOf(item) > -1
	})
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}