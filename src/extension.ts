import * as vscode from 'vscode';

/**
 * Activates the extension by registering a global `type` command handler.
 * The handler forwards all typed input to VS Code's default handler, and then,
 * when `{` is typed immediately after `${` inside a single- or double-quoted
 * string on the current line, converts that string to a backtick-quoted
 * template literal so interpolation works as expected.
 *
 */
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'type',
    async (args) => {

      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return vscode.commands.executeCommand('default:type', args);
      }

      // deixa digitar normalmente
      await vscode.commands.executeCommand('default:type', args);

      // só reage quando digitar {
      if (args.text !== '{') {
        return;
      }
      
      const document = editor.document;
      const position = editor.selection.active;

      const line = document.lineAt(position.line).text;
      const left = line.substring(0, position.character);

      // verifica se acabou de digitar ${
      if (!left.endsWith('${')) {
        return;
      }
      
      const quoteInfo = detectStringQuotes(left);

      if (!quoteInfo) {
        return;
      }

      await convertToTemplateString(editor, quoteInfo);
    }
  );

  context.subscriptions.push(disposable);
}

function detectStringQuotes(text: string) {
  const doubleIndex = text.lastIndexOf('"');
  const singleIndex = text.lastIndexOf("'");

  const quoteIndex = Math.max(doubleIndex, singleIndex);

  if (quoteIndex === -1) {
    return null;
  }

  return {
    quote: text[quoteIndex],
    index: quoteIndex
  };
}

async function convertToTemplateString(
  editor: vscode.TextEditor,
  info: { quote: string; index: number }
) {
  const document = editor.document;
  const position = editor.selection.active;

  const line = document.lineAt(position.line);
  const text = line.text;

  const start = info.index;

  // encontra fechamento da string
  const end = text.indexOf(info.quote, start + 1);

  if (end === -1) {
    return;
  }

  await editor.edit(editBuilder => {

    // substitui aspas iniciais
    editBuilder.replace(
      new vscode.Range(
        new vscode.Position(position.line, start),
        new vscode.Position(position.line, start + 1)
      ),
      '`'
    );

    // substitui aspas finais
    editBuilder.replace(
      new vscode.Range(
        new vscode.Position(position.line, end),
        new vscode.Position(position.line, end + 1)
      ),
      '`'
    );
  });
}

export function deactivate() {}
