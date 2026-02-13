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

Implementation is in [src/extension.ts](src/extension.ts).

## Requirements

- VS Code `^1.109.0`

No additional runtime dependencies.

## Installation

From source (development):

1. Clone this repository and open it in VS Code.
2. Install dependencies:

	 ```bash
	 npm install
	 ```

3. Build once or start watch mode:

	 ```bash
	 npm run compile           # single build
	 npm run watch             # parallel type-check + esbuild watch
	 ```

4. Press F5 to launch the Extension Development Host and try it in a JS/TS file.

## Usage

1. Inside a quoted string, type `${` as you normally would.
2. When you press `{` (i.e., finishing `${`), the surrounding quotes on that line become backticks, enabling interpolation immediately.

That's it—no commands or settings required.

## Extension Settings

This extension currently contributes no settings.

## Limitations

- Line-based only: it searches for quotes and the closing quote on the same line.
- Escaped quotes are not parsed: sequences like `\"` or `\'` may be misidentified.
- No syntax awareness: it uses simple text heuristics, not a full parser.
- Activation scope: enabled for JavaScript/TypeScript (including React variants) as defined in `activationEvents`.
- Potential conflicts if other extensions also override the `type` command for the same languages.

## Known Issues

- In rare cases with mixed or nested quotes on a single line, the chosen closing quote may not be the semantic string terminator.

If you hit an edge case, please open an issue with a minimal snippet.

## Development

- Build:

	```bash
	npm run compile
	```

- Watch (recommended during development):

	```bash
	npm run watch
	```

- Run tests:

	```bash
	npm test
	```

Key files:

- Source: [src/extension.ts](src/extension.ts)
- Build script: [esbuild.js](esbuild.js)
- Config: [tsconfig.json](tsconfig.json), [eslint.config.mjs](eslint.config.mjs)

## Release Notes

### 0.0.1

- Initial release: automatic quote-to-backtick conversion on `${` within a line.

---

Enjoy! If this saves you keystrokes, a star is appreciated.
