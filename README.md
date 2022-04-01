<h1 align='center'>Markdown Slots</h1>

<div align='center'>

[![Release](https://img.shields.io/github/v/release/Shresht7/markdown-slots?style=for-the-badge)](https://github.com/Shresht7/markdown-slots/releases)
[![License](https://img.shields.io/github/license/Shresht7/markdown-slots?style=for-the-badge)](./LICENSE)

</div>

<p align='center'>
<!-- slot: description -->
A GitHub Action to dynamically place content in markdown slots
<!-- /slot -->
</p>

<div align='center'>

[![Test](https://github.com/Shresht7/markdown-slots/actions/workflows/test.yml/badge.svg)](https://github.com/Shresht7/markdown-slots/actions/workflows/test.yml)
[![Validate](https://github.com/Shresht7/markdown-slots/actions/workflows/validate.yml/badge.svg)](https://github.com/Shresht7/markdown-slots/actions/workflows/validate.yml)
[![Action Readme](https://github.com/Shresht7/markdown-slots/actions/workflows/action-readme.yml/badge.svg)](https://github.com/Shresht7/markdown-slots/actions/workflows/action-readme.yml)

</div>

<details>

<summary align='center'>Table of Contents</summary>

- [📖 Usage](#-usage)
  - [1. Create markdown slots](#1-create-markdown-slots)
  - [2. Use action in a workflow](#2-use-action-in-a-workflow)
  - [3. Run the workflow](#3-run-the-workflow)
- [📋 Inputs](#-inputs)
  - [Slots](#slots)
    - [Slot Props](#slot-props)
  - [List of all inputs:](#list-of-all-inputs)
- [📋 Outputs](#-outputs)
  - [List of all outputs:](#list-of-all-outputs)
- [📃 Workflow Examples](#-workflow-examples)
  - [Action Readme](#action-readme)
- [📑 License](#-license)

</details>

---

## 📖 Usage

### 1. Create markdown slots

To use this action, create _slot tags_ in the markdown you wish to use as the source template.

`<!-- slot: myContent -->` denotes the _start_ of the markdown slot where `myContent` is a user-defined name. This name will be [used in the workflow step](#2-use-action-in-a-workflow) to assign content to this slot.

`<!-- /slot -->` denotes the _end_ of the slot.

All content will be placed within these tags. In other words, any thing within these tags will be _overwritten_ by the slot contents.

```md
# Example Markdown

<!-- slot: text -->
<!-- /slot -->
```

> Markdown-slot tags are just HTML comments, and are ignored by markdown parsers (i.e. they won't be visible in the rendered markdown).

### 2. Use action in a workflow

Use this action in a workflow step and provide a YAML compatible array mapping slot-names to their corresponding content. In the example below, the text `Hello World!` is assigned to the slot named `text`.

```yaml
- name: markdown-slots
  id: markdown-slots
  uses: Shresht7/markdown-slots@v1
  with:
    slots: |
      - slot: text
        content: Hello World!
```

### 3. Run the workflow

When the action runs, it will write the dynamically generated content to the slot. The generated markdown will be [output](#outputs) as `contents`. The action will also write contents to the specified destination `dest` [input](#inputs).

> Writing to the dest file is a local operation. You may want to follow-up with a add-and-commit or create-pull-request workflow-step.

```md
# Example Markdown

<!-- slot: text -->
Hello World!
<!-- /slot -->
```

> The default behaviour is to keep the slot tags even after content has been placed in the markdown file. This allows regeneration of slot content on subsequent runs. This can be disabled using the `remove-slots` [input](#inputs).

---

## 📋 Inputs

### Slots

The only **required** input is `slots`. `slots` is a stringified YAML array that maps slot-names to their corresponding contents.

```
  slots: |
    - slot: date
      content: Today is ${{ steps.<step_id>.outputs.date }}
    - slot: month
      content: $${{ steps.<step_id>.outputs.month }}
    - slot: year
      content: ${{ steps.<step_id>.outputs.year }}
```

> <step_id> is a fictional step that outputs `date`, `month` and `year`

> Note that the `|` is important. GitHub Actions expect `strings` not `yaml-objects`. The `|` signifies that `slots` is a multiline string, which is concatenated and parsed as yaml in the action.

#### Slot Props

In addition to `slot` and `content`, each slot input can take the following props

| Property      | Description                                         |
| ------------- | --------------------------------------------------- |
| `prepend`     | Adds the `prepend` content before the slot-contents |
| `append`      | Adds the `append` content after the slot-contents   |
| `removeSlots` | Should remove the slot tags upon substitution       |

for example, to wrap some code in a code-block:

```yaml
  slots: |
    - slot: code
      content: console.log(content)
      props:
        prepend: "```js"
        append: "```"
```

Alternatively, slot props can also be specified on the slot-tag itself. These props take priority over the ones set in the workflow.

```md
<!-- slot: code, prepend: ```js, append: ``` -->
<!-- /slot -->
```

> The slot props follow the `key: value` format and are separated by `,`.

### List of all inputs:

<!-- slot: inputs -->
| Input          | Description                                                                  |       Default | Required |
| :------------- | :--------------------------------------------------------------------------- | ------------: | :------: |
| `src`          | Path to the source file with markdown-slots (can be a URL)                   | `./README.md` |          |
| `dest`         | Desired output path for the generated content                                | `./README.md` |          |
| `slots`        | stringified YAML array mapping slot-names to content                         |   `undefined` |     ✅    |
| `remove-slots` | Boolean to determine if this action should remove slot tags upon replacement |       `false` |          |
| `dry-run`      | Boolean to determine if this is a dry-run                                    |       `false` |          |
<!-- /slot -->

## 📋 Outputs

The action outputs the generated contents as `contents`. You can access this in subsequent steps using [expressions](https://docs.github.com/en/actions/learn-github-actions/expressions).

e.g. `${{ steps.markdown-slots.outputs.contents }}`

(This assumes you set the `id` as `markdown-slots` in the [workflow step](#2-use-action-in-a-workflow)).

### List of all outputs:

<!-- slot: outputs -->
| Output     | Description                |
| :--------- | :------------------------- |
| `contents` | Generated markdown content |
<!-- /slot -->

## 📃 Workflow Examples

### Action Readme

The _description_, _inputs_ and _outputs_ tables of this README are placed in slots using this action! See the [action-readme workflow](./.github/workflows/action-readme.yml) for more details.

[![Action Readme](https://github.com/Shresht7/markdown-slots/actions/workflows/action-readme.yml/badge.svg)](https://github.com/Shresht7/markdown-slots/actions/workflows/action-readme.yml)

<details>

  <summary>Click here to see the workflow</summary>

  <br />

  <!-- slot: action-readme-workflow -->
```yaml
# =============
# ACTION README
# =============

# Workflow to automatically update the README with action.yml metadata

name: Action Readme

# Activation Events
# =================

on:
  # When the action.yml or this workflow file changes
  push:
    branches:
      - main
    paths:
      - action.yml
      - .github/workflows/action-readme.yml

  # Manual workflow dispatch
  workflow_dispatch:
    inputs:
      dry-run:
        description: Dry-Run
        required: true
        default: "false"

# Jobs
# ====

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      # Actions Checkout ✅
      # ===================

      - name: checkout
        uses: actions/checkout@v3

      # Generate Action Metadata 📜
      # ===========================

      - name: action-metadata
        id: action-metadata
        uses: Shresht7/action-metadata@v1

      # Read Example Workflow File 📄
      # =============================

      - name: read-file
        id: read-file
        uses: Shresht7/read-file-action@v1
        with:
          path: .github/workflows/action-readme.yml

      # Markdown Slots 📋
      # =================

      - name: markdown-slots
        id: markdown-slots
        uses: Shresht7/markdown-slots@v1
        with:
          slots: |
            - slot: description
              content: ${{ steps.action-metadata.outputs.description }}
            - slot: inputs
              content: ${{ steps.action-metadata.outputs.inputs-md-table }}
            - slot: outputs
              content: ${{ steps.action-metadata.outputs.outputs-md-table }}
            - slot: action-readme-workflow
              content: ${{ toJSON(steps.read-file.outputs.contents) }}
              props:
                prepend: "```yaml"
                append: "```"

      # Push Changes 🌎
      # ===============

      - name: check for changes
        id: git-diff
        run: |
          if git diff --exit-code; then
            echo "::set-output name=changes_exist::false"
          else
            echo "::set-output name=changes_exist::true"
          fi

      - name: add, commit and push
        if: ${{ steps.git-diff.outputs.changes_exist == 'true' }}
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add .
          git commit -m 'Update README.md 📄'
          git push

```
<!-- /slot -->

</details>

---

## 📑 License

> [MIT License](./LICENSE)
