// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	function getWebViewContent() {
		const htmlPath = path.join(context.extensionPath, 'extensionPage', 'index.html'); // Assuming the HTML file is in the root of your extension directory
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
		return htmlContent;
	}
	
	console.log('Congratulations, your extension "goodfellas-uitoolkit" is now active!');
	vscode.commands.registerCommand('goodfellas-uitoolkit.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from UIToolkit!');
	});
	let disposable = vscode.commands.registerCommand('goodfellas-uitoolkit.openuitoolkit', function () {
		const panel = vscode.window.createWebviewPanel(
			'goodfellas-uitoolkit',
			'UIToolkit',
			vscode.ViewColumn.Beside,
			{
				enableScripts: true, // Enable JavaScript in the webview
			}
		);
	
		const htmlContent = getWebViewContent();
	
		panel.webview.html = htmlContent;
		panel.webview.onDidReceiveMessage(message => {
			if (message.command === 'copyButtonClicked') {
				// Call your function here
				// vscode.window.showInformationMessage('Copy button clicked');
				vscode.env.clipboard.writeText("Text copied to clipboard successfully").then(() => {
					vscode.window.showInformationMessage('Text copied to clipboard!');
				});
			}
		});
		panel.reveal();
	});

	

	context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
