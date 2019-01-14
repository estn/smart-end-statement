const vscode = require('vscode');

function activate(context) {

	var disposable = vscode.commands.registerCommand('smart.end.statement', () => {
		var editor = vscode.window.activeTextEditor
		if (!editor) return

		vscode.commands.executeCommand('acceptSelectedSuggestion').then(() => {
			var lineIndex = editor.selection.active.line
			var lineObject = editor.document.lineAt(lineIndex)
			var lineLength = lineObject.text.length
			var text = lineObject.text

			//add some char to the end
			if (text.charAt(lineLength - 1) !== ';' && !lineObject.isEmptyOrWhitespace) {
				editor.edit((editBuilder) => {
					console.log(text);
					console.log(isStartKeyword(text) , isEnd(text));

					if (isStartKeyword(text) && !isEnd(text)) {
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '{')
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '\n')
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), '}')
						vscode.commands.executeCommand('editor.action.insertLineAfter')
					} 
					
					else if (isStartKeyword(text) && isEnd(text)) {
						// should insert new line
						var nextObject = editor.document.lineAt(lineIndex+1)
						if(nextObject.isEmptyOrWhitespace){
							vscode.commands.executeCommand('cursorDown')
						} else {
							vscode.commands.executeCommand('editor.action.insertLineAfter')
						}
					} 
					
					else {
						editBuilder.insert(new vscode.Position(lineIndex, lineLength), ';')
						vscode.commands.executeCommand('cursorEnd')
					}
				})
			}
			//if line end with ';' then go to end 
			else if (lineObject.text.charAt(lineLength - 1) === ';') {
				vscode.commands.executeCommand('cursorEnd')
			}

			return;
		})
	})


	var maxDisposable = vscode.commands.registerCommand('smart.max.view',() => {
		console.log(111);
		vscode.commands.executeCommand("workbench.action.closePanel")
		vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility")
	})


	context.subscriptions.push(disposable)
	context.subscriptions.push(maxDisposable)
}

function isStartKeyword(text) {
	return ['if', 'for', 'while'].some(item => {
		return text.indexOf(item) > -1
	})
}

function isEnd(text) {
	var length = text.length
	text = text.trim()
	if (text.charAt(length - 1) === "{") {
		return true
	}
	return false
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}