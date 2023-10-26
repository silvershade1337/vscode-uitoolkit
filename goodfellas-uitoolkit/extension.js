// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "goodfellas-uitoolkit" is now active!');
	
	let disposable = vscode.commands.registerCommand('goodfellas-uitoolkit.helloWorld', function () {
		const panel = vscode.window.createWebviewPanel(
			'goodfellas-uitoolkit',
			'Hello World',
			vscode.ViewColumn.Beside,
			{
				enableScripts: true, // Enable JavaScript in the webview
			}
		);
	
		const htmlContent = `
		<!DOCTYPE html>
		<html>
		<head>
			<title>Hello World</title>
		</head>
		<body>
			<h1>Hello World!</h1>
		</body>
		</html>`;
	
		panel.webview.html = htmlContent;
		panel.reveal();
		vscode.window.showInformationMessage('Hello World from UIToolkit!');
	});

	

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
