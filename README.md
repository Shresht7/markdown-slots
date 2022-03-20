<h1 align='center'>Markdown Slots</h1>

<p align='center'>
<!-- slot: description  -->
A GitHub Action to dynamically place content in markdown slots
<!-- /slot -->
</p>

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

| Property | Description                                |
| -------- | ------------------------------------------ |
| `prefix` | Adds the `prefix` before the slot-contents |
| `suffix` | Adds the `suffix` after the slot-contents  |

for example, to wrap some code in a code-block:

```yaml
  slots: |
    - slot: code
      content: console.log(content)
      props:
        prefix: ```js
        suffix: ```
```

Alternatively, slot props can also be specified on the slot-tag itself. These props take priority over the ones set in the workflow.

```md
<!-- slot: code {prefix: ```js} | {suffix: ```}  -->
<!-- /slot -->
```

> The slot props follow the format `{key: value}` and are separated by `|`

### List of all inputs:

<!-- slot: inputs  -->
| Input          | Description                                                                  |       Default |   Required   |
| :------------- | :--------------------------------------------------------------------------- | ------------: | :----------: |
| `src`          | Path to the source file with markdown-slots (can be a URL)                   | `./README.md` |              |
| `dest`         | Desired output path for the generated content                                | `./README.md` |              |
| `slots`        | stringified YAML array mapping slot-names to content                         |   `undefined` | **required** |
| `remove-slots` | Boolean to determine if this action should remove slot tags upon replacement |       `false` |              |
| `dry-run`      | Boolean to determine if this is a dry-run                                    |       `false` |              |
<!-- /slot -->

---

## 📋 Outputs

The action outputs the generated contents as `contents`. You can access this in subsequent steps using [expressions](https://docs.github.com/en/actions/learn-github-actions/expressions).

e.g. `${{ steps.markdown-slots.outputs.contents }}`

(This assumes you set the `id` as `markdown-slots` in the [workflow step](#2-use-action-in-a-workflow)).

### List of all outputs:

<!-- slot: outputs  -->
| Output     | Description                |
| :--------- | :------------------------- |
| `contents` | Generated markdown content |
<!-- /slot -->

## 📃 Workflow Examples

### Action Readme

The _description_, _inputs_ and _outputs_ tables of this README are placed in slots using this action! See the [action-readme workflow](./.github/workflows/action-readme.yml) for more details.

<details>

  <summary>Click here to see the workflow</summary>

  <!-- slot: action-readme-workflow -->
  <!-- /slot -->

</details>

---

## 📑 License

> [MIT License](./LICENSE)