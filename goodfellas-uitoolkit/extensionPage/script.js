const vscode = acquireVsCodeApi();
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    // Send a message to the extension when the button is clicked
    vscode.postMessage({ command: 'copyButtonClicked' });
});