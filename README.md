# FrameUp

Edit your React app visually — like Figma, but on your running localhost. Move components, change styles, draw annotations, then hit confirm and AI writes the code for you.


## How It Works

1. Start your React dev server like normal
2. Run `npx frameup <port>` — FrameUp opens a visual overlay on top of your app
3. Make changes visually: drag components around, edit Tailwind properties, draw and annotate
4. Hit **Confirm** — FrameUp sends your changes to Claude, which generates the code and writes it directly to your source files

That's it. You design in the browser, AI handles the code.

## Quick Start

```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY=sk-ant-...

# Start your dev server
cd my-app && pnpm dev

# Launch FrameUp
npx frameup <port>
```

## What You Can Do

- **Select components** — click any element to see its React component name, source file, and location
- **Drag to reorder** — rearrange sibling components visually
- **Edit Tailwind properties** — adjust spacing, colors, typography, and layout in a visual sidebar
- **Draw and annotate** — pen, text, and lasso tools overlaid on your running app
- **AI code generation** — confirm your changes and Claude writes the JSX and Tailwind classes to your source files. Full undo support.

## Requirements

- Node.js >= 20
- React 18 or 19 (Next.js, Vite, or Create React App)
- Tailwind CSS
- Anthropic API key — [get one here](https://console.anthropic.com/settings/keys)

## CLI Options

```
frameup [port]              Dev server port (default: auto-detected)
  --no-open                 Don't open browser automatically
  --host <host>             Dev server host (default: localhost)
  --api-key <key>           Anthropic API key (overrides ANTHROPIC_API_KEY)
```

## Under the Hood

FrameUp runs a reverse proxy in front of your dev server and injects a visual overlay into the page via Shadow DOM — no plugins, no config files, no dependencies added to your project. Component resolution uses React Fiber traversal ([bippy](https://github.com/nicholasgasior/bippy)) to map DOM elements back to source files. When you confirm changes, your visual edits are serialized and sent to Claude, which generates code that's validated and syntax-checked before being written to your files.

## Development

```bash
git clone https://github.com/donghaxkim/react-frameup.git
cd react-frameup
pnpm install

# Start the test app
cd test-app && pnpm dev

# In another terminal — build overlay + start CLI in watch mode
pnpm dev

# Launch against the test app
node packages/cli/bin/frameup.js 3000
```

### Project Structure

```
packages/
  cli/       — CLI entry, HTTP proxy, WebSocket server, AST transforms
  overlay/   — IIFE bundle injected into the page (Shadow DOM)
  shared/    — TypeScript types shared between CLI and overlay
test-app/    — Next.js app for manual testing
```

### Tests

```bash
pnpm test
```

## License

[MIT](./LICENSE)