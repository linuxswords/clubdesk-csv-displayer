# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Install: `npm install`
- Test: `npm test` (mocha, all specs in `test/`)
- Run a single test: `npx mocha --grep "show only total"` (matches the `it(...)` description)
- Build: `npm run build` (webpack → `dist/csvtabler.js` + source map)
- Publish: `npm publish` — `prepublishOnly` runs `npm test && npm run build` first

## Architecture

A single-file browser library that fetches a CSV from a ClubDesk page and renders it into an HTML table element. Distributed as a UMD bundle for inclusion via `<script>` on ClubDesk-hosted pages.

- `src/index.js` — the entire source. Two exports:
  - `CSVConverter` — pure class. `constructor(csv_content)` takes raw CSV text; `.table(settings)` returns an HTML string. All rendering logic and options live here. This is what the tests exercise directly, with no DOM or network.
  - `loadFileAsTable(targetContainerId, fileId, settings)` — the browser glue. Uses **jQuery** (`$`, assumed present on the ClubDesk page — not a dependency here) to `$.ajax` `fileservlet?id=<fileId>`, then injects the converter output into `#<targetContainerId>`.
- `webpack.config.js` — production build, `libraryTarget: 'umd'`, global name `csvtabler`.
- `dist/` — committed build output (shipped in the npm package).

### CSV / rendering assumptions

- Field delimiter is `;` (semicolon), not comma. Rows split on `\n`.
- Row 0 is always the header (rendered as `<th>`); there is no option to disable this yet.
- Encoding: the fetched file is read as `iso-8859-1`; `loadFileAsTable` replaces newlines-inside-fields with `<br/>` and strips `"` quotes before conversion. `CSVConverter` itself does no such cleanup — tests feed it already-clean data.
- Options are keys on the settings object destructured in `CSVConverter.table(...)`: `ignore_columns`, `include_numbering`, `numbering_prefix`, `numbering_postfix`, `show_total_only`, `total_title`. See `Readme.md` for the full option table and ClubDesk integration snippet.

### Working style

- TDD is the intended workflow (per Readme). Add/adjust a spec in `test/index.test.js` against `CSVConverter` before changing rendering behavior; tests assert exact HTML string equality.
- After changing `src/`, rebuild so `dist/` stays in sync before releasing.
