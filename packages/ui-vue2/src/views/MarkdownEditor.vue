<template>
  <div class="editor-wrapper">
    <textarea v-model="data" class="editor"></textarea>
    <div class="divider"></div>
    <div class="previewer" v-html="parsed"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    data: `# Hi there!

This is a simple **markdown editor**.

\`\`\`html
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
\`\`\`

`
  }),
  computed: {
    parsed() {
      return this.$tools.marked(this.data)
    }
  }
}
</script>

<style lang="scss">
@import 'highlight.js/styles/base16/material-lighter.css';
</style>

<style lang="scss" scoped>
.editor-wrapper {
  display: flex;
  height: 100%;

  .editor {
    padding: 1.5rem;
    resize: none;
    outline: none;
    flex-basis: 45%;
    font-size: 0.8rem;
  }

  .previewer {
    padding: 1rem;
  }

  .divider {
    background-color: #0001;
    width: 15px;
    transition: all 0.25s ease;
    cursor: ew-resize;

    &:hover {
      background-color: #0003;
    }
  }
}
</style>
