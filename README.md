<h1 align='center'>Markdown Slots</h1>

---

<br />

<!-- slot: description  -->
A GitHub Action to dynamically place content in markdown slots.
<!-- /slot -->

## Usage

To use this action, create slot tags in the markdown you want to use as the source template.

> Markdown-slot tags are just HTML comments, and are ignored by markdown parsers (i.e. they won't be visible in the rendered markdown).

`<!-- slot: myContent -->` denotes the start of the markdown slot where `myContent` is a user-defined name. You will reference this name to assign it some content.

`<!-- /slot -->` denotes the end of the slot. All content will be placed within these tags. In other words, any thing within these tags will be overwritten by the slot contents.

```md
# Test Markdown

<!-- slot: text -->
<!-- /slot -->
```

Use this action in a workflow step and provide a YAML compatible string array mapping slot-names to their corresponding content. In the example below, the text `Hello World!` is assigned to the slot named `text`.

```yaml
- name: markdown-slots
  uses: Shresht7/markdown-slots@v1
  with:
    slots: |
      - slot: text
        content: Hello World!
```

When the action runs, it will write the dynamically generated content to the destination `dest` specified in the inputs.

```md
# Test Markdown

<!-- slot: text -->
Hello World!
<!-- /slot -->
```

> The default behaviour is to keep the slot tags even after content has been placed in the markdown file. This allows regeneration of slot content on subsequent runs. This can be disabled using the `remove-slots` input.

## Inputs

<!-- slot: inputs -->
| Input          | Description                                                                  |       Default |   Required   |
| :------------- | :--------------------------------------------------------------------------- | ------------: | :----------: |
| `src`          | Path to the source file with markdown-slots (can be a URL)                   | `./README.md` |              |
| `dest`         | Desired output path for the generated content                                | `./README.md` |              |
| `slots`        | YAML string array mapping slot-names to content                              |   `undefined` | **required** |
| `remove-slots` | Boolean to determine if this action should remove slot tags upon replacement |       `false` |              |
| `dry-run`      | Boolean to determine if this is a dry-run                                    |       `false` |              |
<!-- /slot -->