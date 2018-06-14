// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const babel = require("babel-core");
const path = require("path");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "string-litteral-to-es2015" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.transformStringLiteral",
    function() {
      // The code you place here will be executed every time your command is executed

      let editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      let selection = editor.selection;
      let text = editor.document.getText(selection);

      
      
      function checkSelectedText(selectedText) {
        selectedText.replace(/^\s*`/g,"`");
        selectedText.replace(/[\t]+$/gm,"");
        console.log(selectedText);
        if((selectedText.match(/^`/g)) && (selectedText.match(/`$/gm))) {
          return true;
        }else{
          vscode.window.showErrorMessage(
            "Selected Text is not Valid. Make sure the first and lasrt character selected is ' "
          );
          return false
        }
      }

      if (checkSelectedText(text)){
        let transformedText = babel.transform(text, {
          plugins: [
            path.join(
              __dirname,
              "../",
              "node_modules",
              "babel-plugin-transform-es2015-template-literals"
            )
          ]
        });
  
  
  
        //   Insert generated text
        let newText = `
  // Generated text
  ${transformedText.code}
  `;
        
  
          editor
          .edit(editBuilder => {
            editBuilder.insert(selection.end, "\n" + newText);
          })
          .then(function() {
              editor.selection = selection;
              vscode.commands.executeCommand("editor.action.blockComment");
              vscode.window.showInformationMessage(
              "Successfully Created es2015 string"
            );
          });
      }

      
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
