<template>
    <div class="article">
        <div class="container">
            <div class="card">
                <div class="content" v-html="markdown"></div>
            </div>
        </div>
        <footer class="footer">
            <p>Created with <span>♥</span> by <a href="http://twitter.com/@mauroreisvieira">@mauroreisvieira</a> in Portugal</p>
        </footer>
    </div>
</template>

<script>
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
            this.file = window.location.origin + window.location.pathname + 'docs' + this.$route.path + '.md';
            const md = new Remarkable({
                langPrefix: 'hljs language-'
            });
            const rawFile = new XMLHttpRequest();
            rawFile.open("GET", this.file, false);
            rawFile.onreadystatechange = () => {
                var allText = rawFile.responseText;
                this.markdown = md.render(allText);
                this.$nextTick(function () {
                    Prism.highlightAll();
                });
            }
            rawFile.send(null);
        }
    }
</script>
<style lang="css">
    @import "./../../assets/prism/prism.css";
</style>


