<div align="center">

# Auto Template String

Automatically converts quoted strings to template literals when you start typing an interpolation.

</div>

## Features

- Converts the surrounding quotes to backticks when you type `{` immediately after `${` inside a single- or double-quoted string.
- Preserves your normal typing by forwarding input to VS Code's default handler first.
- Works in JavaScript, TypeScript, JSX, and TSX files.
- Zero configuration.

Example flow (on a single line):

1. You have: `"Hello, ${|}"` (caret at `|` inside a quoted string)
2. You press `{`
3. The extension replaces the surrounding quotes with backticks → `` `Hello, ${|}` ``

## How It Works

- The extension hooks the `type` command for supported languages and always lets the default typing happen first.
- When the typed character is `{`, it checks the text to the left of the caret on the current line. If it ends with `${`, it:
	- Finds the most recent `'` or `"` on that line to the left of the caret.
	- Finds the matching closing quote on the same line.
	- Replaces both quotes with backticks, turning the string into a template literal.

## Release Notes

### 0.0.1

- Initial release: automatic quote-to-backtick conversion on `${` within a line.

### Author

- Matheus Mallet

---

Enjoy! If this saves you keystrokes, a star is appreciated.
