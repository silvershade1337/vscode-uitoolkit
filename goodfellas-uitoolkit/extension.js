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
	const showMessageWithTimeout = (message, timeout = 3000) => {
		void window.withProgress(
			{
				location: ProgressLocation.Notification,
				title: message,
				cancellable: false,
			},
	
			async (progress) => {
				await waitFor(timeout, () => { return false; });
				progress.report({ increment: 100 });
			},
		);
	};

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
				webviewOptions: {
					width: 400, // Specify the width in pixels
				},
			}
		);
	
		const htmlPath = path.join(context.extensionPath, 'extensionPage', 'index.html'); // Assuming the HTML file is in the root of your extension directory
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
	
		panel.webview.html = htmlContent;
		panel.webview.onDidReceiveMessage(message => {
			if (message.command === 'showAlert') {
				vscode.window.showInformationMessage(message.text);
			}
		});
		panel.reveal();
	});

	vscode.commands.registerCommand('goodfellas-uitoolkit.iconSearch', function () {
		vscode.window.showInputBox({
			prompt: 'What Material icon are you looking for:',
			placeHolder: 'Type your query (eg. plus, people)',
		}).then((query) => {
			vscode.env.openExternal(vscode.Uri.parse(`https://fonts.google.com/icons?selected=Material+Icons+Outlined:add:&icon.query=${query}&icon.platform=flutter&icon.set=Material+Icons`));
		})
		
	})

	

	context.subscriptions.push(disposable);
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
