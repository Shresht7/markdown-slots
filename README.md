# Markdown-Slots
----------------

<!-- slot: description -->
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

<!-- slot: inputs -->
<!-- /slot -->