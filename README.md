# react-rewrite

`react-rewrite` lets you edit a React app visually while it is running locally, then automatically writes those changes back to the source files in your project.

It is built for local development and works by opening a proxy in front of your dev server and injecting an overlay into the page.

## Demo
![React Rewrite GIF Converter](https://github.com/user-attachments/assets/098e564b-d9a9-411d-8ba0-5cf6109bc2e4)

full demo:
https://youtu.be/APl0_v5CRnI

## Fastest path

You do not need to download or clone this repo.

From the root of your React app:

```bash
npm install -D react-rewrite-cli
```

Start your dev server, then in a second terminal run:

```bash
npx react-rewrite
```

If you want to try it without installing first:

```bash
npx react-rewrite-cli@latest
```

## What it does

- Select an element and inspect its component name, file path, and line number
- Edit supported Tailwind-based layout, spacing, size, typography, and color properties
- Double-click text to edit it inline
- Copy, paste, and duplicate elements
- Delete elements
- Reorder sibling elements
- Stage multiple changes and apply them with **Confirm**
- Undo in-progress canvas changes and review applied changes in the changelog

## Requirements

- Node.js 20+
- A React project (18+)
- A running development server
- Supported app setups: Next.js, Vite, and Create React App

Tailwind CSS is recommended if you want to use the property editor. Text editing and some structural actions do not depend on Tailwind.

## Install

Run this in the root of the React app you want to edit:

```bash
npm install -D react-rewrite-cli
```

If you don't want to install it first, you can also run it directly with `npx react-rewrite-cli@latest`.

## Quick start

1. Start your React dev server as usual.
2. In a second terminal, from the same project root, run:

```bash
npx react-rewrite
```

If auto-detection does not pick the right port, pass it explicitly:

```bash
npx react-rewrite 3000
```

The tool opens a local proxy in your browser, shows the editing overlay, and writes confirmed changes back into files inside your project.

## Basic flow

1. Click an element to inspect and select it.
2. Edit properties in the sidebar, drag to reorder where supported, or double-click text to change copy.
3. Review pending changes in the UI.
4. Click **Confirm** to apply them to your source files.

## CLI options

```text
react-rewrite [options] [port]

Arguments:
  port           Dev server port override

Options:
  --no-open      Don't open browser automatically
  --host <host>  Dev server host (default: "localhost")
  --verbose      Enable debug logging
```

## Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd + C` | Copy selected element |
| `Ctrl/Cmd + V` | Paste copied element as sibling |
| `Ctrl/Cmd + D` | Duplicate selected element in place |
| `Delete / Backspace` | Remove selected element |
| `Ctrl/Cmd + Z` | Undo canvas changes |
| `Ctrl/Cmd + Shift + L` | Toggle changelog |
| `Ctrl/Cmd + Click` | Follow links through the overlay |
| Double-click text | Edit text inline |

## Notes

- Run `react-rewrite` from your app's root directory so it can detect the framework and safely resolve file paths.
- It only works against development builds, not production builds.
- Only files inside the current project are eligible for writes.

## Development

To work on this repository itself:

```bash
pnpm install
pnpm build
pnpm test -- --run
```

For iterative CLI development:

```bash
pnpm dev
```

You will still need a separate supported React app running locally to test the tool end to end.

## Project structure

```text
packages/
  cli/      CLI, proxy server, and source transforms
  overlay/  Injected browser overlay
  shared/   Shared TypeScript types
```

## License

[MIT](./LICENSE)
