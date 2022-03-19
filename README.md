# Markdown-Slots
----------------

<!-- slot: description -->

A GitHub Action to dynamically place content in markdown slots.

<!-- /slot -->

## Usage

```md
# Test Markdown

<!-- slot: text -->
<!-- /slot -->
```

```yaml
- name: markdown-slots
  uses: Shresht7/markdown-slots@v1
  with:
    slots: |
      text: Hello World!
```

```md
# Test Markdown

<!-- slot: text -->
Hello World!
<!-- /slot -->
```
## Inputs

<!-- slot: inputs prefix='\n```yaml\n' suffix='\n```\n' -->

| Input          | Description                                                                  |       Default |   Required   |
| :------------- | :--------------------------------------------------------------------------- | ------------: | :----------: |
| `src`          | Path to the source file with markdown-slots (can be a URL)                   | `./README.md` |              |
| `dest`         | Desired output path for the generated content                                | `./README.md` |              |
| `slots`        | YAML string mapping slot-names to content                                    |   `undefined` | **required** |
| `remove-slots` | Boolean to determine if this action should remove slot tags upon replacement |       `false` |              |
| `dry-run`      | Boolean to determine if this is a dry-run                                    |       `false` |              |

<!-- /slot -->