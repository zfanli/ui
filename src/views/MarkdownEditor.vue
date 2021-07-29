<template>
  <div class="editor-wrapper">
    <textarea v-model="data" class="editor"></textarea>
    <div class="divider"></div>
    <div class="previewer" v-html="parsed"></div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/base16/material-darker.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

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

`,
  }),
  computed: {
    parsed() {
      return marked(this.data);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "~highlight.js/styles/base16/material-lighter.css";

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
