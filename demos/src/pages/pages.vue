<template>
    <div class="article">
        <div class="container">
            <div class="card">
                <div class="content" v-html="markdown"></div>
            </div>
        </div>
        <footer class="footer">
            <p>Created with <span class="heart">♥</span> by <a href="http://twitter.com/@mauroreisvieira">@mauroreisvieira</a> in Portugal</p>
        </footer>
    </div>
</template>

<script>
    import { Utils } from '../helpers/utils.js'
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    export default {
        data: function () {
            return {
                title: this.$route.name,
                file: undefined,
                markdown: undefined
          }
        },
        mounted() {
            const file = this.$route.path + '.md';
            console.log(file);
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            Utils.readFile(file, (responseText) => {
                this.markdown = md.render(responseText);
                this.$nextTick(function () {
                    Prism.highlightAll();
                });
            });
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>


