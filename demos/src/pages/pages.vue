<template>
    <div class="article">
        <div class="container">
            <div class="content" v-html="markdown"></div>
        </div>
        <foot />
    </div>
</template>

<script>
    import { Utils } from '../helpers/utils.js'
    import Prism from 'prismjs'
    import Remarkable from 'remarkable'
    // Components
    import Foot from '../layout/foot.vue'
    export default {
        components: { Foot },
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


