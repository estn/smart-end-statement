const vscode = require('vscode');

const max = vscode.commands.registerCommand('smart.max.view', () => {
  vscode.commands.executeCommand("workbench.action.closePanel");
  vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
})

module.exports = {
  max
};