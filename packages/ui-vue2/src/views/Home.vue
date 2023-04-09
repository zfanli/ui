<template>
  <v-container>
    <h3>Home</h3>
    <p>Welcome and this page is the home page.</p>
    <p>
      Choose a link of the nav to see more, or check the debug info listed below
      pls.
    </p>

    <section class="home-wrapper">
      <h5>
        Vue Plugin: Toolbox, current component name: {{ $tools.componentName }}
      </h5>
      <pre><code class="hljs" v-html="toolbox"></code></pre>
    </section>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    toolbox() {
      return this.$tools.hljs.highlight(
        JSON.stringify(Object.getPrototypeOf(this.$tools), null, 2),
        {
          language: 'javascript'
        }
      ).value
    }
  },
  mounted() {
    console.log(this)
    this.$tools.printName()
    Object.getPrototypeOf(this.$tools).data = {}
  }
}
</script>

<style lang="scss">
@import 'highlight.js/styles/base16/material-darker.css';
</style>
